import { describe, it, assert, test } from "vitest";
import { GenerationType, getNeighbors } from "../src/state";

describe("getNeighbors tests", () => {
  const generation: GenerationType = [
    [0, 1, 0, 0],
    [1, 0, 1, 1],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
  ];
  it("should return the correct neighbors for the top-left corner", () => {
    const neighbors = getNeighbors([0, 0], generation);
    const [
      left,
      right,
      top,
      topLeft,
      topRight,
      bottom,
      bottomLeft,
      bottomRight,
    ] = neighbors;
    assert.deepEqual(left, [0, 3]);
    assert.deepEqual(right, [0, 1]);
    assert.deepEqual(top, [3, 0]);
    assert.deepEqual(topLeft, [3, 3]);
    assert.deepEqual(topRight, [3, 1]);
    assert.deepEqual(bottom, [1, 0]);
    assert.deepEqual(bottomLeft, [1, 3]);
    assert.deepEqual(bottomRight, [1, 1]);
  });
});
