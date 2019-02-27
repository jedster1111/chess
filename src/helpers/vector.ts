import { Vector } from '../types';

export function createVector(x: number, y: number): Vector {
  return { x, y };
}

export function applyVector(a: Vector, b: Vector): Vector {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function areVectorsEqual(a: Vector, b: Vector): boolean {
  return a.x === b.x && a.y === b.y;
}
