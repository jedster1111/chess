import { Teams } from '../components/ChessBoard/ChessBoard';

export function getOppositeTeam(team: Teams): Teams {
  return team === 'black' ? 'white' : 'black';
}
