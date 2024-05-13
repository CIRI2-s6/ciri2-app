import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccountService } from '../../../service/data-access/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}
  user = toSignal(this.authService.user$);

  deleteAccount(): void {
    this.accountService.deleteAccount().subscribe((result: any) => {
      console.log(result);
    });
  }
}
