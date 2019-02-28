import { Vector } from '../types';
import { PieceData } from '../components/ChessBoard/ChessBoard';
import { areVectorsEqual } from './vector';

export function checkIsPieceInSquare(squareToMoveTo: Vector, pieces: PieceData[]): boolean {
  return !!pieces.find(piece => areVectorsEqual(squareToMoveTo, piece.position));
}
