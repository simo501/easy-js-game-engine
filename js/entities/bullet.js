import { Entity } from "./entity.js";
import { Directions } from "../utils/utils.directions.js";

export class Bullet extends Entity {
    constructor(scope,
        position = { x: 100, y: 0 },
        moveSpeed = 5,
        width = 10,
        height = 10,
        direction = Directions.EAST,
        health = 10,
        damage = 10) {

        super(scope, position, moveSpeed, width, height, direction, health, damage);
    }

    render() {
        super.render("#ffffff");
    }

    update() {
        let nextX = this.position.x;
        let nextY = this.position.y;
        if (this.direction === Directions.EAST) {
            nextX += this.moveSpeed;
        }
        else if (this.direction === Directions.SOUTH) {
            nextY += this.moveSpeed;
        }

        if (this.checkCollision(nextX, nextY).collision) {
            // se c'è una collisione, rimuoviamo il proiettile
            this.removeBullet();
            return;
        }

        // se non c'è collisione, aggiorniamo la posizione del proiettile
        this.position.x = nextX;
        this.position.y = nextY;

    }

    removeBullet() {
        // rimuoviamo il proiettile dallo stato del gioco
        this.state.entities.delete(this);
    }

}