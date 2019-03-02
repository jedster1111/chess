import { PieceData } from '../components/ChessBoard/ChessBoard';

export function calculatePiecesWithRemoved(pieces: PieceData[], pieceToRemove: PieceData): PieceData[] {
  const newPieces = [...pieces];
  const indexoOfPieceToRemove = newPieces.findIndex(piece => piece === pieceToRemove);

  if (indexoOfPieceToRemove === -1) {
    console.debug('[calculatePiecesWithRemoved] Could not find the piece you wanted to remove!?!?');
    return pieces;
  }

  console.log('[calculatePiecesWithRemoved] Removed piece!');
  newPieces.splice(indexoOfPieceToRemove, 1);

  return newPieces;
}
