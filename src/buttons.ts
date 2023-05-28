import { clearCanvas, setupCanvas } from "./canvas";
import { setFPS } from "./main";
import {
  emptyGeneration,
  getGeneration,
  initializeGeneration,
  setGeneration,
  startGame,
  stopGame,
} from "./state";

function gospel() {
  stopGame();
  const gosperGliderGunPattern = [
    [1, 5],
    [2, 5],
    [1, 6],
    [2, 6], // First Block
    [11, 5],
    [11, 6],
    [11, 7],
    [12, 4],
    [12, 8],
    [13, 3], // Second Block
    [13, 9],
    [14, 3],
    [14, 9],
    [15, 6],
    [16, 4],
    [16, 8], // Third Block
    [17, 5],
    [17, 6],
    [17, 7],
    [18, 6], // Fourth Block
    [21, 3],
    [21, 4],
    [21, 5],
    [22, 3],
    [22, 4],
    [22, 5], // Fifth Block
    [23, 2],
    [23, 6],
    [25, 1],
    [25, 2],
    [25, 6],
    [25, 7], // Sixth Block
    [35, 3],
    [35, 4],
    [36, 3],
    [36, 4], // Seventh Block
  ];

  const len = 50;
  const generation = emptyGeneration(50);
  for (let i = 0; i < len; i++) {
    generation[i] = [];
    for (let j = 0; j < len; j++) {
      generation[i][j] = 0;
    }
  }
  for (let i = 0; i < gosperGliderGunPattern.length; i++) {
    const [x, y] = gosperGliderGunPattern[i];
    generation[x][y] = 1;
  }
  setGeneration(generation);
}

function glider() {
  stopGame();
  const len = getGeneration().length;
  const generation = emptyGeneration(len);
  for (let i = 0; i < len; i++) {
    generation[i] = [];
    for (let j = 0; j < len; j++) {
      generation[i][j] = 0;
    }
  }
  let center = Math.floor(len / 2);
  generation[center][center] = 1;
  generation[center + 1][center + 1] = 1;
  generation[center + 2][center + 1] = 1;
  generation[center + 2][center] = 1;
  generation[center + 2][center - 1] = 1;
  setGeneration(generation);
}

function acorn() {
  stopGame();
  const len = getGeneration().length;
  const generation = emptyGeneration(len);
  for (let i = 0; i < len; i++) {
    generation[i] = [];
    for (let j = 0; j < len; j++) {
      generation[i][j] = 0;
    }
  }
  // acorn top
  let top = Math.floor(len / 4);
  generation[top][top] = 1;
  generation[top + 1][top + 2] = 1;
  generation[top + 2][top - 1] = 1;
  generation[top + 2][top] = 1;
  generation[top + 2][top + 3] = 1;
  generation[top + 2][top + 4] = 1;
  generation[top + 2][top + 5] = 1;

  // acorn bottom
  let center = Math.floor(len / 2);
  generation[center][center] = 1;
  generation[center + 1][center + 2] = 1;
  generation[center + 2][center - 1] = 1;
  generation[center + 2][center] = 1;
  generation[center + 2][center + 3] = 1;
  generation[center + 2][center + 4] = 1;
  generation[center + 2][center + 5] = 1;
  setGeneration(generation);
}

function setCellNr(canvasSize: number) {
  const cellNrLabel = document.getElementById("cellNr") as HTMLLabelElement;
  const cellRange = document.getElementById("cellRange") as HTMLInputElement;
  const nrOfCells = parseInt(cellRange.value);
  cellNrLabel.innerHTML = `Cell Size: ${nrOfCells}`;
  stopGame();
  clearCanvas();
  initializeGeneration(nrOfCells);
  setupCanvas(canvasSize);
}

export function setupButtons(canvasSize: number) {
  const startButton = document.getElementById("startButton");
  startButton?.addEventListener("click", startGame);

  const stopButton = document.getElementById("stopButton");
  stopButton?.addEventListener("click", stopGame);

  const gliderButton = document.getElementById("glider");
  gliderButton?.addEventListener("click", glider);

  const acornButton = document.getElementById("acorn");
  acornButton?.addEventListener("click", acorn);

  const gospelButton = document.getElementById("gospel");
  gospelButton?.addEventListener("click", gospel);

  const cellRange = document.getElementById("cellRange") as HTMLInputElement;
  cellRange.addEventListener("input", () => setCellNr(canvasSize));

  const fpsRange = document.getElementById("fpsRange") as HTMLInputElement;
  fpsRange.addEventListener("input", () => {
    const fps = parseInt(fpsRange.value);
    const fpsLabel = document.getElementById("fpsLabel") as HTMLLabelElement;
    fpsLabel.innerHTML = `FPS: ${fps}`;
    setFPS(fps);
  });
}
