import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../service/data-access/game.service';
import { GameModel } from '../../../constants/gameTypes/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-overview.component.html',
})
export class GameOverviewComponent implements OnInit {
  games = signal<GameModel[]>([]);
  page = 1;
  limit = 15;

  constructor(private gameService: GameService, private router: Router) {}
  ngOnInit(): void {
    this.gameService.getGames(this.page, this.limit).subscribe((games) => {
      console.log(games);
      this.games.set(games.data.games as GameModel[]);
    });
  }

  navigate(id: number): void {
    console.log(id);
    this.router.navigate([`game/${id}`]);
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const element = document.documentElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      console.log('bottom');
      this.page++;
      this.gameService.getGames(this.page, this.limit).subscribe((games) => {
        console.log(games);
        this.games.update((prev) => {
          return [...prev, ...(games.data.games as GameModel[])];
        });
      });
    }
  }
}
