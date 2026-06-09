import { Routes } from '@angular/router';

export const TICKETS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tickets-page/tickets-page'),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/ticket-create-page/ticket-create-page'),
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/ticket-list-page/ticket-list-page'),
  },
  {
    path: 'my-tickets',
    loadComponent: () => import('./pages/ticket-list-page/ticket-list-page'),
  },
  {
    path: 'open',
    loadComponent: () => import('./pages/ticket-list-page/ticket-list-page'),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/ticket-detail-page/ticket-detail-page'),
  },
];
