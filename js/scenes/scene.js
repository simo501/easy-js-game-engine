export class Scene {
    constructor(scope, endless = false) {
        this.scope = scope;
        this.entities = new Map(); // Mappa per le entità della scena
        this.endless = endless; // Indica se la scena è infinita o meno
        this.player = null
    }

    addPlayer(player) {
        this.player = player;
        this.addEntity(player);
    }

    addEntity(entity) {
        console.log(`Adding entity: ${entity.constructor.name} at position x=${entity.position.x}, y=${entity.position.y}`);
        // this.entities.set(entity, { type: entity.constructor.name.toLowerCase() });
        this.entities.set(entity, { type: "test" });
    }

    removeEntity(entity) {
        this.entities.delete(entity);
    }

    update() {
        for (const entity of this.entities.keys()) {
            entity.update(this.scope.tick);
        }
    }

}