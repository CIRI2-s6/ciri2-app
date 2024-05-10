import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { AutoCompleteComponent } from '../../../components/inputs/auto-complete/auto-complete.component';
import { GameService } from '../../../service/data-access/game.service';
import { debounceTime, map, Subject } from 'rxjs';
import { GameShell } from '../../../constants/gameTypes/game.model';
import { Router } from '@angular/router';
import { GameOverviewComponent } from '../../game/game-overview/game-overview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AutoCompleteComponent, GameOverviewComponent],
  providers: [],
  templateUrl: `./home.component.html`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}
  options = signal<{ key: string; value: string }[]>([]);
  searchSubject: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.searchGame(query);
    });
  }

  searchGame(gameName: string): void {
    this.gameService
      .searchGame(gameName)
      .pipe(
        map((games) => {
          const shells = games.data.games as GameShell[];
          return shells.map((shell) => ({
            key: String(shell.steam_appid),
            value: shell.name,
          }));
        })
      )
      .subscribe((response) => {
        this.options.set(response);
      });
  }

  selectGame(id: string): void {
    console.log(id);
    this.router.navigate([`game/${id}`]);
  }
}
