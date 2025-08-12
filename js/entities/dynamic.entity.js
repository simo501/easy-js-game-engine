import { Entity } from "./base.entity.js";
import { Directions } from "../utils/utils.directions.js";
import { Bullet } from "./bullet.entity.js";

export class DynamicEntity extends Entity {
    constructor(
        scene,
        position = { x: 0, y: 0 },
        dimensions = { w: 23, h: 16 },
        movement = { speed: 0, dir: Directions.DOWN },
        // timetoLive è il tempo di vita dell'entità, -1 significa che non ha un tempo di vita
        health = { curr: 100, max: 100, immortal: false, timeToLive: -1},
        assets = null,
        // proprietà aggiuntive per le entità dinamiche
        shootingProperties = {
            availableShoots: 0, // numero di proiettili disponibili
            maxShoots: 0, // numero massimo di proiettili che si possono avere
            defaultDamage: 10, // danno di default dei proiettili
            lastShootTime: 0,
            reloadTime: 100 // tempo di ricarica in millisecondi
        },
    ) {
        super(scene, position, dimensions, movement, health, assets);
        this.shootingProperties = shootingProperties;
    }

    // la direzione di sparo è determinata correttamente da Bullet.js
    shoot(
        bulletSpeed = 5,
        bulletWidth = 10,
        bulletHeight = 10,
        bulletHealth = 10,
        tick
    ) {
        // contorlliamo il reload time
        if (this.shootingProperties.lastShootTime + this.shootingProperties.reloadTime > tick) return;

        // la velocità del proiettile non può essere inferiore alla velocità di movimento dell'entità
        if (bulletSpeed <= this.movement.speed) 
            bulletSpeed += this.movement.speed;

        const bulletPosition = this.calculateBulletPosition(bulletWidth, bulletHeight);


        const bullet = new Bullet(
            this.scene,
            bulletPosition,
            { w: bulletWidth, h: bulletHeight },
            { speed: bulletSpeed, dir: this.movement.dir },
            { curr: bulletHealth, max: bulletHealth, immortal: false, timeToLive: -1 },
            this.shootingProperties.defaultDamage,
            this
        );

        this.scene.addEntity(bullet);
        this.shootingProperties.lastShootTime = tick;
    }

    calculateBulletPosition(bulletWidth, bulletHeight) {
        let bulletX = 0, bulletY = 0;

        if (this.movement.dir === Directions.EAST) {
            bulletX = this.position.x + this.dimensions.w;
            bulletY = this.position.y + (this.dimensions.h - bulletHeight) / 2;
        } else if (this.movement.dir === Directions.SOUTH) {
            bulletX = this.position.x + (this.dimensions.w - bulletWidth) / 2;
            bulletY = this.position.y + this.dimensions.h;
        } else if (this.movement.dir === Directions.WEST) {
            bulletX = this.position.x - bulletWidth;
            bulletY = this.position.y + (this.dimensions.h - bulletHeight) / 2;
        } else if (this.movement.dir === Directions.NORTH) {
            bulletX = this.position.x + (this.dimensions.w - bulletWidth) / 2;
            bulletY = this.position.y - bulletHeight;
        }

        return { x: bulletX, y: bulletY };
    }
}