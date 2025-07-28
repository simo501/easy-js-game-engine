import { Entity } from "./entity.js";
import { Directions } from "../utils/utils.directions.js";
import { Bullet } from "./bullet.js";

export class DynamicEntity extends Entity {
    constructor(
        scope,
        position = { x: 0, y: 0 },
        moveSpeed = 3,
        width = 23,
        height = 16,
        direction = Directions.EAST,
        health = 100,
        damage = 10,
        maxShoots = 10
    ) {
        super(scope, position, moveSpeed, width, height, direction, health, damage);
        this.availableShoots = maxShoots; // numero di proiettili disponibili
        this.maxShoots = maxShoots; // numero massimo di proiettili che può sparare
    }

    // la direzione di sparo è determinata correttamente da Bullet.js
    shoot(
        bulletSpeed = 5,
        bulletWidth = 10,
        bulletHeight = 10,
        bulletHealth = 10,
        bulletDamage = this.damage
    ) {

        // implementazione del metodo di sparo, che può essere usato da Player e Enemy
        let bulletX = 0, bulletY = 0;


        if (this.direction === Directions.EAST) {
            bulletX = this.position.x + this.width;
            bulletY = this.position.y + this.height / 2;
        } else if (this.direction === Directions.SOUTH) {
            bulletX = this.position.x + this.width / 2;
            bulletY = this.position.y + this.height;
        } else if (this.direction === Directions.WEST) {
            bulletX = this.position.x - bulletWidth;
            bulletY = this.position.y + this.height / 2;
        } else if (this.direction === Directions.NORTH) {
            bulletX = this.position.x + this.width / 2;
            bulletY = this.position.y - bulletHeight;
        }

        let bulletPosition = { x: bulletX, y: bulletY };

        console.log(`Sparo in direzione ${this.direction} da posizione x:${bulletPosition.x},y: ${bulletPosition.y}`);

        // l'oggetto bullet rimane vivo fino a che ci sono riferimenti ad esso
        // quindi lo aggiungiamo allo stato del gioco
        const bullet = new Bullet(
            this.scope,
            bulletPosition,
            bulletSpeed,
            bulletWidth,
            bulletHeight,
            this.direction,
            bulletHealth,
            bulletDamage
        );

        this.state.entities.set(bullet, { type: 'bullet' });
    }

}