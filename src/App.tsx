import React, { FC, useState, useRef } from 'react';
import { ChessBoard, PieceData, Teams, SquareData } from './components/ChessBoard/ChessBoard';
import styled from 'styled-components';
import { createInitialPiecePositions } from './helpers/createInitialPiecePositions';
import { Credit } from './components/Credit';
import { ValidMoveData } from './helpers/valid_moves/calculateValidMoves';
import { SideOfBoard } from './types';
import { createMemoizedCalculateValidMoves } from './helpers/valid_moves/memoizedCalculateValidMoves';
import { getOppositeSideOfBoard } from './helpers/getOppositeSideOfBoard';

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

  const { pieces } = useChessPieces(whiteSideOfBoard);

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

  const handleSquareclick = (squareData: SquareData): void => {
    const { pieceData, isValidMoveSquare } = squareData;

    const hasClickedOnAlreadySelectedPiece = pieceData === selectedPiece;
    const hasClickedOnAFriendlyPiece = pieceData && pieceData.team === currentPlayersTurn;
    const hasClickedOnANonValidMoveSquare = selectedPiece && !isValidMoveSquare;

    if (hasClickedOnAlreadySelectedPiece) {
      return;
    }

    if (hasClickedOnAFriendlyPiece) {
      setSelectedPiece(pieceData);
      return;
    }

    if (hasClickedOnANonValidMoveSquare) {
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

  function changeTeamAndInvalidateCache(): void {
    clearValidMovesCache();
    setCurrentPlayersTurn(prevPlayersTurn => {
      return prevPlayersTurn === 'black' ? 'white' : 'black';
    });
  }
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
