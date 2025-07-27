import { keysDown } from "../utils/utils.keysDown.js";

export class Player {
    constructor(scope, position = {x:0, y:0}, moveSpeed=1, width=23, height=16) {
        let player = this;
        player.scope = scope;
        player.position = position;
        player.moveSpeed = moveSpeed;
        player.width = width;
        player.height = height;
    }

    playerRender() {
        scope.context.fillStyle = '#40d870';
        scope.context.fillRect(
            player.state.position.x,
            player.state.position.y,
            width, height
        );
    };

    playerUpdate() {
        if (keysDown.isPressed.left) {
            player.state.position.x -= player.state.moveSpeed;
        }

        if (keysDown.isPressed.right) {
            player.state.position.x += player.state.moveSpeed;
        }

        if (keysDown.isPressed.up) {
            player.state.position.y -= player.state.moveSpeed;
        }

        if (keysDown.isPressed.down) {
            player.state.position.y += player.state.moveSpeed;
        }

        // qui dovremmo controllare i limiti del canvas
    }

    getPlayer() {
        return this;
    }
}