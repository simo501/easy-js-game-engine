import { Entity } from "./base.entity.js";
import { Directions } from "../utils/utils.directions.js";
import { Block } from "./block.entity.js";
import { Particle } from './particles.js';
import { DynamicEntity } from "./dynamic.entity.js";


export class Bullet extends Entity {
    constructor(
        scene,
        position = { x: 0, y: 0 },
        dimensions = { w: 23, h: 16 },
        movement = { speed: 0, dir: Directions.DOWN },
        health = { curr: 100, max: 100, immortal: false, timeToLive: -1 },
        assets = null,
        // proprietà aggiuntive per i proiettili
        shooter = null, // l'entità che ha sparato il proiettile
    ) {
        super(scene, position, dimensions, movement, health, assets);
        this.shooter = shooter;
    }

    render(tick) {
        const context = this.scope.context;


        context.fillStyle = `rgba(255, 255, 255)`;
        // context.fillR
        context.beginPath();
        context.arc(
            this.position.x % this.scope.constants.width + this.width / 2,
            this.position.y % this.scope.constants.height + this.height / 2,
            this.width / 2,
            0,
            Math.PI * 2
        );
        context.fill();
    }


    update(tick) {

        // se il proiettile vive da troppo tempo lo rimuoviamo
        if (immortal === false && this.health.timeToLive != -1) {
            if (tick - this.infos.createdAt > this.health.timeToLive) {
                this.die();
                return;
            }
        }


        let nextX = this.position.x;
        let nextY = this.position.y;

        let addX = 0, addY = 0;

        // Movimento base
        if (this.direction === Directions.EAST) {
            nextX += this.moveSpeed;
            addX += 1;
        } else if (this.direction === Directions.SOUTH) {
            nextY += this.moveSpeed;
            addY += 1;
        } else if (this.direction === Directions.WEST) {
            nextX -= this.moveSpeed;
            addX -= 1;
        } else if (this.direction === Directions.NORTH) {
            nextY -= this.moveSpeed;
            addY -= 1;
        }

        let x = this.position.x, y = this.position.y;

        while (x != nextX || y != nextY) {
            if (x != nextX) x += addX;
            if (y != nextY) y += addY;
            // è il metodo check collision che cambia posizione
            const collisionRes = this.checkCollision(x, y);
            // controlliamo quale entità ha colliso con il proiettile
            if (collisionRes.collision) {
                if (collisionRes.isBorder || (collisionRes.entityCollided && collisionRes.entityCollided instanceof Block)) {
                    this.die();
                } else if (collisionRes.entityCollided instanceof DynamicEntity) {
                    collisionRes.entityCollided.takeDamage(this.damage)
                    this.die();
                    break
                }
            } else {
                this.changePosition(x, y);
            }
        }
    }

    checkCollision(nextX, nextY) {
        return super.checkCollision(nextX, nextY);
    }


    spawnParticles() {
        const numParticles = 4;
        const baseSpeed = 2;

        for (let i = 0; i < numParticles; i++) {
            const angle = (Math.PI * 2 / numParticles) * i;

            const velocity = {
                x: Math.cos(angle) * baseSpeed,
                y: Math.sin(angle) * baseSpeed,
            };

            const particle = new Particle(
                this.scope,
                this.scene,
                {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height / 2,
                },
                velocity,
                300 // durata in ms
            );

            this.scene.addEntity(particle);
        }
    }

    die() {
        super.die();
    }

}