
import { Directions } from "../utils/utils.directions.js";

export class Entity {
    constructor(
        scope,
        scene,
        position = { x: 0, y: 0 },
        moveSpeed = 3,
        width = 23,
        height = 16,
        direction = "down",
        damage = 10,
    ) {
        this.scope = scope;
        this.state = scope.state; // Stato del gioco
        this.position = position;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
        this.direction = direction; // Direzione dell'entità
        this.damage = damage; // Danno inflitto dall'entità
        this.createdAt = performance.now(); // momento in cui il proiettile è stato creato

        this.scene = scene
        // salviamo il valore tick dallo scope
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