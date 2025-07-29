import { Entity } from "./entity.js";
import { Directions } from "../utils/utils.directions.js";
import { Block } from "./block.js";
import { Particle } from './particles.js';
import { DynamicEntity } from "./dynamic.entity.js";


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
        this.timeToLive = 3000; // tempo di vita del proiettile in millisecondi
    }

    render() {
        const context = this.scope.context;
        const tick = this.scope.tick;
        const timePassed = tick - this.createdAt;
        const fadeStart = this.timeToLive * 0.3; // 30% vita piena, 70% dissolvenza
        const fadeDuration = this.timeToLive - fadeStart;

        let fadeProgress = 0;

        if (timePassed > fadeStart) {
            fadeProgress = Math.min(1, (timePassed - fadeStart) / fadeDuration);
        }

        const alpha = 1 - fadeProgress;
        const scale = 1 - fadeProgress * 0.5; // solo fino a metà dimensione

        const scaledWidth = this.width * scale;
        const scaledHeight = this.height * scale;

        context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        // context.fillRect(
        //     this.position.x + (this.width - scaledWidth) / 2,
        //     this.position.y + (this.height - scaledHeight) / 2,
        //     scaledWidth,
        //     scaledHeight
        // );
        context.beginPath();
        context.arc(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2,
            this.width / 2,
            0,
            Math.PI * 2
        );
        context.fill();
    }



    update(tick) {

        // se il proiettile vive da troppo tempo lo rimuoviamo
        if (tick - this.createdAt > this.timeToLive) {
            this.removeBullet();
            return;
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
            this.checkCollision(x, y);
        }

        // Verifica collisioni
        // const { collision, isBorder, entityCollided } = this.checkCollision(nextX, nextY);

        // const info = this.state.entities.get(entityCollided);

        // Collisione con nemico
        // if (collision && info?.type === 'enemy') {
        //     entityCollided.takeDamage(this.damage);
        //     this.die();
        //     return;
        // }

        // Se tutto ok, aggiorna la posizione
        // this.position.x = nextX;
        // this.position.y = nextY;
    }

    checkCollision(nextX, nextY) {
        const { collision, isBorder, entityCollided } = super.checkCollision(nextX, nextY);

        // Se tocca un bordo, inverte la direzione per rimbalzare
        if (collision && (isBorder || (entityCollided && entityCollided instanceof Block))) {

        }


        if (collision) {
            if (isBorder || (entityCollided && entityCollided instanceof Block)) {
                console.log('Collision with border or block');
                if (this.direction === Directions.EAST) {
                    this.direction = Directions.WEST;
                    // nextX -= this.moveSpeed
                } else if (this.direction === Directions.WEST) {
                    this.direction = Directions.EAST;
                    // nextX += this.moveSpeed
                }
                else if (this.direction === Directions.NORTH) {
                    this.direction = Directions.SOUTH;
                    // nextY += this.moveSpeed
                }
                else if (this.direction === Directions.SOUTH) {
                    this.direction = Directions.NORTH;
                    // nextX -= this.moveSpeed
                }
                return;
            } else if (entityCollided instanceof DynamicEntity) {
                entityCollided.takeDamage(this.damage)
            } else if (entityCollided instanceof Bullet) {
                this.changePosition(nextX, nextY);
                return;
            }
            this.die();
        }
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
                {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height / 2,
                },
                velocity,
                300 // durata in ms
            );

            this.state.entities.set(particle, { type: 'particle' });
        }
    }



    removeBullet() {
        this.spawnParticles();
        this.die();
    }

}