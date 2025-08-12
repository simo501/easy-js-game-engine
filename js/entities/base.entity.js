import { Directions } from "../utils/utils.directions.js";

export class Entity {
    // scope lo prendiamo da scene
    constructor(
        scene,
        position = { x: 0, y: 0 },
        dimensions = { w: 23, h: 16 },
        movement = { speed: 0, dir: Directions.DOWN },
        health = { immortal: false, curr: 100, max: 100, timeToLive: -1},
        // {sprite: Image(), }
        //         ctx.drawImage(
        //     sprite,       // immagine
        //     sx, sy, sw, sh,  // sorgente: x, y, width, height nella sprite sheet
        //     dx, dy, dw, dh   // destinazione: x, y, width, height sul canvas
        // );
        // se assets è null allora disegnamo un default
        assets = null
    ) {
        this.scene = scene
        // lo scope lo prendiamo dalla scena
        this.scope = scene.scope;
        this.position = position;
        this.dimensions = dimensions;
        this.movement = movement;
        this.health = health;
        this.assets = assets;
        this.infos = { createdAt: performance.now() }
    }

    render(color = '#ff44ff') {
        if (this.assets === null) {
            this.scope.context.fillStyle = color;
            this.scope.context.fillRect(
                this.position.x % this.scope.constants.width,
                this.position.y % this.scope.constants.height,
                this.dimensions.w,
                this.dimensions.h
            );
            return;
        }
    }

    update(tick) {
        // Metodo vuoto, da sovrascrivere nelle sottoclassi
    }

    checkCollision(nextX, nextY) {
        let collision = false;
        let isBorder = false;
        let isInvalicable = false;
        let entityCollided;

        if (this.isOutOfCameraBounds(nextX, nextY)) {
            collision = true;
            isBorder = true;
        }

        if (this.isOutOfBounds(nextX, nextY)) {
            collision = true;
            isBorder = true;
            isInvalicable = true;
        }

        entityCollided = this.checkEntityCollisions(nextX, nextY);
        if (entityCollided) {
            collision = true;
        }

        return { collision, isBorder, isInvalicable, entityCollided };
    }

    isOutOfCameraBounds(nextX, nextY) {
        return !this.scope.world.camera.isOnCamera(null, { x: nextX, y: nextY }).onCamera;
    }

    isOutOfBounds(nextX, nextY) {
        return nextX < 0 || nextY < 0;
    }

    checkEntityCollisions(nextX, nextY) {
        const entities = this.scope.world.scene.entities;
        for (const entity of entities.keys()) {
            if (
                this !== entity &&
                nextX < entity.position.x + entity.dimensions.w &&
                nextX + this.dimensions.w > entity.position.x &&
                nextY < entity.position.y + entity.dimensions.h &&
                nextY + this.dimensions.h > entity.position.y
            ) {
                console.log(nextX, nextY, 'Collision detected with entity');
                return entity;
            }
        }
        return null;
    }

    changePosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    invertDirection() {
        if (this.movement.dir === Directions.EAST) {
            this.movement.dir = Directions.WEST;
        } else if (this.movement.dir === Directions.WEST) {
            this.movement.dir = Directions.EAST;
        } else if (this.movement.dir === Directions.NORTH) {
            this.movement.dir = Directions.SOUTH;
        } else if (this.movement.dir === Directions.SOUTH) {
            this.movement.dir = Directions.NORTH;
        }
    }

    takeDamage(amount) {
        this.health.curr -= amount;
        if (this.health.curr <= 0) {
            this.die();
        }
    }


    die() {
        this.scene.removeEntity(this);
    }
}