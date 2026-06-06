import { Routes } from '@angular/router';

export const TICKETS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tickets-page/tickets-page'),
  },
];
