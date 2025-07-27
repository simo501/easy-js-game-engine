export class GameRender {
    constructor(scope) {
        this.scope = scope;
        this.width = scope.constants.width;
        this.height = scope.constants.height;
        this.state = scope.state || {};
        this.render()
    }

    render() {
        const { scope, width, height } = this;

        // puliamo il canvas
        this.clearCanvas(scope.context, width, height);

        // disegniamo un rettangolo rosso
        scope.context.fillStyle = 'gray';
        scope.context.fillRect(0, 0, width, height);

        // disegniamo un testo
        scope.context.fillStyle = 'white';
        scope.context.font = '16px Arial';

        if (scope.constants.showFps) {
            // se showFps è true, disegniamo il frame rate
            scope.context.fillText(`FPS: ${Math.round(scope.constants.targetFps)}`, width - 100, 30);
        }


        if (this.state.hasOwnProperty('entities')) {
            const entities = Object.values(this.state.entities);
            for (const entity of entities) {
                entity.render() 
            }
        }
    }

    clearCanvas(context, width, height) {
        context.clearRect(0, 0, width, height);
    }
}
