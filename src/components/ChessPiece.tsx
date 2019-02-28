import React, { FC } from 'react';
import { Teams } from './ChessBoard/ChessBoard';
import { PieceTypes } from '../types';
import { ReactComponent as King } from '../chess_svg/king.svg';
import { ReactComponent as Queen } from '../chess_svg/queen.svg';
import { ReactComponent as Bishop } from '../chess_svg/bishop.svg';
import { ReactComponent as Knight } from '../chess_svg/knight.svg';
import { ReactComponent as Pawn } from '../chess_svg/pawn.svg';
import { ReactComponent as Rook } from '../chess_svg/rook.svg';
import styled from 'styled-components';

interface ChessPieceProps {
  team: Teams;
  type: PieceTypes;
}

const StyledChessPieceWrapper = styled.div<{ pieceType: PieceTypes }>`
  display: block;

  width: ${({ pieceType }) => (pieceType === 'pawn' ? '70%' : '100%')};
`;

export const ChessPiece: FC<ChessPieceProps> = ({ team, type }) => {
  const chessPiece = getChessPiece(team, type);

  return (
    <StyledChessPieceWrapper pieceType={type} draggable={true}>
      {chessPiece}
    </StyledChessPieceWrapper>
  );
};

function getChessPiece(team: Teams, type: PieceTypes): JSX.Element {
  const pieceColor = team === 'black' ? 'black' : 'white';
  const pieceBordercolor = team === 'black' ? 'white' : 'black';
  const props = {
    fill: pieceColor,
    stroke: pieceBordercolor,
    strokeWidth: 5,
    style: { display: 'block' },
  };

  switch (type) {
    case 'king':
      return <King {...props} />;
    case 'queen':
      return <Queen {...props} />;
    case 'bishop':
      return <Bishop {...props} />;
    case 'knight':
      return <Knight {...props} />;
    case 'rook':
      return <Rook {...props} />;
    case 'pawn':
      return <Pawn {...props} />;
  }
}
