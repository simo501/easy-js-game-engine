import { Entity } from "./entity.js";
import { Directions } from "../utils/utils.directions.js";
import { Block } from "./block.js";


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
        super.render("#ffffff");
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


    removeBullet() {
        // rimuoviamo il proiettile dallo stato del gioco
        this.die();
    }

}