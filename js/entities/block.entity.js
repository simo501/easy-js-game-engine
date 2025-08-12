import { Entity } from "./base.entity.js";
import { Directions } from "../utils/utils.directions.js";

export class Block extends Entity {
    constructor(
        scope,
        scene,
        position = { x: 0, y: 0 },
        dimensions = { w: 50, h: 50 },
        movement = { speed: 0, dir: Directions.DOWN },
        health = { curr: 100, max: 100, immortal: false, timeToLive: -1 },
        assets = null
    ) {
        super(scope, scene, position, dimensions, movement, health, assets);
    }

    render() {
        super.render("#990000"); // Brown color for the block
    }
}