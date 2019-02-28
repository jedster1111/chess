import { Vector, PieceTypes, SideOfBoard } from '../../types';
import { PieceData } from '../../components/ChessBoard/ChessBoard';
import { createVector, applyVector, checkIsVectorInsideBoard } from '../vector';
import { GameData } from '../../App';
import { checkIsPieceInSquare } from '../checkIsPieceInSquare';

export interface ValidMoveData {
  position: Vector;
  isEnemyPieceInSquare: boolean;
}

export interface PieceMoveRule {
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
        createVector(-1, 1),
      ],
      canMoveMultiple: false,
    },
    bishop: {
      vectors: [createVector(1, 1), createVector(1, -1), createVector(-1, -1), createVector(-1, 1)],
      canMoveMultiple: true,
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
        createVector(-1, 2),
      ],
      canMoveMultiple: false,
    },
    pawn: {
      vectors: sideOfBoard === 'bottom' ? [createVector(0, -1)] : [createVector(0, 1)],
      canMoveMultiple: false,
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
        createVector(-1, 1),
      ],
      canMoveMultiple: true,
    },
    rook: {
      vectors: [createVector(0, 1), createVector(1, 0), createVector(0, -1), createVector(-1, 0)],
      canMoveMultiple: true,
    },
  };
}

export function calculateValidMoves(pieceToMove: PieceData, gameData: GameData): ValidMoveData[] | undefined {
  const sideOfBoard = pieceToMove.team === 'white' ? gameData.whiteSideOfBoard : gameData.blackSideOfBoard;
  const pieceMoveRules = createPieceMoveRules(sideOfBoard);
  const oppositeTeam = pieceToMove.team === 'black' ? 'white' : 'black';

  const pieceMoveRule = pieceMoveRules[pieceToMove.type];

  if (pieceToMove.team !== gameData.currentPlayersTurn) {
    return;
  }

  const validMoves = pieceMoveRule.vectors.reduce<ValidMoveData[]>((accum, moveVector) => {
    let keepChecking = true;
    let startingPosition = pieceToMove.position;
    let numberOfMoves = 0;

    do {
      const squareToMoveTo = applyVector(startingPosition, moveVector);
      const isVectorInsideBoard = checkIsVectorInsideBoard(squareToMoveTo);
      const isFriendlyPieceInSquare = checkIsPieceInSquare(squareToMoveTo, gameData.pieces[pieceToMove.team]);
      const isEnemyPieceInSquare = checkIsPieceInSquare(squareToMoveTo, gameData.pieces[oppositeTeam]);

      // has to check for case where piece is a pawn as it can't take forwards
      if (pieceToMove.type === 'pawn' && isEnemyPieceInSquare) {
        numberOfMoves++;
        keepChecking = false;
      } else if (isVectorInsideBoard && !isFriendlyPieceInSquare) {
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
      // if can move multiple, then keep checking
      // handles special case for pawns where if they haven't moved they can make two steps
      (pieceMoveRule.canMoveMultiple && keepChecking) ||
      (pieceToMove.type === 'pawn' && !pieceToMove.hasMoved && numberOfMoves < 2)
    );
    // handles case where pawn can take a piece diagonally
    if (pieceToMove.type === 'pawn') {
      const pawnTakingMoves: [Vector, Vector] =
        sideOfBoard === 'bottom'
          ? [createVector(1, -1), createVector(-1, -1)]
          : [createVector(1, 1), createVector(-1, 1)];
      pawnTakingMoves.forEach(move => {
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

  return validMoves;
}
