import { ValidMoveData } from '../../helpers/valid_moves/calculateValidMoves';
import { areVectorsEqual, createVector } from '../../helpers/vector';
import { PieceData, SquareData, Teams } from './ChessBoard';

export function createSquareData(
  piecesData?: PieceData[],
  validMovesData?: ValidMoveData[],
  selectedPiece?: PieceData,
): SquareData[][] {
  const width = 8;
  const height = 8;
  const squares: SquareData[][] = [];
  for (let y = 0; y < height; y++) {
    const row: SquareData[] = [];
    const firstSquareBgColor: Teams = y % 2 === 0 ? 'white' : 'black';
    for (let x = 0; x < width; x++) {
      const bgColor: Teams = x % 2 === 0 ? firstSquareBgColor : firstSquareBgColor === 'white' ? 'black' : 'white';
      const squarePosition = createVector(x + 1, y + 1);
      const isSelectedSquare = selectedPiece ? areVectorsEqual(squarePosition, selectedPiece.position) : false;
      row.push({
        bgColor,
        isValidMoveSquare: false,
        isSelectedSquare,
        isEnemyPieceInSquare: false,
        position: squarePosition,
      });
    }
    squares.push(row);
  }
  if (!piecesData) {
    return squares;
  }
  piecesData.forEach(pieceData => {
    const { x, y } = pieceData.position;
    squares[y - 1][x - 1].pieceData = pieceData;
  });
  if (validMovesData) {
    validMovesData.forEach(({ position: { x, y }, isEnemyPieceInSquare }) => {
      squares[y - 1][x - 1].isValidMoveSquare = true;
      squares[y - 1][x - 1].isEnemyPieceInSquare = isEnemyPieceInSquare;
    });
  }
  return squares;
}
