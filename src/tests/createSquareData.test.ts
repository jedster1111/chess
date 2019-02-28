import { SquareData, PieceData } from '../components/ChessBoard/ChessBoard';
import { createSquareData } from '../components/ChessBoard/createSquareData';
import { createVector } from '../helpers/vector';

const createWhiteFirstRow: () => SquareData[] = () => [
  { bgColor: 'white', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'black', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'white', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'black', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'white', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'black', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'white', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'black', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
];
const createBlackFirstRow: () => SquareData[] = () => [
  { bgColor: 'black', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'white', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'black', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'white', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'black', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'white', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'black', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
  { bgColor: 'white', isEnemyPieceInSquare: false, isSelectedSquare: false, isValidMoveSquare: false },
];

const createEmptyBoardData: () => SquareData[][] = () => [
  createWhiteFirstRow(),
  createBlackFirstRow(),
  createWhiteFirstRow(),
  createBlackFirstRow(),
  createWhiteFirstRow(),
  createBlackFirstRow(),
  createWhiteFirstRow(),
  createBlackFirstRow(),
];

it('should return an empty chess board', () => {
  const result = createEmptyBoardData();

  expect(createSquareData()).toEqual(result);
});

it('should add pieces to board', () => {
  const piecesData: PieceData[] = [{ position: { x: 1, y: 1 }, type: 'bishop', team: 'white', hasMoved: false }];

  const result = createEmptyBoardData();
  const squareData: SquareData = {
    pieceData: { type: 'bishop', team: 'white', position: createVector(1, 1), hasMoved: false },
    isValidMoveSquare: false,
    bgColor: 'white',
    isEnemyPieceInSquare: false,
    isSelectedSquare: false,
  };
  result[0][0] = squareData;

  expect(createSquareData(piecesData)).toEqual(result);
});
