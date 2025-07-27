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
        maxShoots = 1
    ) {
        super(scope, position, moveSpeed, width, height, direction, health, damage);
        this.availableShoots = maxShoots; // numero di proiettili disponibili
        this.maxShoots = maxShoots; // numero massimo di proiettili che può sparare
    }

    shoot() {
        if (this.availableShoots < 1) {
            console.log("Non puoi sparare, hai esaurito i proiettili!");
            return;
        }

        // implementazione del metodo di sparo, che può essere usato da Player e Enemy
        let x = 0, y = 0, moveSpeed = 0;
        if (this.direction === Directions.EAST) {
            x = this.position.x + this.width + 5;
            y = this.position.y + this.height / 2;
            moveSpeed += 5
        }

        let bulletPosition = { x: x, y: y };

        console.log(`Sparo in direzione ${this.direction} da posizione x:${bulletPosition.x},y: ${bulletPosition.y}`);

        // l'oggetto bullet rimane vivo fino a che ci sono riferimenti ad esso
        // quindi lo aggiungiamo allo stato del gioco
        const bullet = new Bullet(
            this.scope,
            bulletPosition,
            this.moveSpeed,
            10,
            10,
            this.direction,
            10,
            this.damage
        );


        this.state.entities.set(bullet, { type: 'bullet' });

        this.availableShoots -= 1; // decrementiamo il numero di proiettili disponibili
    }

}