import { Directions } from "../utils/utils.directions.js";
import { keysDown } from "../utils/utils.keysDown.js";
import { DynamicEntity } from "./dynamic.entity.js";

export class Player extends DynamicEntity {
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
        super(scene, position, dimensions, movement, health, assets, shootingProperties);
    }

    render() {
        super.render("#FFd870");

        // Mostra la salute del giocatore
        this.scope.context.fillStyle = "#FFFFFF";
        this.scope.context.fillText(`Salute tua: ${this.health.curr}`, 10, 30);
    }

    update(tick) {
        // console.log(`Player position: x=${this.position.x}, y=${this.position.y}`);
        // Se non viene premuto nessun tasto, non facciamo nulla
        // console.log(`Player update at tick: ${this.position.x}, y=${this.position.y}`);
        if (!keysDown.isPressed.isAny) return;

        const { nextX, nextY, addX, addY } = this.calculateNextPosition();

        this.handleMovement(nextX, nextY, addX, addY);

        // Gestione dello sparo
        if (keysDown.isPressed.space) {
            this.shoot(5, 10, 10, 10, tick);
        }
    }

    calculateNextPosition() {
        let nextX = this.position.x;
        let nextY = this.position.y;
        let addX = 0, addY = 0;

        // Gestione del movimento
        if (keysDown.isPressed.left) {
            this.movement.dir = Directions.LEFT;
            nextX -= this.movement.speed;
            addX -= 1;
        }

        if (keysDown.isPressed.right) {
            this.movement.dir = Directions.RIGHT;
            nextX += this.movement.speed;
            addX += 1;
        }

        if (keysDown.isPressed.up) {
            this.movement.dir = Directions.UP;
            nextY -= this.movement.speed;
            addY -= 1;
        }

        if (keysDown.isPressed.down) {
            this.movement.dir = Directions.DOWN;
            nextY += this.movement.speed;
            addY += 1;
        }

        return { nextX, nextY, addX, addY };
    }

    handleMovement(nextX, nextY, addX, addY) {
        let x = this.position.x;
        let y = this.position.y;

        // Movimento incrementale con controllo collisioni
        while (x !== nextX || y !== nextY) {
            if (x !== nextX) x += addX;
            if (y !== nextY) y += addY;

            const collisionRes = this.checkCollision(x, y);

            if (collisionRes.collision && collisionRes.isBorder && !collisionRes.isInvalicable) {
                this.changePosition(x, y);
            } else if (!collisionRes.collision) {
                this.changePosition(x, y);
            }
        }
    }

    checkCollision(nextX, nextY) {
        // Verifica collisioni tramite il metodo della classe base
        return super.checkCollision(nextX, nextY)
    }
}