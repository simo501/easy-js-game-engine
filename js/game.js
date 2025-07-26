import * as canvasUtils from './utils/utils.canvas.js';

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

        this.context.font = '64px Arial';
        this.context.fillText('padre pio un grande padre', 48, 48, 400);

        return this;
    }
}

// assegnando a window l'oggetto, rendiamo la variabile game come globale
window.game = new Game(800, 600);
