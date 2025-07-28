import { Entity } from "./entity.js";
import { Directions } from "../utils/utils.directions.js";

export class Bullet extends Entity {
    constructor(
        scope,
        position = { x: 100, y: 0 },
        moveSpeed = 5,
        width = 10,
        height = 10,
        direction = Directions.EAST,
        health = 10,
        damage = 10,
        entityOrigin
    ) {

        super(scope, position, moveSpeed, width, height, direction, health, damage);
        this.entityOrigin = this.entityOrigin
    }

    render() {
        super.render("#ffffff");
    }

    update(tick) {
        let nextX = this.position.x;
        let nextY = this.position.y;
        
        if (this.direction === Directions.EAST) {
            nextX += this.moveSpeed;
        }
        else if (this.direction === Directions.SOUTH) {
            nextY += this.moveSpeed;
        }
        else if (this.direction === Directions.WEST) {
            nextX -= this.moveSpeed;
        }
        else if (this.direction === Directions.NORTH) {
            nextY -= this.moveSpeed;
        }

        const { collision, isBorder, entityCollided } = this.checkCollision(nextX, nextY);

        if (collision) {
            // se c'è una collisione, rimuoviamo il proiettile
            if (entityCollided) {
                entityCollided.takeDamage(this.damage);
            }
            this.die()
            return;
        }

        // se non c'è collisione, aggiorniamo la posizione del proiettile
        this.position.x = nextX;
        this.position.y = nextY;

    }

    removeBullet() {
        // rimuoviamo il proiettile dallo stato del gioco
        this.die();
    }

}