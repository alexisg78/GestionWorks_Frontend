import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register-page/register-page'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export default AUTH_ROUTES;
