import { drawGrid } from "../utils/utils.grid.js";

export class GameRender {
    constructor(scope, world) {
        this.scope = scope;
        this.width = scope.constants.width;
        this.height = scope.constants.height;
        this.state = scope.state;
        this.world = world;
        this.render(0);
    }

    render(fps) {
        const { scope, width, height } = this;

        // 1. Pulizia del canvas
        this.clearCanvas(scope.context, width, height);


        // 3. Debug: disegna griglia se disponibile 
        if (scope.grid) {
            drawGrid(scope.context, scope.grid); 
        }

        this.world.render(this.scope.tick);

        // mettiamo il frame rate in alto a sinistra
        scope.context.fillStyle = 'white';
        scope.context.font = '12px Arial';
        if (scope.constants.showFps) {
            scope.context.fillText(`FPS: ${fps}`, width - 100, 30);
        }
    }

    clearCanvas(context, width, height) {
        context.clearRect(0, 0, width, height);
    }
}
