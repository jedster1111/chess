import { SquareData, PieceData } from '../components/ChessBoard/ChessBoard';

export function calculateMovedPieces(
  pieces: PieceData[],
  pieceToMove: PieceData,
  clickedSquare: SquareData,
): PieceData[] {
  const newPieces = [...pieces];
  const indexOfPiece = newPieces.findIndex(piece => piece === pieceToMove);

  if (indexOfPiece === -1) {
    console.error('[calculateMovedPieces] Could not find the piece you wanted to move!?!?');
    return pieces;
  }

  console.debug('[calculateMovedPieces] Moved piece!');
  newPieces[indexOfPiece] = { ...pieceToMove, position: clickedSquare.position, hasMoved: true };

  return newPieces;
}
