export type PieceTypes = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export type SideOfBoard = 'top' | 'bottom';

export interface Vector {
  x: number;
  y: number;
}

export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}
