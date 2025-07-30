import { Entity } from "./entity.js";

export class Block extends Entity {
    constructor(scope, position = { x: 0, y: 0 }, width = 50, height = 50) {
        super(scope, position, 0, width, height);
    }

    render() {
        super.render("#ff0000");
    }

    update() {
        // i blocchi non si muovono, ma potrebbero avere logiche relative alla vita
        // intesa come resistenza a colpi o altro
    }
}