import React, { FC, useState } from 'react';
import { ChessBoard, PieceData, Teams, SquareData } from './components/ChessBoard/ChessBoard';
import styled from 'styled-components';
import { createInitialPiecePositions } from './helpers/createInitialPiecePositions';
import { Credit } from './components/Credit';
import { ValidMoveData, calculateValidMoves } from './helpers/valid_moves/calculateValidMoves';
import { SideOfBoard } from './types';

export interface GameData {
  pieces: { white: PieceData[]; black: PieceData[] };
  currentPlayersTurn: Teams;
  whiteSideOfBoard: SideOfBoard;
  blackSideOfBoard: SideOfBoard;
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
  const whiteSideOfBoard: SideOfBoard = 'bottom';
  const blackSideOfBoard: SideOfBoard = whiteSideOfBoard === 'bottom' ? 'top' : 'bottom';

  const [whitePiecesData] = useState<PieceData[]>(createInitialPiecePositions(whiteSideOfBoard, 'white'));

  const [blackPiecesData] = useState<PieceData[]>(createInitialPiecePositions(blackSideOfBoard, 'black'));

  const [selectedPiece, setSelectedPiece] = useState<PieceData | undefined>(
    whitePiecesData.find(piece => piece.type === 'knight') || whitePiecesData[0],
  );

  const [currentPlayersTurn] = useState<Teams>('white');

  const gameData: GameData = {
    pieces: { black: blackPiecesData, white: whitePiecesData },
    currentPlayersTurn,
    whiteSideOfBoard,
    blackSideOfBoard,
  };

  const validMoves: ValidMoveData[] | undefined = selectedPiece
    ? calculateValidMoves(selectedPiece, gameData)
    : undefined;

  // handleSetSelectedPiece(currentPlayersTurn);

  const handleSquareclick = (squareData: SquareData): void => {
    const { pieceData, isValidMoveSquare } = squareData;

    if (pieceData && pieceData.team === currentPlayersTurn) {
      setSelectedPiece(pieceData);
      return;
    }

    if (selectedPiece && !isValidMoveSquare) {
      setSelectedPiece(undefined);
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
