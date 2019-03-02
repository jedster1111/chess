import { Action } from '../../types';

export type squareClickActions = MovePieceToSquareAction | ChangeSelectedPieceAction | DeselectPieceAction;

export enum SquareClickTypes {
  movePieceToSquare = 'movePieceToSquare',
  takeEnemyPiece = 'takeEnemyPiece',
  changeSelectedPiece = 'changeSelectedPiece',
  deselectPiece = 'deselectPiece',
}

type MovePieceToSquareAction = Action<SquareClickTypes.movePieceToSquare>;

type ChangeSelectedPieceAction = Action<SquareClickTypes.changeSelectedPiece>;

type DeselectPieceAction = Action<SquareClickTypes.deselectPiece>;
