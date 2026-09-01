import { Component, inject } from '@angular/core';
import { TicketList } from '../../components/ticket-list/ticket-list';
import { TicketFilter } from '../../components/ticket-filter/ticket-filter';
import { TicketService } from '../../services/ticket.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ticket-list-page',
  imports: [TicketList, TicketFilter],
  templateUrl: './ticket-list-page.html',
})
export default class TicketListPage {
  ticketService = inject(TicketService);

  ticketsResource = rxResource({
    stream: () => this.ticketService.getTickets(),
  });
}
