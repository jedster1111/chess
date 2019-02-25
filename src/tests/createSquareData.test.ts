import {
  SquareData,
  createSquareData,
  PieceData
} from '../components/ChessBoard';
import { PieceTypes } from '../types';

const createWhiteFirstRow: () => SquareData[] = () => [
  { bgColor: 'white' },
  { bgColor: 'black' },
  { bgColor: 'white' },
  { bgColor: 'black' },
  { bgColor: 'white' },
  { bgColor: 'black' },
  { bgColor: 'white' },
  { bgColor: 'black' }
];
const createBlackFirstRow: () => SquareData[] = () => [
  { bgColor: 'black' },
  { bgColor: 'white' },
  { bgColor: 'black' },
  { bgColor: 'white' },
  { bgColor: 'black' },
  { bgColor: 'white' },
  { bgColor: 'black' },
  { bgColor: 'white' }
];

const createEmptyBoardData: () => SquareData[][] = () => [
  createWhiteFirstRow(),
  createBlackFirstRow(),
  createWhiteFirstRow(),
  createBlackFirstRow(),
  createWhiteFirstRow(),
  createBlackFirstRow(),
  createWhiteFirstRow(),
  createBlackFirstRow()
];

it('should return an empty chess board', () => {
  const result = createEmptyBoardData();

  expect(createSquareData()).toEqual(result);
});

it('should add pieces to board', () => {
  const piecesData: PieceData[] = [
    { position: { x: 1, y: 1 }, type: PieceTypes.B, team: 'white' }
  ];

  const result = createEmptyBoardData();
  result[1][1].pieceData = { type: PieceTypes.B, team: 'white' };

  expect(createSquareData(piecesData)).toEqual(result);
});
