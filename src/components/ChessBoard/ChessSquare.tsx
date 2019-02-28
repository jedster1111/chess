import React, { FC } from 'react';
import { ChessPiece } from '../ChessPiece';
import { SquareData, Teams } from './ChessBoard';
import styled from 'styled-components';

enum ChessBoardColors {
  'dark' = '#8B3626',
  'light' = '#fff6e8',
}

type SquareType = 'selectedSquare' | 'validMoveSquare' | 'validEnemyMoveSquare';

export interface ChessSquareProps {
  squareData: SquareData;
  handleSquareclick: (squareData: SquareData) => void;
}

export const StyledChessSquare = styled.div<{
  bgColor: Teams;
  squareType?: SquareType;
}>`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;

  padding: 3px;

  background-color: ${({ bgColor }) => (bgColor === 'black' ? ChessBoardColors.dark : ChessBoardColors.light)};

  border: ${({ squareType }) => {
    switch (squareType) {
      case 'selectedSquare':
        return 'solid 5px blue';

      case 'validMoveSquare':
        return 'solid 5px black';

      case 'validEnemyMoveSquare':
        return 'solid 5px red';

      default:
        return undefined;
    }
  }};
`;

export const ChessSquare: FC<ChessSquareProps> = ({ squareData, handleSquareclick }) => {
  const { isEnemyPieceInSquare, isSelectedSquare, isValidMoveSquare } = squareData;

  const onClick = () => handleSquareclick(squareData);
  const squareType = calculateSquareType(isEnemyPieceInSquare, isValidMoveSquare, isSelectedSquare);
  return (
    <StyledChessSquare bgColor={squareData.bgColor} onClick={onClick} squareType={squareType}>
      {squareData.pieceData && <ChessPiece team={squareData.pieceData.team} type={squareData.pieceData.type} />}
    </StyledChessSquare>
  );
};

function calculateSquareType(
  isEnemyPieceInSquare: boolean,
  isValidMoveSquare: boolean,
  isSelectedSquare: boolean,
): SquareType | undefined {
  if (isValidMoveSquare && isEnemyPieceInSquare) {
    return 'validEnemyMoveSquare';
  }

  if (isValidMoveSquare) {
    return 'validMoveSquare';
  }

  if (isSelectedSquare) {
    return 'selectedSquare';
  }

  return undefined;
}
