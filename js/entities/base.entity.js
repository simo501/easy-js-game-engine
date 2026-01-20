import { Directions } from "../utils/utils.directions.js";
import { basePath } from "../utils/utils.asset.js";

export class Entity {



    constructor(
        scene,
        position = {},
        dimensions = {},
        movement = {},
        health = {},
        // se assets è null allora disegnamo un default
        assets = null,
        identity = {}
    ) {

        const defaultPosition = { x: 0, y: 0 };
        const defaultDimensions = { w: 23, h: 16 };
        const defaultMovement = { speed: 0, dir: Directions.DOWN, moving: true, lastSpriteUpdateTick: 0, tickPerFrame: 300 };
        const defaultHealth = { immortal: false, curr: 100, max: 100, timeToLive: -1 };
        const defaultIdentity = { name: "Entity", color: "#AAFFAA" };


        this.scene = scene
        // lo scope lo prendiamo dalla scena
        this.scope = scene.scope;
        // la fusione { ...a, ...b }
        // Parte dall’oggetto a (default).
        // Poi aggiunge (o sovrascrive) i campi di b 
        this.position = { ...defaultPosition, ...position };
        this.dimensions = { ...defaultDimensions, ...dimensions };
        this.movement = { ...defaultMovement, ...movement };
        this.health = { ...defaultHealth, ...health };
        this.assets = assets;
        this.identity = { ...defaultIdentity, ...identity };
        this.infos = { createdAt: performance.now() };


        if (this.assets) {
            this.img = new Image();
            this.img.src = basePath + this.assets.basicSrc; // Imposta il percorso dell'immagine se assets è fornito
        }
    }

    render(color = '#ff44ff') {
        // Se non abbiamo assets, disegniamo un rettangolo colorato
        if (this.assets === null) {
            this.scope.context.fillStyle = color;
            this.scope.context.fillRect(
                this.position.x % this.scope.constants.width,
                this.position.y % this.scope.constants.height,
                this.dimensions.w,
                this.dimensions.h
            );
            return;
        } else {
            const sourceX = 0;
            // frame attuale quindi magari 0, 1, 2, 3, ...
            // sourceY è l'altezza del frame corrente moltiplicata per il numero del frame corrente
            const sourceY = this.assets.currentFrame * this.assets.h;

            const img = new Image();
            img.src = this.assets.basicSrc

            this.scope.context.drawImage(
                img,
                sourceX,
                sourceY,
                this.assets.w,
                this.assets.h,
                this.position.x % this.scope.constants.width,
                this.position.y % this.scope.constants.height,
                this.dimensions.w,
                this.dimensions.h
            );

        }

        if (this.movement.moving && (this.scope.tick - this.movement.lastSpriteUpdateTick > this.movement.tickPerFrame)) {
            this.movement.lastSpriteUpdateTick = this.scope.tick;
            // Cicla tra i frame della sprite
            this.assets.currentFrame = (this.assets.currentFrame + 1) % this.assets.totalFrames;
        }
    }

    drawHealthBars(data = { name: "entity", nameColor: "#FFFFFF" }, position = { x: 10, y: 50 }) {
        const ctx = this.scope.context;

        let startX = position.x;
        let startY = position.y;

        const loadingBarWidth = this.health.max;
        const loadingBarHeight = 5;

        ctx.font = '12px Arial';
        ctx.fillStyle = data.nameColor;
        ctx.fillText(data.name, startX, startY);
        ctx.fillStyle = "red";
        startY += 10; // Sposta l'inizio del rettangolo per la salute
        ctx.fillRect(startX, startY, loadingBarWidth, loadingBarHeight);
        ctx.fillStyle = "lime";
        ctx.fillRect(startX, startY, this.health.curr, loadingBarHeight);
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
            isInvalicable = true;
        }
        if(this.getName() === "Nemico Gameboy") {
            console.log('Collsion check result: ', { collision, isBorder, isInvalicable});
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
        const entities = this.scene.entities;
        for (const entity of entities.keys()) {
            if (
                this !== entity &&
                nextX < entity.position.x + entity.dimensions.w &&
                nextX + this.dimensions.w > entity.position.x &&
                nextY < entity.position.y + entity.dimensions.h &&
                nextY + this.dimensions.h > entity.position.y
            ) {
                // console.log(nextX, nextY, 'Collision detected with entity');
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
        if (this.health.immortal) return;

        this.health.curr -= amount;
        if (this.health.curr <= 0) {
            this.die();
        }
    }


    die() {
        this.scene.removeEntity(this);
    }

    getName() {
        return this.identity.name
    }
}