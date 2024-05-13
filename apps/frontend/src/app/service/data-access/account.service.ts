import { Injectable } from '@angular/core';
import { HttpMethod } from '@auth0/auth0-angular';
import { environment } from 'apps/frontend/src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { paginationToQueryString } from '../../constants/pagination/pagination.model';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  prefix = 'account';
  constructor(private http: HttpClient, private notifier: NotifierService) {}
  deleteAccount(): any {
    return this.http
      .request(HttpMethod.Delete, `${environment.apiUrl}/${this.prefix}`)
      .pipe(
        catchError((error) => {
          this.notifier.notify('error', error.message);
          return throwError(error);
        })
      );
  }
}
