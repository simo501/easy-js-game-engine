// === CONFIG ===
const tileSize = 20;

// === GRIGLIA ===
export function generateGrid(game) {
  const cols = Math.floor(game.constants.width / tileSize);
  const rows = Math.floor(game.constants.height / tileSize);
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (const [entity, info] of game.state.entities) {
    if (info.type === "block") {
      const startCol = Math.floor(entity.position.x / tileSize);
      const startRow = Math.floor(entity.position.y / tileSize);
      const endCol = Math.floor((entity.position.x + entity.width) / tileSize);
      const endRow = Math.floor((entity.position.y + entity.height) / tileSize);

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          if (row >= 0 && row < rows && col >= 0 && col < cols) {
            grid[row][col] = 1;
          }
        }
      }
    }
  }

  return { grid, cols, rows };
}

// === DISEGNO DELLA GRIGLIA PER DEBUG ===
export function drawGrid(context, gridData) {
  context.save();
  context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  context.lineWidth = 1;

  for (let row = 0; row < gridData.rows; row++) {
    for (let col = 0; col < gridData.cols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      context.strokeRect(x, y, tileSize, tileSize);
    }
  }

  context.restore();
}
