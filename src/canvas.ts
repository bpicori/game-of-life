import { GenerationType, getGeneration, setCellValue } from "./state";

const BLACK_COLOR = "rgba(0, 0, 0)";
const WHITE_COLOR = "rgba(255,255,255)";

function getCanvas(): HTMLCanvasElement {
  const canvas = document.getElementById("canvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }
  return canvas as HTMLCanvasElement;
}

function getCanvasContext(): CanvasRenderingContext2D {
  const canvas = getCanvas();
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Context not found");
  }
  return ctx;
}

export function setupCanvas(canvasSize: number): void {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  canvas.className = "grid";

  document.body.appendChild(canvas);
  canvas.addEventListener("mousedown", (e) => {
    const len = getGeneration().length;
    const cellSize = canvasSize / len;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellX = Math.floor(y / cellSize);
    const cellY = Math.floor(x / cellSize);
    setCellValue([cellX, cellY]);
  });
}

export function clearCanvas(): void {
  const canvas = getCanvas();
  canvas.removeEventListener("mousedown", () => {});
  canvas.remove();
}

export function draw(generation: GenerationType, canvasSize: number) {
  const canvas = getCanvas();
  const ctx = getCanvasContext();
  ctx.fillStyle = "0";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  const len = generation.length;
  const cellSize = canvasSize / len;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (generation[i][j] === 1) {
        ctx.fillStyle = BLACK_COLOR;
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      } else {
        ctx.fillStyle = WHITE_COLOR;
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.fillStyle = BLACK_COLOR;
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
}
