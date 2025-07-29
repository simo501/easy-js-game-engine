import { Directions } from "../utils/utils.directions.js";
import { keysDown } from "../utils/utils.keysDown.js";
import { DynamicEntity } from "./dynamic.entity.js";

export class Player extends DynamicEntity {
    constructor(
        scope,
        position = { x: 0, y: 0 },
        moveSpeed = 5,
        width = 24,
        height = 24,
        direction = Directions.EAST,
        health = 100,
        damage = 10
    ) {
        super(scope, position, moveSpeed, width, height, direction, health, damage);
    }

    render() {
        super.render("#40d870");
        this.scope.context.fillStyle = "#FFFFFF";
        this.scope.context.fillText(`Player health: ${this.health.currentHealth}`, 10, 30);
    };

    update(tick) {
        console.log(`Player update tick: ${tick}`);
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

        if (!keysDown.isPressed.isAny) return

        const { collision, isBorder, entityCollided } = this.checkCollision(nextX, nextY);

        if (entityCollided && entityCollided.damage > 0) {
            this.health.currentHealth -= entityCollided.damage;
        }

        if (collision) return;

        // se non c'è collisione, aggiorniamo la posizione del player
        this.position.x = nextX;
        this.position.y = nextY;

        // console.log(`Player position x:${this.position.x} + ${this.width}, y: ${this.position.y} + ${this.height}, direction: ${this.direction}`);

        if (keysDown.isPressed.space) {
            this.shoot(
                5,
                10,
                10,
                10,
                this.damage,
                tick);
        }

        // qui dovremmo controllare i limiti del canvas
    }

}