import { DynamicEntity } from "./dynamic.entity.js";
import { enemyUpdate } from "../utils/utils.pathfinding.js"; // Assicurati del percorso

export class Enemy extends DynamicEntity {
    constructor(scope, position = { x: 100, y: 30 }, moveSpeed = 1, width = 40, height = 20) {
        super(scope, position, moveSpeed, width, height);
    }

    render() {
        super.render("#00FFCC"); // Colore azzurro per l'enemy
    }

    update(tick) {
        // Trova il giocatore tra le entità
        //...this.state.entities espande la Map in un array di coppie [entity, info]
        const player = [...this.state.entities].find(([e, info]) => info.type === 'player')?.[0];
        // Se esiste il player e la griglia è disponibile, esegui il pathfinding
        if (player) {
            console.log(`Player position: x=${player.position.x}, y=${player.position.y}`);
        
            if (this.scope.grid) {
                enemyUpdate(this, player, this.scope.grid);
            }
        }
    }
}
