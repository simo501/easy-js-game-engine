import { Entity } from "./entity.js";
import { Directions } from "../utils/utils.directions.js";
import { Block } from "./block.js";
import { Particle } from './particles.js';


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
        this.createdAt = performance.now(); // momento in cui il proiettile è stato creato
        this.timeToLive = 5000; // tempo di vita del proiettile in millisecondi
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
        context.fillRect(
            this.position.x + (this.width - scaledWidth) / 2,
            this.position.y + (this.height - scaledHeight) / 2,
            scaledWidth,
            scaledHeight
        );
    }



    update(tick) {
        let nextX = this.position.x;
        let nextY = this.position.y;

        if (tick - this.createdAt > this.timeToLive) {
            this.removeBullet();
            return;
        }


    // Movimento base
        if (this.direction === Directions.EAST) {
            nextX += this.moveSpeed;
        } else if (this.direction === Directions.SOUTH) {
            nextY += this.moveSpeed;
        } else if (this.direction === Directions.WEST) {
            nextX -= this.moveSpeed;
        } else if (this.direction === Directions.NORTH) {
            nextY -= this.moveSpeed;
        }

    // Verifica collisioni
        const { collision, isBorder, entityCollided } = this.checkCollision(nextX, nextY);

        const info = this.state.entities.get(entityCollided);

    // Collisione con nemico
        if (collision && info?.type === 'enemy') {
            entityCollided.takeDamage(this.damage);
            this.die();
            return;
    }


    // Se tocca un bordo, inverte la direzione per rimbalzare
        if (collision && (isBorder || entityCollided instanceof Block)) {
            if (this.direction === Directions.EAST) {
                this.direction = Directions.WEST;
                nextX -= this.moveSpeed
            }else if (this.direction === Directions.WEST){ 
                this.direction = Directions.EAST;
                nextX += this.moveSpeed
            }
            else if (this.direction === Directions.NORTH){
                this.direction = Directions.SOUTH;
                nextY += this.moveSpeed
            }
            else if (this.direction === Directions.SOUTH){
                this.direction = Directions.NORTH;
                nextX -= this.moveSpeed
            }
            return;
        }
        // Se tutto ok, aggiorna la posizione
        this.position.x = nextX;
        this.position.y = nextY;
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