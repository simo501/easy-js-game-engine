import * as canvasUtils from './utils/utils.canvas.js';
import { GameUpdate } from './core/game.update.js';
import { GameRender } from './core/game.render.js';
import { GameLoop } from './core/game.loop.js';
import { Player } from './entities/player.js';
import { Enemy } from './entities/enemy.js';

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

        // generateCanvas ritorna sia a canvas che context
        const { canvas, context } = canvasUtils.generateCanvas(width, height);

        this.viewport = canvas;
        this.context = context;
        this.viewport.id = 'gameViewport';

        // inseriamo il canvas nel container prima di qualsiasi altro elemento
        $container.insertBefore(this.viewport, $container.firstChild);

        // inizializziamo il giocatore
        this.createPlayer()
        this.createEnemy()

        // assegnamo ad update un istanza di GameUpdate
        // e render un istanza di GameRender
        // e loop un istanza di GameLoop
        // in modo tale da poter accedere ai metodi di queste classi
        // tramite this.update, this.render e this.loop
        this.update = new GameUpdate(this);
        this.render = new GameRender(this);
        this.loop = new GameLoop(this);
    }

    // metodo per creare un giocatore ed aggiungerlo allo stato del gioco
    createPlayer() {
        console.log('Game: creating player');
        this.state.entities = this.state.entities || {};
        this.state.entities.player = new Player(this)
    }

    createEnemy() {
        console.log('Game: creating enemy');
        this.state.entities = this.state.entities || {};
        this.state.entities.enemy = new Enemy(this);
    }
}

// assegnando a window l'oggetto, rendiamo la variabile game come globale
window.game = new Game(800, 600);
