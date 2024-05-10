import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../../service/data-access/game.service';
import { GameModel } from '../../../constants/gameTypes/game.model';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-detail.page.html',
  styleUrl: './game-detail.page.css',
})
export class GameDetailPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  game = signal<GameModel | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.gameService.findGameById(id).subscribe((game) => {
      console.log(game);
      this.game.set(game.data.games as GameModel);
    });
  }
}
