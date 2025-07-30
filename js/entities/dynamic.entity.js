import { Entity } from "./entity.js";
import { Directions } from "../utils/utils.directions.js";
import { Bullet } from "./bullet.js";

export class DynamicEntity extends Entity {
    constructor(
        scope,
        scene,
        position = { x: 0, y: 0 },
        moveSpeed = 3,
        width = 23,
        height = 16,
        direction = Directions.EAST,
        health = 100,
        damage = 10,
        maxShoots = 10
    ) {
        super(scope, scene, position, moveSpeed, width, height, direction, damage);

        // salute attuale dell'entità
        this.health = {
            currentHealth: health,
            maxHealth: health
        }
        // salute massima dell'entità

        this.shootProperties = {
            availableShoots: maxShoots, // numero di proiettili disponibili
            maxShoots: maxShoots, // numero massimo di proiettili che
            defaultDamage: damage, // danno di default dei proiettili
            lastShootTime: 0,
            reloadTime: 100 // tempo di ricarica in millisecondi
        }
    }

    // la direzione di sparo è determinata correttamente da Bullet.js
    shoot(
        bulletSpeed = 5,
        bulletWidth = 10,
        bulletHeight = 10,
        bulletHealth = 10,
        bulletDamage = this.damage,
        tick
    ) {
        // contorlliamo il reload time
        if (this.shootProperties.lastShootTime + this.shootProperties.reloadTime > tick) return;

        if (bulletSpeed < this.moveSpeed) {
            bulletSpeed += this.moveSpeed;
        }

        // implementazione del metodo di sparo, che può essere usato da Player e Enemy
        let bulletX = 0, bulletY = 0;


        // dobbiamo rimuovere in certi casi la width e l'height del proiettile
        // perchè crescono da sinistra a destra e dall'alto verso il basso
        // quindi se non rimuoviamo la width e l'height del proiettile
        // il proiettile parte da dentro l'entità dinamica
        if (this.direction === Directions.EAST) {
            bulletX = this.position.x + this.width;
            bulletY = this.position.y + (this.height - bulletHeight) / 2;
        } else if (this.direction === Directions.SOUTH) {
            bulletX = this.position.x + (this.width - bulletWidth) / 2;
            bulletY = this.position.y + this.height;
        } else if (this.direction === Directions.WEST) {
            bulletX = this.position.x - bulletWidth;
            bulletY = this.position.y + (this.height - bulletHeight) / 2;
        } else if (this.direction === Directions.NORTH) {
            bulletX = this.position.x + (this.width - bulletWidth) / 2;
            bulletY = this.position.y - bulletHeight;
        }

        let bulletPosition = { x: bulletX, y: bulletY };

        // console.log(`Sparo in direzione ${this.direction} da posizione x:${bulletPosition.x},y: ${bulletPosition.y}`);

        // l'oggetto bullet rimane vivo fino a che ci sono riferimenti ad esso
        // quindi lo aggiungiamo allo stato del gioco
        this.shootProperties.lastShootTime = tick;

        const bullet = new Bullet(
            this.scope,
            this.scene,
            bulletPosition,
            bulletSpeed,
            bulletWidth,
            bulletHeight,
            this.direction,
            bulletHealth,
            bulletDamage,
            this // campo entityOrigin per tenere traccia dell'entità che ha sparato il proiettile
        );

        this.scene.addEntity(bullet);
    }

    takeDamage(amount) {
        this.health.currentHealth -= amount;
        if (this.health.currentHealth <= 0) {
            this.die();
        }
    }
}