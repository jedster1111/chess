import React, { FC } from 'react';
import { SquareData } from './ChessBoard';
import { ChessSquare } from './ChessSquare';
import styled from 'styled-components';

export interface ChessGridRowProps {
  squares: SquareData[];
  handleSquareclick: (squareData: SquareData) => void;
}

export const StyledGridRow = styled.div`
  display: flex;
`;

export const ChessGriddRow: FC<ChessGridRowProps> = props => (
  <StyledGridRow>
    {props.squares.map((square, index) => {
      return <ChessSquare squareData={square} key={index} handleSquareclick={props.handleSquareclick} />;
    })}
  </StyledGridRow>
);
