// utils.grid.js
import { Camera } from '../core/game.camera.js';

// === CONFIG ===
const tileSize = 20;

// Marca su grid tutte le celle toccate da un AABB in coordinate *mondo*
function markRectOnGrid(grid, { originCol, originRow, rows, cols, tileSize }, x, y, w, h, value = 1) {
  const scWorld = Math.floor( x           / tileSize);
  const ecWorld = Math.floor((x + w - 1)  / tileSize); // off-by-one fix
  const srWorld = Math.floor( y           / tileSize);
  const erWorld = Math.floor((y + h - 1)  / tileSize);

  for (let rWorld = srWorld; rWorld <= erWorld; rWorld++) {
    const r = rWorld - originRow;
    if (r < 0 || r >= rows) continue;

    for (let cWorld = scWorld; cWorld <= ecWorld; cWorld++) {
      const c = cWorld - originCol;
      if (c < 0 || c >= cols) continue;

      grid[r][c] = value;
    }
  }
}

// Crea una griglia 0/1 allineata alla camera.
// Ritorna anche info utili: originCol/Row (offset mondo→griglia) e tileSize.
export function generateGrid(game, isSolid = defaultIsSolid) {
  const world = game.world;
  const cam = world.camera;

  // 1) dimensioni griglia = viewport / tile (arrotondate in alto)
  const cols = Math.ceil(cam.width  / tileSize);
  const rows = Math.ceil(cam.height / tileSize);

  // 2) matrice 0/1
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  // 3) top-left della camera in coordinate MONDO
  const left = cam.centerPos.x - cam.width  / 2;
  const top  = cam.centerPos.y - cam.height / 2;

  // 4) col/row d’origine (mondo → griglia)
  const originCol = Math.floor(left / tileSize);
  const originRow = Math.floor(top  / tileSize);

  const metaGrid = { grid, cols, rows, originCol, originRow, tileSize };

  // 5) Marca i blocchi solidi
  for (const [entity, meta] of world.scene.entities) {
    if (!isSolid(entity, meta)) continue;

    const x = entity.position.x;
    const y = entity.position.y;
    const w = entity.dimensions?.w ?? entity.width  ?? 0;
    const h = entity.dimensions?.h ?? entity.height ?? 0;

    markRectOnGrid(grid, metaGrid, x, y, w, h, 1);
  }

  // 6) Marca anche il PLAYER come 1 (occupato) per evitare che i nemici ci finiscano sopra
  const p = world.scene.player;
  if (p) {
    const px = p.position.x;
    const py = p.position.y;
    const pw = p.dimensions?.w ?? p.width  ?? 0;
    const ph = p.dimensions?.h ?? p.height ?? 0;

    markRectOnGrid(grid, metaGrid, px, py, pw, ph, 1);
  }

  return metaGrid;
}

// Criterio di "solidità": personalizzabile.
// Supporta 3 varianti: meta.type === "block", flag entity.solid === true,
// o riconoscimento per nome classe "Block".
function defaultIsSolid(entity, meta) {
  return meta?.type === 'block' ||
         entity.solid === true ||
         entity?.constructor?.name === 'Block';
}

// === DISEGNO DELLA GRIGLIA PER DEBUG ===
export function drawGrid(context, gridData) {
  const { cols, rows } = gridData;

  context.save();
  context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  context.lineWidth = 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      // bordo della cella
      context.strokeRect(x, y, tileSize, tileSize);

      // (opzionale) riempi in trasparenza le celle occupate
      // così vedi a occhio blocchi+player
      // if (gridData.grid[row][col] === 1) {
      //   context.fillStyle = 'rgba(255, 0, 0, 0.15)';
      //   context.fillRect(x, y, tileSize, tileSize);
      // }
    }
  }

  context.restore();
}
