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
        // per ora collision prevenirà solo il movimento
        if (keysDown.isPressed.left) {
            let nextX = this.position.x;

            let collision = this.checkCollision(nextX -= this.moveSpeed, this.position.y).collision;
            if (collision) return;

            this.position.x -= this.moveSpeed;
        }

        if (keysDown.isPressed.right) {
            let nextX = this.position.x;

            let collision = this.checkCollision(nextX += this.moveSpeed, this.position.y).collision;
            if (collision) return;

            this.position.x += this.moveSpeed;
        }

        if (keysDown.isPressed.up) {
            let nextY = this.position.y;
            
            let collision = this.checkCollision(this.position.x, nextY -= this.moveSpeed).collision;
            if (collision) return;

            this.position.y -= this.moveSpeed;
        }

        if (keysDown.isPressed.down) {
            let nextY = this.position.y;

            let collision = this.checkCollision(this.position.x, nextY += this.moveSpeed).collision;
            if (collision) return;

            this.position.y += this.moveSpeed;
        }

        // qui dovremmo controllare i limiti del canvas
    }

    getPlayer() {
        super.getEntity();
    }
}