import { DynamicEntity } from "./dynamic.entity.js";
import { enemyUpdate } from "../utils/utils.pathfinding.js"; // Assicurati del percorso

export class Enemy extends DynamicEntity {
    constructor
        (
            scene,
            position = {},
            dimensions = {},
            movement = {},
            // timetoLive è il tempo di vita dell'entità, -1 significa che non ha un tempo di vita
            health = {},
            assets = null,
            // proprietà aggiuntive per le entità dinamiche
            shootingProperties = {},
            player = null, // il giocatore da seguire
            identity = {}
        ) {

        const defaultIdentity = { name: "Enemy", color: "#00FFCC" };
        const defaultHealth = { curr: 100, max: 100, immortal: false, timeToLive: -1 };

        const mergedHealth = { ...defaultHealth, ...health };
        const mergedIdentity = { ...defaultIdentity, ...identity };

        super(scene, position, dimensions, movement, mergedHealth, assets, shootingProperties, mergedIdentity);
        this.player = player;
    }

    render() {
        super.render(this.identity.color); // Colore azzurro per l'enemy
        this.drawHealthBars({ name: this.identity.name, nameColor: this.identity.color }, { x: 10, y: 70 });
    }

    update(tick) {
        // Trova il giocatore tra le entità
        //...this.state.entities espande la Map in un array di coppie [entity, info]
        // const player = [...this.state.entities].find(([e, info]) => info.type === 'player')?.[0];
        // Se esiste il player e la griglia è disponibile, esegui il pathfinding
        if (this.player) {
            if (this.scope.grid) {
                enemyUpdate(this, this.player, tick, this.scope.grid);
            }
        }
    }
}
