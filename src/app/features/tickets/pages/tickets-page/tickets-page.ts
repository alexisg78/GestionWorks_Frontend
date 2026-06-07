import { Component, signal } from '@angular/core';
import { TicketCard } from '../../components/ticket-card/ticket-card';
import { TicketCardViewModel } from '../../models/ticket-card.vm';

const TICKET_CARDS: TicketCardViewModel[] = [
  {
    id: 'new-ticket',
    title: 'Crear Ticket',
    subtitle: 'Registrar una nueva incidencia.',
    actionLabel: 'Abrir',
    actionRoute: '/tickets/new',
    actionVariant: 'btn-primary',
  },
  {
    id: 'ticket-list',
    title: 'Listado',
    subtitle: 'Consultar todos los tickets.',
    actionLabel: 'Ver',
    actionRoute: '/tickets',
    actionVariant: 'btn-secondary',
  },
  {
    id: 'my-tickets',
    title: 'Mis Tickets',
    subtitle: 'Consultar tickets asignados.',
    actionLabel: 'Ver',
    actionRoute: '/tickets',
    actionVariant: 'btn-accent',
  },
  {
    id: 'open-ticket',
    title: 'Mis Tickets',
    subtitle: 'Consultar tickets asignados.',
    actionLabel: 'Ver',
    actionRoute: '/tickets',
    actionVariant: 'btn-info',
  },
];

@Component({
  selector: 'tickets-page',
  imports: [TicketCard],
  templateUrl: './tickets-page.html',
})
export default class TicketsPage {
  cards = signal<TicketCardViewModel[]>(TICKET_CARDS);
}
