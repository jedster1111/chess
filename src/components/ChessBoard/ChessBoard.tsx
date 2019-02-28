import React, { FC } from 'react';
import styled from 'styled-components';
import { PieceTypes, Vector } from '../../types';
import { ValidMoveData } from '../../helpers/valid_moves/calculateValidMoves';
import { GameData } from '../../App';
import { ChessGrid } from './ChessGrid';

export type Teams = 'black' | 'white';

export interface PieceData {
  type: PieceTypes;
  position: Vector;
  team: Teams;
  hasMoved: boolean;
}

export interface SquareData {
  bgColor: Teams;
  pieceData?: PieceData;
  isValidMoveSquare: boolean;
  isEnemyPieceInSquare: boolean;
  isSelectedSquare: boolean;
}

interface ChessBoardProps {
  gameData: GameData;
  handleSquareclick: (squareData: SquareData) => void;
  validMoves?: ValidMoveData[];
  selectedPiece?: PieceData;
}

const StyledChessBoard = styled.div`
  padding: 20px;
  border-radius: 5px;
  background-color: #f2eeed;
  border: solid 1px white;
`;

export const ChessBoard: FC<ChessBoardProps> = props => (
  <StyledChessBoard>
    <ChessGrid {...props} />
  </StyledChessBoard>
);
