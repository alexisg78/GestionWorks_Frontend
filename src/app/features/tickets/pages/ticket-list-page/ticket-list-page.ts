import { Component, inject, signal } from '@angular/core';
import { TicketList } from '../../components/ticket-list/ticket-list';
import { TicketFilter } from '../../components/ticket-filter/ticket-filter';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketStore } from '../../services/ticket.store';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { Priority } from '../../enums/priority.enum';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'ticket-list-page',
  imports: [TicketList, TicketFilter, Pagination],
  templateUrl: './ticket-list-page.html',
})
export default class TicketListPage {
  readonly ticketStore = inject(TicketStore);
  readonly paginationService = inject(PaginationService);

  readonly ticketsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
    }),
    stream: ({ params }) => this.ticketStore.loadTickets(params.page),
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
