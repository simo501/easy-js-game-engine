export class Camera {

    constructor(scope, width, height, world, centerPos = { x: width / 2, y: height / 2 }, zoom = 1) {
        this.scope = scope;
        this.width = width;
        this.height = height;
        this.world = world; // Reference to the world this camera is observing 
        this.centerPos = centerPos; // { x: ..., y: ... }
        this.zoom = zoom; // Zoom level
    }

    update(player) {
        if (!!this.isOnCamera(player)) {
            // Update camera position to follow the player
            this.centerPos.x = player.position.x;
            this.centerPos.y = player.position.y;
        }

    }

    isOnCamera(entity) {
        if (entity.position.x < this.centerPos.x - this.width / 2 ||
            entity.position.x > this.centerPos.x + this.width / 2 ||
            entity.position.y < this.centerPos.y - this.height / 2 ||
            entity.position.y > this.centerPos.y + this.height / 2) {
            return false; // Entity is outside the camera view
        }
        return true; // Entity is within the camera view
    }

}