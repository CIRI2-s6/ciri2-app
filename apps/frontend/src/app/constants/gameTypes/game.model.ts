export interface GameModel {
  steam_appid: number;
  name: string;
  about_the_game: string;
  header_image: string;
  developers: string[];
  publishers: string[];
}

export interface GameShell {
  steam_appid: number;
  name: string;
}
