import { keysDown } from "../utils/utils.keysDown.js";

export class Player {
    constructor(scope, position = {x:0, y:0}, moveSpeed=1, width=23, height=16) {
        this.scope = scope;
        this.position = position;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
    }

    render() {
        this.scope.context.fillStyle = '#40d870';
        this.scope.context.fillRect(
            this.position.x,
            this.position.y,
            this.width, 
            this.height
        );
    };

    update() {
        if (keysDown.isPressed.left) {
            this.position.x -= this.moveSpeed;
        }

        if (keysDown.isPressed.right) {
            this.position.x += this.moveSpeed;
        }

        if (keysDown.isPressed.up) {
            this.position.y -= this.moveSpeed;
        }

        if (keysDown.isPressed.down) {
            this.position.y += this.moveSpeed;
        }

        // qui dovremmo controllare i limiti del canvas
    }

    getPlayer() {
        return this;
    }
}