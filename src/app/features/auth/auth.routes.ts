import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
