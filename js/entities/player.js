import { keysDown } from "../utils/utils.keysDown.js";
import { Entity } from "./entity.js";

export class Player extends Entity {
    constructor(scope, position = {x:0, y:0}, moveSpeed=3, width=23, height=16) {
        super(scope, position, moveSpeed, width, height);
    }

    render() {
        super.render("#40d870");
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
        super.getEntity();
    }
}