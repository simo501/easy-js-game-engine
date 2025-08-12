import * as canvasUtils from './utils/utils.canvas.js';
import { GameUpdate } from './core/game.update.js';
import { GameRender } from './core/game.render.js';
import { GameLoop } from './core/game.loop.js';
import { Scene } from './scenes/scene.js';
import { Player } from './entities/player.dynamic.js';
import { Enemy } from './entities/enemy.dynamic.js';
import { Block } from './entities/block.entity.js';
import { World } from './world/world.js';
import { Camera } from './core/game.camera.js';
import { Directions } from './utils/utils.directions.js';


const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

let $container = document.getElementById('container');
const default_width = maxWidth;
const default_height = maxHeight - 100;

// Create base game class
export default class Game {
    constructor(width, height, targetFps = 60, showFps = true) {

        // costanti varie utili per il gioco
        this.constants = {
            width: width,
            height: height,
            targetFps: targetFps,
            showFps: showFps,
            spawnPoint: {
                x: width * 10,
                y: height * 10
            }
        };



        // generateCanvas ritorna sia a canvas che context
        const { canvas, context } = canvasUtils.generateCanvas(width, height);

        this.viewport = canvas;
        this.context = context;
        this.viewport.id = 'gameViewport';
        this.tick = 0; // inizializziamo il tick a 0
        this.grid = null; // inizializziamo la griglia a null

        // inseriamo il canvas nel container prima di qualsiasi altro elemento
        $container.insertBefore(this.viewport, $container.firstChild);

        // inizializziamo il giocatore

        let scene = new Scene(this, true);
        let camera = new Camera(this, width, height);
        this.world = new World(this, camera, scene)

        let player = new Player(scene, { x: Math.floor(width / 2), y: Math.floor(height / 2) }, {w: 64, h: 64}, {speed: 5, dir: Directions.DOWN}, {curr: 100, max: 100, immortal: false, timeToLive: -1}, null, {
            availableShoots: 0,
            maxShoots: 0,
            defaultDamage: 10,
            lastShootTime: 0,
            reloadTime: 100
        });
        scene.addPlayer(player);

        let enemy1 = new Enemy(scene, {x: 100, y: 30}, {w: 64, h: 64}, { speed: 3, dir: Directions.DOWN }, { curr: 100, max: 100, immortal: false, timeToLive: -1 }, {basicSrc: '../assets/zuccaccia/basic.png'}, {
            availableShoots: 0,
            maxShoots: 0,
            defaultDamage: 5,
            lastShootTime: 0,
            reloadTime: 500
        },
            player);

        scene.addEntity(enemy1);


        // assegnamo ad update un istanza di GameUpdate
        // e render un istanza di GameRender
        // e loop un istanza di GameLoop
        // in modo tale da poter accedere ai metodi di queste classi
        // tramite this.update, this.render e this.loop

        // prima cosa che facciamo è aggiornare
        this.update = new GameUpdate(this, this.world);
        // poi renderizziamo
        this.render = new GameRender(this, this.world);
        // infine inizializziamo il ciclo di gioco
        // che si occuperà di gestire il ciclo di vita del gioco
        // e di chiamare i metodi update e render al momento giusto
        this.loop = new GameLoop(this, this.world);
    }

}

// assegnando a window l'oggetto, rendiamo la variabile game come globale
window.game = new Game(default_width, default_height);
