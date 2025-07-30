export class Scene {
    constructor(scope) {
        this.scope = scope;
        this.entities = new Map(); // Mappa per le entità della scena
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        this.entities.delete(entity);
    }

    update() {
        for (const entity of this.entities) {
            entity.update(this.scope.tick);
        }
    }

    render() {
        const ctx = this.scope.context;
        ctx.clearRect(0, 0, this.world.width, this.world.height);
        
        for (const entity of this.entities) {
            entity.render();
        }
    }
}