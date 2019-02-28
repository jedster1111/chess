import React, { FC } from 'react';
import { SquareData, PieceData } from './ChessBoard';
import { createSquareData } from './createSquareData';
import { ChessGriddRow } from './ChessGriddRow';
import { GameData } from '../../App';
import { ValidMoveData } from '../../helpers/valid_moves/calculateValidMoves';
import styled from 'styled-components';

interface ChessGridProps {
  gameData: GameData;
  handleSquareclick: (squareData: SquareData) => void;
  validMoves?: ValidMoveData[];
  selectedPiece?: PieceData;
}

const StyledChessGrid = styled.div`
  border: solid 1px black;
`;

export const ChessGrid: FC<ChessGridProps> = props => {
  const { selectedPiece, gameData, handleSquareclick, validMoves } = props;
  const squares = createSquareData([...gameData.pieces.black, ...gameData.pieces.white], validMoves, selectedPiece);
  return (
    <StyledChessGrid>
      {squares.map((rowData, index) => (
        <ChessGriddRow squares={rowData} key={index} handleSquareclick={handleSquareclick} />
      ))}
    </StyledChessGrid>
  );
};
