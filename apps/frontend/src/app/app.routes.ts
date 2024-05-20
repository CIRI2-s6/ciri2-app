import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { PermissionGuard } from './service/guards/permission/permission.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'components',
    loadComponent: () =>
      import(
        './pages/components/component-overview/component-overview.component'
      ).then((m) => m.ComponentOverviewComponent),
    data: {
      roles: ['admin'],
    },
  },
  {
    path: 'components/create',
    loadComponent: () =>
      import(
        './pages/components/component-create/component-create.component'
      ).then((m) => m.ComponentCreateComponent),
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      roles: ['admin'],
    },
  },
  {
    path: 'game/:id',
    loadComponent: () =>
      import('./pages/game/game-detail/game-detail.page').then(
        (m) => m.GameDetailPage
      ),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/auth/account/account.component').then(
        (m) => m.AccountComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.page').then(
        (m) => m.PrivacyPolicyPage
      ),
  },
];
