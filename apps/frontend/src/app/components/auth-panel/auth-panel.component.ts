import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './auth-panel.component.html',
})
export class AuthPanelComponent {
  constructor(private authService: AuthService) {}
  isDropdownOpen = false;
  user = toSignal(this.authService.user$);

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
