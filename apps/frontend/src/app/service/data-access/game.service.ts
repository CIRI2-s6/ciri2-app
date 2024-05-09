/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { HttpMethod } from '@auth0/auth0-angular';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GameResponse } from '../../constants/responseTypes/game.response';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient, private notifier: NotifierService) {}

  prefix = 'game';

  searchGame(gameName: string): Observable<GameResponse> {
    return this.http
      .request(
        HttpMethod.Get,
        `${environment.apiUrl}/${this.prefix}/name/${gameName}`
      )
      .pipe(
        catchError((error) => {
          this.notifier.notify('error', error.message);
          return throwError(error);
        }),
        map(
          (response: any) =>
            ({
              status: response.status,
              message: response.message,
              data: {
                games: response.data.data,
              },
            } as GameResponse)
        )
      );
  }

  findGameById(id: string): Observable<GameResponse> {
    return this.http
      .request(HttpMethod.Get, `${environment.apiUrl}/${this.prefix}/${id}`)
      .pipe(
        catchError((error) => {
          this.notifier.notify('error', error.message);
          return throwError(error);
        }),
        map(
          (response: any) =>
            ({
              status: response.status,
              message: response.message,
              data: {
                games: response.data.data,
              },
            } as GameResponse)
        )
      );
  }
}
