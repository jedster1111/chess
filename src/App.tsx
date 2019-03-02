import React, { FC, useState, useRef } from 'react';
import { ChessBoard, PieceData, Teams, SquareData } from './components/ChessBoard/ChessBoard';
import styled from 'styled-components';
import { createInitialPiecePositions } from './helpers/createInitialPiecePositions';
import { Credit } from './components/Credit';
import { ValidMoveData } from './helpers/valid_moves/calculateValidMoves';
import { SideOfBoard } from './types';
import { createMemoizedCalculateValidMoves } from './helpers/valid_moves/memoizedCalculateValidMoves';
import { getOppositeSideOfBoard } from './helpers/getOppositeSideOfBoard';
import { calculateMovedPieces } from './helpers/movePieceToPosition';
import { getOppositeTeam } from './helpers/getOppositeTeam';
import { calculatePiecesWithRemoved } from './helpers/calculatePiecesWithRemoved';

export interface GameData {
  pieces: { white: PieceData[]; black: PieceData[] };
  currentPlayersTurn: Teams;
  whiteSideOfBoard: SideOfBoard;
  blackSideOfBoard: SideOfBoard;
}

interface AppProps {
  whiteSideOfBoard: SideOfBoard;
}

export interface AlreadyCalculatedMoves {
  [key: string]: ValidMoveData[] | undefined;
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  text-align: center;
  color: white;

  height: 100vh;
`;

const StyledAppMain = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  background-color: #282c34;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

const StyledFooter = styled.footer`
  background-color: #5d5d81;
  padding: 8px 0;
`;

const App: FC<AppProps> = ({ whiteSideOfBoard }) => {
  // Create memoized calculateValidMoves and callback to clear the cache
  const calculateValidMovesMemoRef = useRef(createMemoizedCalculateValidMoves());
  const { calculateValidMovesMemo, clearValidMovesCache } = calculateValidMovesMemoRef.current;

  const blackSideOfBoard = getOppositeSideOfBoard(whiteSideOfBoard);

  const { pieces, setPieces } = useChessPieces(whiteSideOfBoard);

  const [selectedPiece, setSelectedPiece] = useState<PieceData | undefined>(
    pieces.white.find(piece => piece.type === 'knight'),
  );
  const [currentPlayersTurn, setCurrentPlayersTurn] = useState<Teams>('white');

  const gameData: GameData = {
    pieces,
    currentPlayersTurn,
    whiteSideOfBoard,
    blackSideOfBoard,
  };

  const validMoves: ValidMoveData[] | undefined = selectedPiece && calculateValidMovesMemo(selectedPiece, gameData);

  const handleSquareclick = (clickedSquare: SquareData): void => {
    const typeOfSquareClickAction = getTypeOfSquareClickAction(clickedSquare, currentPlayersTurn, selectedPiece);
    const oppositeTeam = getOppositeTeam(currentPlayersTurn);

    switch (typeOfSquareClickAction) {
      case 'doNothing':
        return;

      case 'movePieceToSquare':
        setPieces[currentPlayersTurn](calculateMovedPieces(pieces[currentPlayersTurn], selectedPiece!, clickedSquare));
        setCurrentPlayersTurn(oppositeTeam);
        setSelectedPiece(undefined);
        clearValidMovesCache();
        return;

      case 'takeEnemyPiece':
        setPieces[currentPlayersTurn](calculateMovedPieces(pieces[currentPlayersTurn], selectedPiece!, clickedSquare));
        setPieces[oppositeTeam](calculatePiecesWithRemoved(pieces[oppositeTeam], clickedSquare.pieceData!));
        setCurrentPlayersTurn(getOppositeTeam(currentPlayersTurn));
        setSelectedPiece(undefined);
        clearValidMovesCache();
        return;

      case 'changeSelectedPiece':
        setSelectedPiece(clickedSquare.pieceData);
        return;

      case 'deselectPiece':
        setSelectedPiece(undefined);
        return;
    }
  };

  return (
    <StyledApp>
      <StyledAppMain>
        <p>Chess?</p>
        <ChessBoard
          gameData={gameData}
          selectedPiece={selectedPiece}
          validMoves={validMoves}
          handleSquareclick={handleSquareclick}
        />
      </StyledAppMain>
      <StyledFooter>
        <Credit />
      </StyledFooter>
    </StyledApp>
  );
};

export default App;

function useChessPieces(
  whiteSideOfBoard: SideOfBoard,
): {
  pieces: { black: PieceData[]; white: PieceData[] };
  setPieces: { black: (pieceData: PieceData[]) => void; white: (pieceData: PieceData[]) => void };
} {
  const [whitePiecesData, setWhitePieceData] = useState<PieceData[]>(
    createInitialPiecePositions(whiteSideOfBoard, 'white'),
  );
  const [blackPiecesData, setBlackPieceData] = useState<PieceData[]>(
    createInitialPiecePositions(getOppositeSideOfBoard(whiteSideOfBoard), 'black'),
  );

  return {
    pieces: { black: blackPiecesData, white: whitePiecesData },
    setPieces: { black: setBlackPieceData, white: setWhitePieceData },
  };
}

type SquareClickType = 'changeSelectedPiece' | 'deselectPiece' | 'movePieceToSquare' | 'takeEnemyPiece' | 'doNothing';

function getTypeOfSquareClickAction(
  clickedSquare: SquareData,
  currentPlayersTurn: Teams,
  selectedPiece: PieceData | undefined,
): SquareClickType {
  const { pieceData, isValidMoveSquare } = clickedSquare;

  const hasClickedOnAlreadySelectedPiece = pieceData === selectedPiece;
  const hasClickedOnAFriendlyPiece = pieceData && pieceData.team === currentPlayersTurn;
  const hasClickedOnANonValidMoveSquare = selectedPiece && !isValidMoveSquare;
  const hasClickedOnAValidMoveSquare = selectedPiece && isValidMoveSquare && !pieceData;
  const hasClickedOnAnEnemyPiece =
    selectedPiece && isValidMoveSquare && pieceData && pieceData.team !== currentPlayersTurn;

  if (hasClickedOnAlreadySelectedPiece) {
    return 'doNothing';
  }

  if (hasClickedOnAFriendlyPiece) {
    return 'changeSelectedPiece';
  }

  if (hasClickedOnANonValidMoveSquare) {
    return 'deselectPiece';
  }

  if (hasClickedOnAValidMoveSquare) {
    return 'movePieceToSquare';
  }

  if (hasClickedOnAnEnemyPiece) {
    return 'takeEnemyPiece';
  }

  return 'doNothing';
}
