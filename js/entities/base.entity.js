
import { Directions } from "../utils/utils.directions.js";

export class Entity {
    // scope lo prendiamo da scene
    constructor(
        scene,
        position = { x: 0, y: 0},
        dimensions = { width: 23, height: 16 },
        movement = { speed: 0, direction: Directions.DOWN},
        health = { current: 100, max: 100 },
    ) {
        this.scene = scene
        // lo scope lo prendiamo dalla scena
        this.scope = scene.scope;
        this.position = position; 
        this.dimensions = dimensions;
        this.movement = movement; 
        this.health = health;
        this.infos = {createdAt: performance.now()} 
    }

    render(color = '#ff44ff') {
        this.scope.context.fillStyle = color;
        this.scope.context.fillRect(
            this.position.x % this.scope.constants.width,
            this.position.y % this.scope.constants.height,
            this.width,
            this.height
        );
    }

    update(tick) {
        // Metodo vuoto, da sovrascrivere nelle sottoclassi
    }

    checkCollision(nextX, nextY) {
        let collision = false;
        let isBorder = false;
        let isInvalicable = false;
        let entityCollided;

        // console.log(nextX, nextY, 'new x and y position');

        // Controllo dei limiti del canvas
        // if (nextX < 0 || nextX + this.width > this.scope.constants.width ||
        //     nextY < 0 || nextY + this.height > this.scope.constants.height) {
        //     collision = true;
        //     isBorder = true;
        // }
        // per ora controlliamo solo se l'entità è visibile nella camera
        // se non è visibile allora abbiamo una collisione con il bordo del canvas
        if (!this.scope.world.camera.isOnCamera(null, {x:nextX, y:nextY}).onCamera) {
            collision = true;
            isBorder = true;
        }

        // non si puo andare sui numeri negativi
        if (nextX < 0 || nextY < 0) {
            collision = true;
            isBorder = true;
            isInvalicable = true;
        }

        // Controllo delle collisioni con altre entità
        const entities = this.scope.world.scene.entities;
        for (const entity of entities.keys()) {
            if (this !== entity &&
                nextX < entity.position.x + entity.width &&
                nextX + this.width > entity.position.x &&
                nextY < entity.position.y + entity.height &&
                nextY + this.height > entity.position.y) {

                collision = true;
                entityCollided = entity;
                console.log(nextX, nextY, isBorder, collision, 'has detected a collision detected with');
            }
        }

        // if (!collision) this.changePosition(nextX, nextY);

        return { collision, isBorder, isInvalicable, entityCollided };
    }

    changePosition(nextX, nextY) {
        this.position.x = nextX;
        this.position.y = nextY;
    }

    invertDirection() {
        if (this.direction === Directions.EAST) {
            this.direction = Directions.WEST;
        } else if (this.direction === Directions.WEST) {
            this.direction = Directions.EAST;
        }
        else if (this.direction === Directions.NORTH) {
            this.direction = Directions.SOUTH;
        }
        else if (this.direction === Directions.SOUTH) {
            this.direction = Directions.NORTH;
        }
    }


    die() {
        this.scene.removeEntity(this);
    }
}