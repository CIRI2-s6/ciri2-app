import { GameModel, GameShell } from '../gameTypes/game.model';

export interface GameResponse {
  status: string;
  message: string;
  data: { games: GameModel | GameModel[] | GameShell[] };
}
