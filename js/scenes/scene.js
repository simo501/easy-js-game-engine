export class Scene {
    constructor(scope, player, endless = false) {
        this.scope = scope;
        this.entities = new Map(); // Mappa per le entità della scena
        this.player = player; // Il giocatore della scena
        this.endless = endless; // Indica se la scena è infinita o meno
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
    }
}