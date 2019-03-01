import { SideOfBoard } from '../types';

export function getOppositeSideOfBoard(whiteSideOfBoard: SideOfBoard): SideOfBoard {
  return whiteSideOfBoard === 'bottom' ? 'top' : 'bottom';
}
