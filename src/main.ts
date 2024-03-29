import { draw, setupCanvas } from "./canvas";
import "./style.css";
import {
  calculateNextGeneration,
  getGeneration,
  initializeGeneration,
  isGameStarted,
  setGeneration,
} from "./state";
import { setupButtons } from "./buttons";

const CELLS = 30;
const CANVAS_SIZE = 600;

let FPS = 100;

function getFPS(): number {
  return FPS;
}

export function setFPS(newFPS: number): void {
  FPS = newFPS;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Conway Game of Life</h1>
  <h3>Rules:</h3>
  <ul>
    <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
    <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
    <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
    <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
  </ul>
  <br>
  <div>
    <button id="startButton">Start</button>
    <button id="stopButton">Stop</button>
    <button id="glider">Glider</button>
    <button id="acorn">Acorn</button>
    <button id="gospel">Gospel</button>
  </div>
  <div>
    <label id="cellNr">Cell Size: ${CELLS}</label>
    <input type="range" id="cellRange" min="0" max="100" value="${CELLS}" step="1">
  </div>
  <div>
    <label id="fpsLabel">FPS: ${FPS}</label>
    <input type="range" id="fpsRange" min="100" max="2000" value="${FPS}" step="100">
  </div>
`;

async function main() {
  initializeGeneration(CELLS);
  setupButtons(CANVAS_SIZE);
  setupCanvas(CANVAS_SIZE);
  draw(getGeneration(), CANVAS_SIZE);

  while (true) {
    if (isGameStarted()) {
      let nextGeneration = calculateNextGeneration();
      setGeneration(nextGeneration);
      draw(nextGeneration, CANVAS_SIZE);
      await new Promise((resolve) => setTimeout(resolve, getFPS()));
    } else {
      draw(getGeneration(), CANVAS_SIZE);
      await new Promise((resolve) => setTimeout(resolve, getFPS()));
    }
  }
}

main();
