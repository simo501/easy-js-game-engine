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
        scope.context.clearRect(0, 0, width, height);

        // disegniamo un rettangolo rosso
        scope.context.fillStyle = 'gray';
        scope.context.fillRect(0, 0, width, height);

        // disegniamo un testo
        scope.context.fillStyle = 'white';
        scope.context.font = '24px Arial';
        scope.context.fillText('Game Render', 10, 30);

        if (scope.constants.showFps) {
            // se showFps è true, disegniamo il frame rate
            scope.context.fillText(`FPS: ${Math.round(scope.constants.targetFps)}`, 10, 50);
        }


        if (this.state.hasOwnProperty('entities')) {
            if (this.state.entities && Array.isArray(this.state.entities)) {
                for (let entity of this.state.entities) {
                    if (typeof entity.render === 'function') {
                        entity.render();
                    }
                }
            } else if (this.state.entities) {
                console.log('GameUpdate: updating player entity');
                let entity = this.state.entities.player;
                if (typeof entity.render === 'function') {
                    entity.render();
                }
            }
        }
    }
}
