import { Component, inject, signal } from '@angular/core';
import { TicketList } from '../../components/ticket-list/ticket-list';
import { TicketFilter } from '../../components/ticket-filter/ticket-filter';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketStore } from '../../services/ticket.store';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { Priority } from '../../enums/priority.enum';

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

  readonly searchText = signal('');
  readonly statusText = signal<TicketStatus | undefined>(undefined);
  readonly priorityText = signal<Priority | undefined>(undefined);

  onSearchChange(value: string) {
    this.searchText.set(value);
  }

  onStatusChange(status: TicketStatus | undefined) {
    this.statusText.set(status);
  }

  onPriorityChange(priority: Priority | undefined) {
    this.priorityText.set(priority);
  }
}
