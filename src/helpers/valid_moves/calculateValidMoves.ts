import { Vector, PieceTypes, SideOfBoard } from '../../types';
import { PieceData, Teams } from '../../components/ChessBoard';
import { applyVector, areVectorsEqual, createVector } from '../vector';

interface GameData {
  pieces: { white: PieceData[]; black: PieceData[] };
  currentPlayersTurn: Teams;
  whiteSideOfBoard: SideOfBoard;
}

export interface ValidMoveData {
  position: Vector;
  isEnemyPieceInSquare: boolean;
}

interface PieceMoveRule {
  vectors: Vector[];
  canMoveMultiple: boolean;
}

type PieceMoveRules = { [key in PieceTypes]: PieceMoveRule };

function createPieceMoveRules(sideOfBoard: SideOfBoard): PieceMoveRules {
  return {
    king: {
      vectors: [
        createVector(0, 1),
        createVector(1, 1),
        createVector(1, 0),
        createVector(1, -1),
        createVector(0, -1),
        createVector(-1, -1),
        createVector(-1, 0),
        createVector(-1, 1)
      ],
      canMoveMultiple: false
    },
    bishop: {
      vectors: [createVector(1, 1), createVector(1, -1), createVector(-1, -1), createVector(-1, 1)],
      canMoveMultiple: true
    },
    knight: {
      vectors: [
        createVector(1, 2),
        createVector(2, 1),
        createVector(2, -1),
        createVector(1, -2),
        createVector(-1, -2),
        createVector(-2, -1),
        createVector(-2, 1),
        createVector(-1, 2)
      ],
      canMoveMultiple: false
    },
    pawn: {
      vectors: sideOfBoard === 'bottom' ? [createVector(0, -1)] : [createVector(0, 1)],
      canMoveMultiple: false
    },
    queen: {
      vectors: [
        createVector(0, 1),
        createVector(1, 1),
        createVector(1, 0),
        createVector(1, -1),
        createVector(0, -1),
        createVector(-1, -1),
        createVector(-1, 0),
        createVector(-1, 1)
      ],
      canMoveMultiple: true
    },
    rook: {
      vectors: [createVector(0, 1), createVector(1, 0), createVector(0, -1), createVector(-1, 0)],
      canMoveMultiple: true
    }
  };
}

export function calculateValidMoves(pieceToMove: PieceData, gameData: GameData): ValidMoveData[] | undefined {
  const validMoves: ValidMoveData[] = [];

  const sideOfBoard =
    pieceToMove.team === 'white' ? gameData.whiteSideOfBoard : gameData.whiteSideOfBoard === 'top' ? 'bottom' : 'top';

  const pieceMoveRules = createPieceMoveRules(sideOfBoard);

  if (pieceToMove.team !== gameData.currentPlayersTurn) {
    return;
  }

  validMoves.push(...calculateValidMovesForPiece(pieceMoveRules[pieceToMove.type], pieceToMove, gameData, sideOfBoard));

  return validMoves;
}

function calculateValidMovesForPiece(
  pieceMoveRule: PieceMoveRule,
  pieceToMove: PieceData,
  gameData: GameData,
  sideofBoard: SideOfBoard
): ValidMoveData[] {
  const oppositeTeam = pieceToMove.team === 'black' ? 'white' : 'black';

  const moves = pieceMoveRule.vectors.reduce<ValidMoveData[]>((accum, moveVector) => {
    let keepChecking = true;
    let startingPosition = pieceToMove.position;
    let numberOfMoves = 0;
    do {
      const squareToMoveTo = applyVector(startingPosition, moveVector);

      const isVectorInsideBoard = checkIsVectorInsideBoard(squareToMoveTo);
      const isFriendlyPieceInSquare = checkIsPieceInSquare(squareToMoveTo, gameData.pieces[pieceToMove.team]);
      const isEnemyPieceInSquare = checkIsPieceInSquare(squareToMoveTo, gameData.pieces[oppositeTeam]);

      if (isVectorInsideBoard && !isFriendlyPieceInSquare && !(pieceToMove.type === 'pawn' && isEnemyPieceInSquare)) {
        accum.push({ position: squareToMoveTo, isEnemyPieceInSquare });
        startingPosition = squareToMoveTo;
        if (isEnemyPieceInSquare) {
          numberOfMoves++;
          keepChecking = false;
        }
      } else {
        numberOfMoves++;
        keepChecking = false;
      }

      numberOfMoves++;
    } while (
      (pieceMoveRule.canMoveMultiple && keepChecking) ||
      (pieceToMove.type === 'pawn' && !pieceToMove.hasMoved && numberOfMoves < 2)
    );

    if (pieceToMove.type === 'pawn') {
      const takingMoves: [Vector, Vector] =
        sideofBoard === 'bottom'
          ? [createVector(1, -1), createVector(-1, -1)]
          : [createVector(1, 1), createVector(-1, 1)];

      takingMoves.forEach(move => {
        const squareToMoveTo = applyVector(pieceToMove.position, move);
        const isVectorInsideBoard = checkIsVectorInsideBoard(squareToMoveTo);
        const isEnemyPieceInSquare = checkIsPieceInSquare(squareToMoveTo, gameData.pieces[oppositeTeam]);

        if (isVectorInsideBoard && isEnemyPieceInSquare) {
          accum.push({ position: squareToMoveTo, isEnemyPieceInSquare: true });
        }
      });
    }

    return accum;
  }, []);

  return moves;
}

function checkIsVectorInsideBoard({ x, y }: Vector): boolean {
  return x >= 1 && x <= 8 && y >= 1 && y <= 8;
}

function checkIsPieceInSquare(squareToMoveTo: Vector, pieces: PieceData[]): boolean {
  return !!pieces.find(piece => areVectorsEqual(squareToMoveTo, piece.position));
}
