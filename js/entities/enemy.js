import { DynamicEntity } from "./dynamic.entity.js";
import { enemyUpdate } from "../utils/utils.pathfinding.js"; // Assicurati del percorso

export class Enemy extends DynamicEntity {
    constructor(scope, scene, position = { x: 100, y: 30 }, moveSpeed = 5, width = 40, height = 20, player) {
        super(scope, scene, position, moveSpeed, width, height);
        this.player = player;
    }

    render() {
        super.render("#00FFCC"); // Colore azzurro per l'enemy
        this.scope.context.fillStyle = "#00FFCC";
        this.scope.context.fillText(`Enemy health: ${this.health.currentHealth}`, 10, 50);
    }

    update() {
        // Trova il giocatore tra le entità
        //...this.state.entities espande la Map in un array di coppie [entity, info]
        // const player = [...this.state.entities].find(([e, info]) => info.type === 'player')?.[0];
        // Se esiste il player e la griglia è disponibile, esegui il pathfinding
        if (this.player) {
            // console.log(`Player position: x=${this.player.position.x}, y=${this.player.position.y}`);
        
            if (this.scope.grid) {
                enemyUpdate(this, this.player, this.scope.grid);
            }
        }
    }
}
