import { drawGrid } from "../utils/utils.grid.js";

export class GameRender {
    constructor(scope) {
        this.scope = scope;
        this.width = scope.constants.width;
        this.height = scope.constants.height;
        this.state = scope.state;
        this.render(0);
    }

    render(fps) {
        const { scope, width, height } = this;

        // 1. Pulizia del canvas
        this.clearCanvas(scope.context, width, height);

        // 2. Sfondo
        scope.context.fillStyle = 'gray';
        scope.context.fillRect(0, 0, width, height);

        // 3. Debug: disegna griglia se disponibile (si rimuove dopo )
        if (scope.grid) {
            drawGrid(scope.context, scope.grid); 
        }

        // 4. Testo FPS
        scope.context.fillStyle = 'white';
        scope.context.font = '16px Arial';
        if (scope.constants.showFps) {
            scope.context.fillText(`FPS: ${fps}`, width - 100, 30);
        }

        // 5. Rendering entità
        if (this.state.hasOwnProperty('entities')) {
            const entities = this.state.entities;
            for (const entity of entities.keys()) {
                entity.render(this.scope.tick);
            }
        }
    }

    clearCanvas(context, width, height) {
        context.clearRect(0, 0, width, height);
    }
}
