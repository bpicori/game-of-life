type CellValue = 0 | 1;
type Position = [number, number];
export type GenerationType = CellValue[][];

let Generation: GenerationType;
let START = false;

export function startGame(): void {
  START = true;
}

export function stopGame(): void {
  START = false;
}

export function isGameStarted(): boolean {
  return START;
}

export function getGeneration(): CellValue[][] {
  return [...Generation];
}

export function setGeneration(newGeneration: CellValue[][]): void {
  Generation = newGeneration;
}

export function initializeGeneration(len: number): void {
  const generation = emptyGeneration(len);
  setGeneration(generation);
}

export function setCellValue(position: Position): void {
  const [x, y] = position;
  const generation = getGeneration();
  const value = generation[x][y] === 1 ? 0 : 1;
  generation[x][y] = value;
  setGeneration(generation);
}

function findLeft(position: Position, generation: GenerationType): Position {
  const [x, y] = position;
  if (generation[x][y - 1] === undefined) {
    return [x, generation.length - 1];
  }
  return [x, y - 1];
}

function findRight(position: Position, generation: GenerationType): Position {
  const [x, y] = position;
  if (generation[x][y + 1] === undefined) {
    return [x, 0];
  }
  return [x, y + 1];
}

function findTop(position: Position, generation: GenerationType): Position {
  const [x, y] = position;
  if (generation[x - 1] === undefined) {
    return [generation.length - 1, y];
  }
  return [x - 1, y];
}

function findBottom(position: Position, generation: GenerationType): Position {
  const [x, y] = position;
  if (generation[x + 1] === undefined) {
    return [0, y];
  }
  return [x + 1, y];
}

function findTopLeft(position: Position, generation: GenerationType): Position {
  const [x, y] = position;
  if (generation[x - 1] === undefined) {
    const outOfBoundX = generation.length - 1;
    if (generation[outOfBoundX][y - 1] === undefined) {
      return [outOfBoundX, generation.length - 1];
    }
    return [generation.length - 1, y - 1];
  }
  if (generation[x - 1][y - 1] === undefined) {
    return [x - 1, generation.length - 1];
  }
  return [x - 1, y - 1];
}

function findTopRight(
  position: Position,
  generation: GenerationType
): Position {
  const [x, y] = position;
  if (generation[x - 1] === undefined) {
    const outOfBoundX = generation.length - 1;
    if (generation[outOfBoundX][y + 1] === undefined) {
      return [outOfBoundX, 0];
    }
    return [outOfBoundX, y + 1];
  }
  if (generation[x - 1][y + 1] === undefined) {
    return [x - 1, 0];
  }
  return [x - 1, y + 1];
}

function findBottomLeft(
  position: Position,
  generation: GenerationType
): Position {
  const [x, y] = position;
  if (generation[x + 1] === undefined) {
    return [0, y];
  }
  if (generation[x + 1][y - 1] === undefined) {
    return [x + 1, generation.length - 1];
  }
  return [x + 1, y - 1];
}

function findBottomRight(
  position: Position,
  generation: GenerationType
): Position {
  const [x, y] = position;
  if (generation[x + 1] === undefined) {
    return [0, y];
  }
  if (generation[x + 1][y + 1] === undefined) {
    return [x + 1, 0];
  }
  return [x + 1, y + 1];
}

export function getNeighbors(
  position: Position,
  generation: GenerationType
): Position[] {
  // find left
  const left = findLeft(position, generation);
  // find right
  const right = findRight(position, generation);
  // find top
  const top = findTop(position, generation);
  // find top-left
  const topLeft = findTopLeft(position, generation);
  // find top-right
  const topRight = findTopRight(position, generation);
  // find the bottom
  const bottom = findBottom(position, generation);
  // find the bottom-left
  const bottomLeft = findBottomLeft(position, generation);
  // find the bottom-right
  const bottomRight = findBottomRight(position, generation);

  return [left, right, top, topLeft, topRight, bottom, bottomLeft, bottomRight];
}

export function calculateNextGeneration(): GenerationType {
  const newGeneration: GenerationType = [];
  const previousGeneration = getGeneration();
  const len = previousGeneration.length;
  for (let i = 0; i < len; i++) {
    newGeneration[i] = [];
    for (let j = 0; j < len; j++) {
      const cell = previousGeneration[i][j];
      const neighbors = getNeighbors([i, j], previousGeneration);
      const alive = neighbors.reduce((acc, [x, y]) => {
        if (previousGeneration[x] && previousGeneration[x][y]) {
          acc += 1;
        }
        return acc;
      }, 0);

      let newState: CellValue;
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

export function emptyGeneration(cells: number): GenerationType {
  const matrix: GenerationType = [];
  for (let i = 0; i < cells; i++) {
    matrix[i] = [];
    for (let j = 0; j < cells; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
}
