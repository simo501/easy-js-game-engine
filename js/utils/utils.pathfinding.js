import { generateGrid, drawGrid } from "./utils.grid.js";
import { Directions } from "./utils.directions.js";

// === MOVIMENTO ENEMY DIRETTO CON COLLISIONE ===
export function enemyUpdate(enemy, player, tick, gridData) {
  const dx = player.position.x - enemy.position.x;
  const dy = player.position.y - enemy.position.y;
  const dist = Math.hypot(dx, dy);
  enemy.movement.moving = false;;
  console.log(dist);
  if (dist > 1 && dist < 400) {
    const moveX = (dx / dist) * enemy.movement.speed;
    const moveY = (dy / dist) * enemy.movement.speed;

    const direction = Math.abs(moveX) > Math.abs(moveY) ? (moveX > 0 ? Directions.RIGHT : Directions.LEFT) : (moveY > 0 ? Directions.DOWN : Directions.UP);
    const nextX = enemy.position.x + moveX;
    const nextY = enemy.position.y + moveY;
    const { isInvalicable } = enemy.checkCollision(nextX, nextY);
    if (!isInvalicable) {
      enemy.movement.moving = true;
      enemy.movement.dir = direction;
      enemy.changePosition(nextX, nextY);
      enemy.shoot(5, 10, 10, 10, tick);
    } else {
      // tenta movimenti singoli asse X o Y
      const testX = enemy.checkCollision(nextX, enemy.position.y);
      if (!testX.collision || testX.isBorder && !testX.isInvalicable) {
        enemy.changePosition(nextX, enemy.position.y);
      } else {
        const testY = enemy.checkCollision(enemy.position.x, nextY);
        if (!testY.collision || testX.isBorder && testX.isInvalicable) {
          enemy.changePosition(enemy.position.x, nextY);
        }
      }
    }
  }
}

