import { Directions } from "../utils/utils.directions.js";
import { keysDown } from "../utils/utils.keysDown.js";
import { DynamicEntity } from "./dynamic.entity.js";

export class Player extends DynamicEntity {
    constructor(
        scene,
        position = {},
        dimensions = {},
        movement = {},
        // timetoLive è il tempo di vita dell'entità, -1 significa che non ha un tempo di vita
        health = {},
        assets = null,
        // proprietà aggiuntive per le entità dinamiche
        shootingProperties = {},
        identity = { name: "Giocatore", color: "#FFd870" }
    ) {
        const defaultIdentity = { name: "Giocatore", color: "#FFd870" };
        const defaultHealth = { curr: 100, max: 100, immortal: false, timeToLive: -1 };
        const defaultMovement = { speed: 5, dir: Directions.DOWN, moving: false };

        const mergedMovement = { ...defaultMovement, ...movement };
        const mergedHealth = { ...defaultHealth, ...health };
        const mergedIdentity = { ...defaultIdentity, ...identity };

        super(scene, position, dimensions, mergedMovement, mergedHealth, assets, shootingProperties, mergedIdentity);
    }

    render() {
        super.render(this.identity.color); // Colore giallo per il giocatore

        // Mostra la salute del giocatore
        this.drawHealthBars({ name: this.identity.name, nameColor: this.identity.color }, { x: 10, y: 30 });
    }



    update(tick) {
        // console.log(`Player position: x=${this.position.x}, y=${this.position.y}`);
        // Se non viene premuto nessun tasto, non facciamo nulla
        // console.log(`Player update at tick: ${this.position.x}, y=${this.position.y}`);
        if (!keysDown.isPressed.isAny) {
            this.movement.moving = false;
        }

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
                this.move(x, y)
            } else if (!collisionRes.collision) {
                this.move(x, y)
            }
        }
    }

    move(x, y) {
        this.changePosition(x, y);
        this.movement.moving = true;
    }

    checkCollision(nextX, nextY) {
        // Verifica collisioni tramite il metodo della classe base
        return super.checkCollision(nextX, nextY)
    }
}