import { Entity } from "./base.entity.js";
import { Directions } from "../utils/utils.directions.js";
import * as colors from "../utils/utils.colors.js";

export class Block extends Entity {
    constructor(
        scene,
        position = {},
        dimensions = {},
        movement = {},
        health = {},
        assets = null,
        identity = {}
    ) {
        const defaultIdentity = { name: "Block", color: colors.gameboyBlock };
        const defaultHealth = { immortal: true, curr: 100, max: 100, timeToLive: -1 };

        const mergedHealth = { ...defaultHealth, ...health };
        const mergedIdentity = { ...defaultIdentity, ...identity };

        super(scene, position, dimensions, movement, mergedHealth, assets, mergedIdentity);
    }

    render() {
        super.render(this.identity.color); // Brown color for the block
    }
}