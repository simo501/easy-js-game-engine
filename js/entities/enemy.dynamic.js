import { DynamicEntity } from "./dynamic.entity.js";
import { enemyUpdate } from "../utils/utils.pathfinding.js"; // Assicurati del percorso

export class Enemy extends DynamicEntity {
    constructor
        (
            scene,
            position = { x: 0, y: 0 },
            dimensions = { w: 23, h: 16 },
            movement = { speed: 0, dir: Directions.DOWN },
            // timetoLive è il tempo di vita dell'entità, -1 significa che non ha un tempo di vita
            health = { curr: 100, max: 100, immortal: false, timeToLive: -1 },
            assets = null,
            // proprietà aggiuntive per le entità dinamiche
            shootingProperties = {
                availableShoots: 0, // numero di proiettili disponibili
                maxShoots: 0, // numero massimo di proiettili che si possono avere
                defaultDamage: 5, // danno di default dei proiettili
                lastShootTime: 0,
                reloadTime: 500 // tempo di ricarica in millisecondi
            },
            player = null // il giocatore da seguire
        ) {
        super(scene, position, dimensions, movement, health, assets, shootingProperties);;
        this.player = player;
    }

    render() {
        super.render("#00FFCC"); // Colore azzurro per l'enemy
        this.scope.context.fillStyle = "#00FFCC";
        this.scope.context.fillText(`Zuccaccia health: ${this.health.curr}`, 10, 50);
    }

    update() {
        // Trova il giocatore tra le entità
        //...this.state.entities espande la Map in un array di coppie [entity, info]
        // const player = [...this.state.entities].find(([e, info]) => info.type === 'player')?.[0];
        // Se esiste il player e la griglia è disponibile, esegui il pathfinding
        if (this.player) {
            if (this.scope.grid) {
                enemyUpdate(this, this.player, this.scope.grid);
            }
        }
    }
}
