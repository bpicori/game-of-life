// constants
const CELLS = 36;
const CELL_SIZE = 20;
const BLACK_COLOR = "rgba(0, 0, 0)";
const WHITE_COLOR = "rgba(255,255,255)";

let START = false;

let generation = emptyMatrix();

function emptyMatrix() {
  const matrix = [];
  for (let i = 0; i < CELLS; i++) {
    matrix[i] = [];
    for (let j = 0; j < CELLS; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
}

function getNeighbors(state, x, y) {
  // find the left
  const left = [x, y - 1];
  // find the right
  const right = [x, y + 1];
  // find the top
  const top = [x - 1, y];
  // find top-left
  const topLeft = [x - 1, y - 1];
  // find top-right
  const topRight = [x - 1, y + 1];

  // find the bottom
  const bottom = [x + 1, y];
  // find the bottom-left
  const bottomLeft = [x + 1, y - 1];
  // find the bottom-right
  const bottomRight = [x + 1, y + 1];

  return [left, right, top, topLeft, topRight, bottom, bottomLeft, bottomRight];
}

function calculateNextGeneration(previousGeneration) {
  const newGeneration = [];
  for (let i = 0; i < CELLS; i++) {
    newGeneration[i] = [];
    for (let j = 0; j < CELLS; j++) {
      const cell = previousGeneration[i][j];

      const neighbors = getNeighbors(previousGeneration, i, j);

      const alive = neighbors.reduce((acc, [x, y]) => {
        if (previousGeneration[x] && previousGeneration[x][y]) {
          acc += 1;
        }
        return acc;
      }, 0);

      let newState;
      // if cell is alive and has 2 or more neighbors alive then is survive
      if (cell === 1 && (alive === 2 || alive === 3)) {
        newState = 1;
        // if cell is dead and has 3 alive neighbors then reborn
      } else if (cell === 0 && alive === 3) {
        newState = 1;
      } else {
        newState = 0;
      }
      newGeneration[i][j] = newState;
    }
  }
  return newGeneration;
}

async function setup() {
  createCanvas(CELL_SIZE * CELLS, CELL_SIZE * CELLS);
  draw(generation);

  while (true) {
    if (START) {
      let nextGeneration = calculateNextGeneration(generation);
      generation = nextGeneration;
      draw(generation);
      await new Promise((resolve) => setTimeout(resolve, 200));
    } else {
      draw(generation);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
}

function draw(m) {
  const canvas = document.getElementById("canvas");
  background(0);
  for (let i = 0; i < CELLS; i++) {
    for (let j = 0; j < CELLS; j++) {
      const ctx = canvas.getContext("2d");
      if (m[i][j] === 1) {
        ctx.fillStyle = BLACK_COLOR;
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      } else {
        ctx.fillStyle = WHITE_COLOR;
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.fillStyle = BLACK_COLOR;
        ctx.strokeRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}
function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const cellX = Math.floor(y / CELL_SIZE);
  const cellY = Math.floor(x / CELL_SIZE);
  generation[cellX][cellY] = generation[cellX][cellY] ? 0 : 1;
  // console.log({ cellX, cellY });
}

function createCanvas(w, h) {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = w;
  canvas.height = h;
  canvas.style.position = "absolute";
  canvas.style.top = "50%";
  canvas.style.left = "50%";
  canvas.style.transform = "translate(-50%, -50%)";
  canvas.style.border = "1px solid black";

  document.body.appendChild(canvas);

  canvas.addEventListener("mousedown", function (e) {
    getCursorPosition(canvas, e);
  });
  return canvas;
}

function background(color) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.fillStyle = color;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

setup();

function startGame() {
  START = true;
}

function glider() {
  START = false;
  const matrix = [];
  for (let i = 0; i < CELLS; i++) {
    matrix[i] = [];
    for (let j = 0; j < CELLS; j++) {
      matrix[i][j] = 0;
    }
  }
  let center = Math.floor(CELLS / 2);
  matrix[center][center] = 1;
  matrix[center + 1][center + 1] = 1;
  matrix[center + 2][center + 1] = 1;
  matrix[center + 2][center] = 1;
  matrix[center + 2][center - 1] = 1;

  generation = matrix;
}
