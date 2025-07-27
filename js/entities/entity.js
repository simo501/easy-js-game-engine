export class Entity {
    constructor(scope, position = {x:0, y:0}, moveSpeed=3, width=23, height=16) {
        this.scope = scope;
        this.position = position;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
    }

    render(color = '#ff44ff') {
        this.scope.context.fillStyle = color;
        this.scope.context.fillRect(
            this.position.x,
            this.position.y,
            this.width, 
            this.height
        );
    };

    update() {}

    checkCollision() {
        // qui dovremmo implementare la logica per controllare le collisioni
        // con altri oggetti o entità nel gioco
        // ad esempio, se il giocatore tocca un muro o un altro oggetto
        // possiamo usare le coordinate di this.position e le dimensioni
        // this.width e this.height per verificare le collisioni
        // con altri oggetti nel gioco
    }

    getEntity() {
        return this;
    }
}