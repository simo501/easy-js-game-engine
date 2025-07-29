import * as canvasUtils from './utils/utils.canvas.js';
import { GameUpdate } from './core/game.update.js';
import { GameRender } from './core/game.render.js';
import { GameLoop } from './core/game.loop.js';
import { Player } from './entities/player.js';
import { Enemy } from './entities/enemy.js';
import { Bullet } from './entities/bullet.js';
import { Block } from './entities/block.js';

let $container = document.getElementById('container');

// Create base game class
export default class Game {
    constructor(width, height, targetFps = 60, showFps = true) {

        // costanti varie utili per il gioco
        this.constants = {
            width: width,
            height: height,
            targetFps: targetFps,
            showFps: showFps
        };

        // state è un contenitore per gestire e accedere alle informazioni necessarie 
        // durante il ciclo di vita del gioco.
        this.state = {}
        this.state.entities = new Map();




        // generateCanvas ritorna sia a canvas che context
        const { canvas, context } = canvasUtils.generateCanvas(width, height);

        this.viewport = canvas;
        this.context = context;
        this.viewport.id = 'gameViewport';
        this.tick = 0; // inizializziamo il tick a 0

        
        // inseriamo il canvas nel container prima di qualsiasi altro elemento
        $container.insertBefore(this.viewport, $container.firstChild);
    

        // inizializziamo il giocatore
        this.createEnemy()
        this.createPlayer()
        this.createBlock()
        this.createBlock({ x: 300, y: 300 }, 100, 100);


        console.log(this)


        // assegnamo ad update un istanza di GameUpdate
        // e render un istanza di GameRender
        // e loop un istanza di GameLoop
        // in modo tale da poter accedere ai metodi di queste classi
        // tramite this.update, this.render e this.loop

        // prima cosa che facciamo è aggiornare
        this.update = new GameUpdate(this);
        // poi renderizziamo
        this.render = new GameRender(this);
        // infine inizializziamo il ciclo di gioco
        // che si occuperà di gestire il ciclo di vita del gioco
        // e di chiamare i metodi update e render al momento giusto
        this.loop = new GameLoop(this);
    }

    // metodo per creare un giocatore ed aggiungerlo allo stato del gioco
    createPlayer() {
        const player = new Player(this)
        this.state.entities.set(player, { type: 'player' });
    }

    createEnemy() {
        const enemy = new Enemy(this, { x: this.constants.width / 2, y: this.constants.height / 2 }, 1, 64, 64);
        this.state.entities.set(enemy, { type: 'enemy' });
   }

//    createBullet(position = { x: 100, y: 0 }, moveSpeed = 5) {
//        const bullet = new Bullet(this, position, moveSpeed);
//        this.state.entities.set(bullet, { type: 'bullet' });
//    }

    createBlock(position = { x: 200, y: 200 }, width = 50, height = 50) {
        const block = new Block(this, position, width, height);
        this.state.entities.set(block, { type: 'block' });
    }
}

// assegnando a window l'oggetto, rendiamo la variabile game come globale
window.game = new Game(800, 600);
