import { DynamicEntity } from "./dynamic.entity.js";

export class Entity {
    constructor(
        scope,
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
    }

    render(color = '#ff44ff') {
        this.scope.context.fillStyle = color;
        this.scope.context.fillRect(
            this.position.x,
            this.position.y,
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
        let entityCollided;

        // console.log(nextX, nextY, 'new x and y position');

        // Controllo dei limiti del canvas
        if (nextX < 0 || nextX + this.width > this.scope.constants.width ||
            nextY < 0 || nextY + this.height > this.scope.constants.height) {
            collision = true;
            isBorder = true;
        }

        // Controllo delle collisioni con altre entità
        const entities = this.state.entities;
        for (const entity of entities.keys()) {
            if (this !== entity &&
                nextX < entity.position.x + entity.width &&
                nextX + this.width > entity.position.x &&
                nextY < entity.position.y + entity.height &&
                nextY + this.height > entity.position.y) {

                collision = true;
                entityCollided = entity;
                // console.log(nextX, nextY, this, 'has detected a collision detected with');
            }
        }

        if (!collision) this.changePosition(nextX, nextY);

        return { collision, isBorder, entityCollided };
    }

    changePosition(nextX, nextY) {
        this.position.x = nextX;
        this.position.y = nextY;
    }

    die() {
        this.state.entities.delete(this);
    }
}