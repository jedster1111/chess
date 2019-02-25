import React, { FC } from 'react';
import styled from 'styled-components';
import { PieceTypes, Vector } from '../types';
import { ChessPiece } from './ChessPiece';

export type Teams = 'black' | 'white';

export interface PieceData {
  type: PieceTypes;
  position: Vector;
  team: Teams;
}

export interface SquareData {
  bgColor: Teams;
  pieceData?: { type: PieceTypes; team: Teams };
}

interface ChessSquareProps {
  squareData: SquareData;
}

interface ChessGridRowProps {
  squares: SquareData[];
}

interface ChessGridProps {
  pieces?: PieceData[];
}

interface ChessBoardProps {
  pieces?: PieceData[];
}

const StyledChessSquare = styled.div<{ bgColor: Teams }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;
  background-color: ${({ bgColor }) =>
    bgColor === 'black' ? '#202020' : '#F5F5F5'};
`;

const StyledGridRow = styled.div`
  display: flex;
`;

const StyledChessGrid = styled.div`
  border: solid 1px black;
`;

const StyledChessBoard = styled.div`
  padding: 20px;
  border-radius: 5px;
  background-color: #f2eeed;
  border: solid 1px white;
`;

const ChessSquare: FC<ChessSquareProps> = ({ squareData }) => (
  <StyledChessSquare bgColor={squareData.bgColor}>
    {squareData.pieceData && (
      <ChessPiece
        team={squareData.pieceData.team}
        type={squareData.pieceData.type}
      />
    )}
  </StyledChessSquare>
);

const ChessGriddRow: FC<ChessGridRowProps> = props => (
  <StyledGridRow>
    {props.squares.map((square, index) => (
      <ChessSquare squareData={square} key={index} />
    ))}
  </StyledGridRow>
);

const ChessGrid: FC<ChessGridProps> = props => {
  const squares = createSquareData(props.pieces);

  return (
    <StyledChessGrid>
      {squares.map((rowData, index) => (
        <ChessGriddRow squares={rowData} key={index} />
      ))}
    </StyledChessGrid>
  );
};

export const ChessBoard: FC<ChessBoardProps> = props => (
  <StyledChessBoard>
    <ChessGrid pieces={props.pieces} />
  </StyledChessBoard>
);

export function createSquareData(piecesData?: PieceData[]): SquareData[][] {
  const width = 8;
  const height = 8;

  const squares: SquareData[][] = [];

  for (let y = 0; y < height; y++) {
    const row: SquareData[] = [];

    const firstSquareBgColor: Teams = y % 2 === 0 ? 'white' : 'black';

    for (let x = 0; x < width; x++) {
      const bgColor: Teams =
        x % 2 === 0
          ? firstSquareBgColor
          : firstSquareBgColor === 'white'
          ? 'black'
          : 'white';

      row.push({ bgColor });
    }

    squares.push(row);
  }

  if (!piecesData) {
    return squares;
  }

  piecesData.forEach(({ team, type, position }) => {
    const { x, y } = position;

    squares[y - 1][x - 1].pieceData = { type, team };
  });

  return squares;
}
