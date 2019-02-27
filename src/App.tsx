import React, { FC, useState } from 'react';
import { ChessBoard, PieceData, Teams } from './components/ChessBoard';
import styled from 'styled-components';
import { createInitialPiecePositions } from './helpers/createInitialPiecePositions';
import { Credit } from './components/Credit';

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
  const [whitePiecesData] = useState<PieceData[]>(createInitialPiecePositions('bottom', 'white'));

  const [blackPiecesData] = useState<PieceData[]>(createInitialPiecePositions('top', 'black'));

  const [selectedPiece, setSelectedPiece] = useState<PieceData | undefined>(
    whitePiecesData.find(piece => piece.type === 'knight') || whitePiecesData[0]
  );

  const [currentPlayersTurn] = useState<Teams>('white');

  const handleSetSelectedPiece = (newSelectedPiece: PieceData | undefined): void => {
    if (newSelectedPiece && newSelectedPiece.team === currentPlayersTurn) {
      setSelectedPiece(newSelectedPiece);
    } else {
      setSelectedPiece(undefined);
    }
  };

  return (
    <StyledApp>
      <StyledAppMain>
        <p>Chess?</p>
        <ChessBoard
          whitePieces={whitePiecesData}
          blackPieces={blackPiecesData}
          currentPlayersTurn={currentPlayersTurn}
          whiteSideOfBoard='bottom'
          selectedPiece={selectedPiece}
          setSelectedPiece={handleSetSelectedPiece}
        />
      </StyledAppMain>
      <StyledFooter>
        <Credit />
      </StyledFooter>
    </StyledApp>
  );
};

export default App;
