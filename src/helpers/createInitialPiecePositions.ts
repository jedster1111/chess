import { PieceData, Teams } from '../components/ChessBoard';
import { SideOfBoard } from '../types';

export function createInitialPiecePositions(sideOfBoard: SideOfBoard, team: Teams): PieceData[] {
  return [
    {
      position: sideOfBoard === 'top' ? { x: 1, y: 1 } : { x: 1, y: 8 },
      type: 'rook',
      team,
      hasMoved: false
    },
    {
      position: sideOfBoard === 'top' ? { x: 2, y: 1 } : { x: 2, y: 8 },
      type: 'knight',
      team,
      hasMoved: false
    },
    {
      position: sideOfBoard === 'top' ? { x: 3, y: 1 } : { x: 3, y: 8 },
      type: 'bishop',
      team,
      hasMoved: false
    },
    {
      position: sideOfBoard === 'top' ? { x: 4, y: 1 } : { x: 4, y: 8 },
      type: team === 'white' ? (sideOfBoard === 'top' ? 'king' : 'queen') : sideOfBoard === 'top' ? 'queen' : 'king',
      team,
      hasMoved: false
    },
    {
      position: sideOfBoard === 'top' ? { x: 5, y: 1 } : { x: 5, y: 8 },
      type: team === 'white' ? (sideOfBoard === 'top' ? 'queen' : 'king') : sideOfBoard === 'top' ? 'king' : 'queen',
      team,
      hasMoved: false
    },
    {
      position: sideOfBoard === 'top' ? { x: 6, y: 1 } : { x: 6, y: 8 },
      type: 'bishop',
      team,
      hasMoved: false
    },
    {
      position: sideOfBoard === 'top' ? { x: 8, y: 6 } : { x: 7, y: 8 },
      type: 'knight',
      team,
      hasMoved: false
    },
    // {
    //   position: sideOfBoard === 'top' ? { x: 8, y: 1 } : { x: 8, y: 8 },
    //   type: 'rook',
    //   team,
    //   hasMoved: false
    // },
    // {
    //   position: sideOfBoard === 'top' ? { x: 1, y: 2 } : { x: 1, y: 7 },
    //   type: 'pawn',
    //   team,
    //   hasMoved: false
    // },
    // {
    //   position: sideOfBoard === 'top' ? { x: 2, y: 2 } : { x: 2, y: 7 },
    //   type: 'pawn',
    //   team,
    //   hasMoved: false
    // },
    // {
    //   position: sideOfBoard === 'top' ? { x: 3, y: 2 } : { x: 3, y: 7 },
    //   type: 'pawn',
    //   team,
    //   hasMoved: false
    // },
    // {
    //   position: sideOfBoard === 'top' ? { x: 4, y: 2 } : { x: 4, y: 7 },
    //   type: 'pawn',
    //   team,
    //   hasMoved: false
    // },
    // {
    //   position: sideOfBoard === 'top' ? { x: 5, y: 2 } : { x: 5, y: 7 },
    //   type: 'pawn',
    //   team,
    //   hasMoved: false
    // },
    // {
    //   position: sideOfBoard === 'top' ? { x: 6, y: 2 } : { x: 6, y: 7 },
    //   type: 'pawn',
    //   team,
    //   hasMoved: false
    // },
    {
      position: sideOfBoard === 'top' ? { x: 7, y: 2 } : { x: 7, y: 7 },
      type: 'pawn',
      team,
      hasMoved: false
    },
    {
      position: sideOfBoard === 'top' ? { x: 8, y: 2 } : { x: 8, y: 7 },
      type: 'pawn',
      team,
      hasMoved: false
    }
  ];
}
