import { DynamicEntity } from "./dynamic.entity.js";

export class Enemy extends DynamicEntity {
    constructor(scope, position = {x:100, y:30}, moveSpeed=1, width=48, height=24) {
        super(scope, position, moveSpeed, width, height);
    }

    update(tick) {}



}