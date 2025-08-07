import * as canvasUtils from './utils/utils.canvas.js';
import { GameUpdate } from './core/game.update.js';
import { GameRender } from './core/game.render.js';
import { GameLoop } from './core/game.loop.js';
import { Scene } from './scenes/scene.js';
import { Player } from './entities/player.js';
import { Enemy } from './entities/enemy.js';
import { Block } from './entities/block.js';
import { World } from './world/world.js';
import { Camera } from './core/game.camera.js';


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

        let player = new Player(this, scene, { x: width / 2, y: height / 2 }, 10, 20, 20, 10);
        scene.addPlayer(player);

        let enemy1 = new Enemy(this, scene, { x: 100, y: 30 }, 5, 40, 20, player);
        let block1 = new Block(this, scene, { x: 200, y: 60 }, 20, 20);
        let block2 = new Block(this, scene, { x: 300, y: 100 }, 20, 20);

        scene.addEntity(enemy1);
        scene.addEntity(block1);
        scene.addEntity(block2);
        

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
