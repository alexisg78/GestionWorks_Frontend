import { Component, inject } from '@angular/core';
import { TicketList } from '../../components/ticket-list/ticket-list';
import { TicketFilter } from '../../components/ticket-filter/ticket-filter';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketStore } from '../../services/ticket.store';

@Component({
  selector: 'ticket-list-page',
  imports: [TicketList, TicketFilter],
  templateUrl: './ticket-list-page.html',
})
export default class TicketListPage {
  private readonly ticketStore = inject(TicketStore);

  readonly ticketsResource = rxResource({
    stream: () => this.ticketStore.loadTickets(),
  });
}
