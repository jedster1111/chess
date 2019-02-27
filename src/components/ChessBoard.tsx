import React, { FC } from 'react';
import styled from 'styled-components';
import { PieceTypes, Vector, SideOfBoard } from '../types';
import { ChessPiece } from './ChessPiece';
import { ValidMoveData, calculateValidMoves } from '../helpers/valid_moves/calculateValidMoves';
import { areVectorsEqual, createVector } from '../helpers/vector';

export type Teams = 'black' | 'white';

enum ChessBoardColors {
  'dark' = '#8B3626',
  'light' = '#fff6e8'
}

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

interface ChessSquareProps {
  squareData: SquareData;
  onClick: () => void;
}

interface ChessGridRowProps {
  squares: SquareData[];
  setSelectedPiece: (newSelectedSquare: PieceData | undefined) => void;
}

interface ChessGridProps {
  whitePieces: PieceData[];
  blackPieces: PieceData[];
  currentPlayersTurn: Teams;
  whiteSideOfBoard: SideOfBoard;
  selectedPiece?: PieceData;
  setSelectedPiece: (newSelectedSquare: PieceData | undefined) => void;
}

interface ChessBoardProps {
  whitePieces: PieceData[];
  blackPieces: PieceData[];
  currentPlayersTurn: Teams;
  whiteSideOfBoard: SideOfBoard;
  selectedPiece?: PieceData;
  setSelectedPiece: (newSelectedSquare: PieceData | undefined) => void;
}

const StyledChessSquare = styled.div<{
  bgColor: Teams;
  isValidMoveSquare: boolean;
  isEnemyPieceInSquare: boolean;
  isSelectedSquare: boolean;
}>`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;

  padding: 3px;

  background-color: ${({ bgColor }) => (bgColor === 'black' ? ChessBoardColors.dark : ChessBoardColors.light)};

  border: ${({ isValidMoveSquare, isSelectedSquare, isEnemyPieceInSquare }) => {
    if (isValidMoveSquare) {
      if (isEnemyPieceInSquare) {
        return 'solid 5px red';
      } else {
        return 'solid 5px black';
      }
    } else if (isSelectedSquare) {
      return 'solid 5px blue';
    }

    return undefined;
  }};
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

const ChessSquare: FC<ChessSquareProps> = ({ squareData, onClick }) => (
  <StyledChessSquare {...squareData} onClick={onClick}>
    {squareData.pieceData && <ChessPiece team={squareData.pieceData.team} type={squareData.pieceData.type} />}
  </StyledChessSquare>
);

const ChessGriddRow: FC<ChessGridRowProps> = props => (
  <StyledGridRow>
    {props.squares.map((square, index) => {
      const { pieceData } = square;
      const handleClick = pieceData ? () => props.setSelectedPiece(pieceData) : () => props.setSelectedPiece(undefined);

      return <ChessSquare squareData={square} key={index} onClick={handleClick} />;
    })}
  </StyledGridRow>
);

const ChessGrid: FC<ChessGridProps> = props => {
  const { selectedPiece, currentPlayersTurn, blackPieces, whitePieces, whiteSideOfBoard } = props;

  const validMovesData = selectedPiece
    ? calculateValidMoves(selectedPiece, {
        currentPlayersTurn,
        pieces: { black: blackPieces, white: whitePieces },
        whiteSideOfBoard
      })
    : undefined;

  const squares = createSquareData([...props.blackPieces, ...props.whitePieces], validMovesData, selectedPiece);

  console.debug(validMovesData);
  console.debug(squares);

  return (
    <StyledChessGrid>
      {squares.map((rowData, index) => (
        <ChessGriddRow squares={rowData} key={index} setSelectedPiece={props.setSelectedPiece} />
      ))}
    </StyledChessGrid>
  );
};

export const ChessBoard: FC<ChessBoardProps> = props => (
  <StyledChessBoard>
    <ChessGrid {...props} />
  </StyledChessBoard>
);

export function createSquareData(
  piecesData?: PieceData[],
  validMovesData?: ValidMoveData[],
  selectedPiece?: PieceData
): SquareData[][] {
  const width = 8;
  const height = 8;

  const squares: SquareData[][] = [];

  for (let y = 0; y < height; y++) {
    const row: SquareData[] = [];

    const firstSquareBgColor: Teams = y % 2 === 0 ? 'white' : 'black';

    for (let x = 0; x < width; x++) {
      const bgColor: Teams = x % 2 === 0 ? firstSquareBgColor : firstSquareBgColor === 'white' ? 'black' : 'white';

      const isSelectedSquare = selectedPiece
        ? areVectorsEqual(createVector(x + 1, y + 1), selectedPiece.position)
        : false;

      row.push({ bgColor, isValidMoveSquare: false, isSelectedSquare, isEnemyPieceInSquare: false });
    }

    squares.push(row);
  }

  if (!piecesData) {
    return squares;
  }

  piecesData.forEach(pieceData => {
    const { x, y } = pieceData.position;

    squares[y - 1][x - 1].pieceData = pieceData;
  });

  if (validMovesData) {
    validMovesData.forEach(({ position: { x, y }, isEnemyPieceInSquare }) => {
      squares[y - 1][x - 1].isValidMoveSquare = true;
      squares[y - 1][x - 1].isEnemyPieceInSquare = isEnemyPieceInSquare;
    });
  }

  return squares;
}
