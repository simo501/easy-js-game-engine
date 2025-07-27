export class Player {
    constructor(scope, position, moveSpeed, width, height) {
        let player = this;
        player.scope = scope;
        player.position = {x: 0, y: 0} || position;
        player.moveSpeed = moveSpeed || 1;
        player.width = width || 23;
        player.height = height || 16;
    }

    playerRender() {
        scope.context.fillStyle = '#40d870';
        scope.context.fillRect(
            player.state.position.x,
            player.state.position.y,
            width, height
        );
    };
}