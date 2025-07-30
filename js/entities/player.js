import { Directions } from "../utils/utils.directions.js";
import { keysDown } from "../utils/utils.keysDown.js";
import { DynamicEntity } from "./dynamic.entity.js";

export class Player extends DynamicEntity {
    constructor(
        scope,
        scene,
        position = { x: 0, y: 0 },
        moveSpeed = 10,
        width = 20,
        height = 20,
        direction = Directions.EAST,
        health = 100,
        damage = 10
    ) {
        super(scope, scene, position, moveSpeed, width, height, direction, health, damage);
    }

    render() {
        super.render("#40d870");
        this.scope.context.fillStyle = "#FFFFFF";
        this.scope.context.fillText(`Player health: ${this.health.currentHealth}`, 10, 30);
    }

    update(tick) {
        // console.log(`Player position: x=${this.position.x}, y=${this.position.y}`);
        // Se non viene premuto nessun tasto, non facciamo nulla
        console.log(`Player update at tick: ${this.position.x}, y=${this.position.y}`);
        if (!keysDown.isPressed.isAny) return;

        let nextX = this.position.x;
        let nextY = this.position.y;
        let addX = 0, addY = 0;

        // Gestione del movimento
        if (keysDown.isPressed.left) {
            this.direction = Directions.LEFT;
            nextX -= this.moveSpeed;
            addX -= 1;
        }

        if (keysDown.isPressed.right) {
            this.direction = Directions.RIGHT;
            nextX += this.moveSpeed;
            addX += 1;
        }

        if (keysDown.isPressed.up) {
            this.direction = Directions.UP;
            nextY -= this.moveSpeed;
            addY -= 1;
        }

        if (keysDown.isPressed.down) {
            this.direction = Directions.DOWN;
            nextY += this.moveSpeed;
            addY += 1;
        }

        let collision, isBorder, entityCollided;
        let x = this.position.x;
        let y = this.position.y;

        // console.log(x, y, nextX, nextY, 'player update');

        // Movimento incrementale con controllo collisioni
        while (x != nextX || y != nextY) {
            if (x != nextX) x += addX;
            if (y != nextY) y += addY;

            const collisionRes = this.checkCollision(x, y);

            if (collisionRes.collision && collisionRes.isBorder && !collisionRes.isInvalicable) {
                this.changePosition(x, y);
            } else if (!collisionRes.collision) {
                this.changePosition(x, y);
            }
        }

        // Gestione dello sparo
        if (keysDown.isPressed.space) {
            this.shoot(5, 10, 10, 10, this.damage, tick);
        }
    }
    checkCollision(nextX, nextY) {
        // Verifica collisioni tramite il metodo della classe base
        return super.checkCollision(nextX, nextY)
    }
}