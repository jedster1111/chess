import React, { FC } from 'react';
import { Teams } from './ChessBoard';
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

const StyledChessPieceWrapper = styled.div`
  display: block;

  width: 50px;
  /* height: 50px; */
`;

export const ChessPiece: FC<ChessPieceProps> = ({ team, type }) => {
  const chessPiece = getChessPiece(team, type);

  return <StyledChessPieceWrapper>{chessPiece}</StyledChessPieceWrapper>;
};

function getChessPiece(team: Teams, type: PieceTypes): JSX.Element {
  const pieceColor = team === 'black' ? 'black' : 'white';
  const props = { fill: pieceColor, style: { display: 'block' } };

  switch (type) {
    case PieceTypes.K:
      return <King {...props} />;
    case PieceTypes.Q:
      return <Queen {...props} />;
    case PieceTypes.B:
      return <Bishop {...props} />;
    case PieceTypes.N:
      return <Knight {...props} />;
    case PieceTypes.R:
      return <Rook {...props} />;
    case PieceTypes.P:
      return <Pawn {...props} />;
  }
}
