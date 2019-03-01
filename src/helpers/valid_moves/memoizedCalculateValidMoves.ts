import { PieceData } from '../../components/ChessBoard/ChessBoard';
import { GameData, AlreadyCalculatedMoves } from '../../App';
import { ValidMoveData, calculateValidMoves } from './calculateValidMoves';

export function createMemoizedCalculateValidMoves(): (
  selectedPiece: PieceData,
  gameData: GameData,
) => ValidMoveData[] | undefined {
  const alreadyCalculatedMoves: AlreadyCalculatedMoves = {};

  return (selectedPiece, gameData) => {
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

      // setAlreadyCalculatedMoves({ ...alreadyCalculatedMoves, [memoizeKey]: calculatedMoves });
      alreadyCalculatedMoves[memoizeKey] = calculatedMoves;

      return calculatedMoves;
    }
  };
}
