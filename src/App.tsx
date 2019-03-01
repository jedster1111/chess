import React, { FC, useState, useRef } from 'react';
import { ChessBoard, PieceData, Teams, SquareData } from './components/ChessBoard/ChessBoard';
import styled from 'styled-components';
import { createInitialPiecePositions } from './helpers/createInitialPiecePositions';
import { Credit } from './components/Credit';
import { ValidMoveData } from './helpers/valid_moves/calculateValidMoves';
import { SideOfBoard } from './types';
import { createMemoizedCalculateValidMoves } from './helpers/valid_moves/memoizedCalculateValidMoves';

export interface GameData {
  pieces: { white: PieceData[]; black: PieceData[] };
  currentPlayersTurn: Teams;
  whiteSideOfBoard: SideOfBoard;
  blackSideOfBoard: SideOfBoard;
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

const App: FC = props => {
  const calculateValidMovesRef = useRef<
    ((selectedPiece: PieceData, gameData: GameData) => ValidMoveData[] | undefined) | null
  >(createMemoizedCalculateValidMoves());

  // If there isn't a memoized instance, then create one.
  if (!calculateValidMovesRef.current) {
    calculateValidMovesRef.current = createMemoizedCalculateValidMoves();
  }

  const whiteSideOfBoard: SideOfBoard = 'bottom';
  const blackSideOfBoard: SideOfBoard = whiteSideOfBoard === 'bottom' ? 'top' : 'bottom';

  const [whitePiecesData] = useState<PieceData[]>(createInitialPiecePositions(whiteSideOfBoard, 'white'));
  const [blackPiecesData] = useState<PieceData[]>(createInitialPiecePositions(blackSideOfBoard, 'black'));
  const [selectedPiece, setSelectedPiece] = useState<PieceData | undefined>(
    whitePiecesData.find(piece => piece.type === 'knight'),
  );
  const [currentPlayersTurn, setCurrentPlayersTurn] = useState<Teams>('white');

  const gameData: GameData = {
    pieces: { black: blackPiecesData, white: whitePiecesData },
    currentPlayersTurn,
    whiteSideOfBoard,
    blackSideOfBoard,
  };

  const validMoves: ValidMoveData[] | undefined =
    selectedPiece && calculateValidMovesRef.current
      ? calculateValidMovesRef.current(selectedPiece, gameData)
      : undefined;

  const handleSquareclick = (squareData: SquareData): void => {
    const { pieceData, isValidMoveSquare } = squareData;

    if (pieceData === selectedPiece) {
      return;
    }

    if (pieceData && pieceData.team === currentPlayersTurn) {
      setSelectedPiece(pieceData);
      return;
    } else if (pieceData) {
      changeTeamAndInvalidateCache();
      setSelectedPiece(pieceData);
      return;
    }

    if (selectedPiece && !isValidMoveSquare) {
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
    console.debug('[changeTeamAndInvalidateCache]: Invalidated cache');
    calculateValidMovesRef.current = null;
    setCurrentPlayersTurn(prevPlayersTurn => {
      return prevPlayersTurn === 'black' ? 'white' : 'black';
    });
  }
};

export default App;
