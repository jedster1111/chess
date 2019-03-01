import { PieceData } from '../../components/ChessBoard/ChessBoard';
import { GameData, AlreadyCalculatedMoves } from '../../App';
import { calculateValidMoves } from './calculateValidMoves';

export function createMemoizedCalculateValidMoves(): {
  calculateValidMovesMemo: typeof calculateValidMoves;
  clearValidMovesCache: () => void;
} {
  let alreadyCalculatedMoves: AlreadyCalculatedMoves = {};

  function clearValidMovesCache() {
    console.debug('[createMemoizedCalculateValidMoves] Cleared cache');
    alreadyCalculatedMoves = {};
  }

  const calculateValidMovesMemo: typeof calculateValidMoves = (selectedPiece: PieceData, gameData: GameData) => {
    if (selectedPiece.team !== gameData.currentPlayersTurn) {
      return undefined;
    }

    const { x, y } = selectedPiece.position;
    const memoizeKey = `${selectedPiece.type}-${x}-${y}`;

    const alreadyCalculatedMove = alreadyCalculatedMoves[memoizeKey];
    if (alreadyCalculatedMove) {
      console.debug(`[calculateValidMovesMemoized] Returned memoized move ${memoizeKey}: `, alreadyCalculatedMove);
      return alreadyCalculatedMove;
    } else {
      const calculatedMoves = calculateValidMoves(selectedPiece, gameData);

      console.debug(`[calculateValidMovesMemoized] Calculated new moves ${memoizeKey}:`, calculatedMoves);

      alreadyCalculatedMoves[memoizeKey] = calculatedMoves;

      return calculatedMoves;
    }
  };

  return { calculateValidMovesMemo, clearValidMovesCache };
}
