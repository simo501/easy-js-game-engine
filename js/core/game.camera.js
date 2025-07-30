import { Directions } from '../utils/utils.directions.js';

export class Camera {

    constructor(scope, width, height, centerPos = { x: width / 2, y: height / 2 }, zoom = 1) {
        this.scope = scope;
        this.width = width;
        this.height = height;
        this.centerPos = centerPos; // { x: ..., y: ... }
        this.zoom = zoom; // Zoom level
    }

    update(player) {
        // il player va seguito secondo dei chunk della dimensione della telecamera
        // se il player è fuori dalla telecamera, la telecamera si sposta per centrarlo
        // questo permette di avere una telecamera che segue il player senza doverlo
        // calcolare ogni volta la posizione della telecamera in base alla posizione del player
        if (player) {
            let { onCamera, direction } = this.isOnCamera(player);
            // console.log(`Camera is on player: ${onCamera}, direction: ${direction}`);
            if (!onCamera) {
                if (direction === Directions.LEFT) {
                    this.centerPos.x = this.centerPos.x - this.width;
                } else if (direction === Directions.RIGHT) {
                    this.centerPos.x = this.centerPos.x + this.width;
                } else if (direction === Directions.UP) {
                    this.centerPos.y = this.centerPos.y - this.height;
                } else if (direction === Directions.DOWN) {
                    this.centerPos.y = this.centerPos.y + this.height;
                }
            }
            // console.log(`Camera center position: x=${this.centerPos.x}, y=${this.centerPos.y}`);
        }
    }

    // se l'entità è nulla allora cerca se sono state passate delle coordinate
    isOnCamera(entity, position = null) {
        let onCamera = true;
        let direction = null;
        let x, y;

        if (entity === undefined || entity === null) {
            if (position === null) {
                return { onCamera: false, direction: null };
            } else {
                x = position.x;
                y = position.y;
            }
        } else {
            x = entity.position.x;
            y = entity.position.y;
        }

        if (x < this.centerPos.x - this.width / 2) {
            onCamera = false;
            direction = Directions.LEFT; // Entity is to the left of the camera
        } else if (x > this.centerPos.x + this.width / 2) {
            onCamera = false;
            direction = Directions.RIGHT; // Entity is to the right of the camera
        }
        else if (y < this.centerPos.y - this.height / 2) {
            onCamera = false;
            direction = Directions.UP; // Entity is above the camera
        } else if (y > this.centerPos.y + this.height / 2) {
            onCamera = false;
            direction = Directions.DOWN; // Entity is below the camera
        }


        return { onCamera, direction }; // Return both onCamera status and direction
    }

}