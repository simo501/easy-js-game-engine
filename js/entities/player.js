import { Directions } from "../utils/utils.directions.js";
import { keysDown } from "../utils/utils.keysDown.js";
import { DynamicEntity } from "./dynamic.entity.js";

export class Player extends DynamicEntity {
    constructor(
        scope, 
        position = { x: 0, y: 0 }, 
        moveSpeed = 3, 
        width = 23, 
        height = 16, 
        direction = Directions.EAST, 
        health = 100, 
        damage = 10) {
        super(scope, position, moveSpeed, width, height, direction, health, damage);
    }

    render() {
        super.render("#40d870");
    };

    update() {
        // per ora collision prevenirà solo il movimento
        let nextX = this.position.x;
        let nextY = this.position.y;

        if (keysDown.isPressed.left) {
            this.direction = Directions.LEFT;
            nextX -= this.moveSpeed;
        }

        if (keysDown.isPressed.right) {
            this.direction = Directions.RIGHT;
            nextX += this.moveSpeed
        }

        if (keysDown.isPressed.up) {
            this.direction = Directions.UP;
            nextY -= this.moveSpeed
        }

        if (keysDown.isPressed.down) {
            this.direction = Directions.DOWN;
            nextY += this.moveSpeed
        }

        let collision = this.checkCollision(nextX, nextY).collision;
        if (collision) return;

        // se non c'è collisione, aggiorniamo la posizione del player
        this.position.x = nextX;
        this.position.y = nextY;

        console.log(`Player position x:${this.position.x} + ${this.width}, y: ${this.position.y} + ${this.height}, direction: ${this.direction}`);

        if (keysDown.isPressed.space) {
            // sparo
            this.shoot();
        }

        // qui dovremmo controllare i limiti del canvas
    }

}