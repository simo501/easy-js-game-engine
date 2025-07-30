import { Entity } from "./entity.js";

export class Particle extends Entity {
    constructor(scope, scene, position, velocity, life = 100) {
        super(scope, scene, position, 0, 2, 2); // width/height 2px, no movement speed

        this.velocity = velocity; // { x: ..., y: ... }
        this.life = life;
    }

    update(tick) {
        if (tick - this.createdAt > this.life) {
            this.die();
            return;
        }

        let nextX = this.position.x + this.velocity.x;
        let nextY = this.position.y + this.velocity.y;
        this.changePosition(nextX, nextY);
    }

    render() {
        const tick = this.tick;
        const timeRatio = 1 - ((tick - this.createdAt) / this.life);
        const ctx = this.scope.context;

        ctx.fillStyle = `rgba(255,255,0,${timeRatio})`;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
