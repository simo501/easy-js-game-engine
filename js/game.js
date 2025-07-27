import * as canvasUtils from './utils/utils.canvas.js';
import { gameUpdate } from './core/game.update.js';
import { gameRender } from './core/game.render.js';
import { gameLoop } from './core/game.loop.js';

let $container = document.getElementById('container');

// Create base game class
export default class Game {
    constructor(width, height, targetFps = 60, showFps = false) {

        this.constants = {
            width: width,
            height: height,
            targetFps: targetFps,
            showFps: showFps
        };

        // generateCanvas ritorna sia a canvas che context
        const { canvas, context } = canvasUtils.generateCanvas(width, height);

        this.viewport = canvas;
        this.context = context;
        this.viewport.id = 'gameViewport';

        // inseriamo il canvas nel container prima di qualsiasi altro elemento
        $container.insertBefore(this.viewport, $container.firstChild);

        this.update = gameUpdate(this);
        this.render = gameRender(this);
        this.loop = gameLoop.bind(this);

        return this;
    }
}

// assegnando a window l'oggetto, rendiamo la variabile game come globale
window.game = new Game(800, 600);
