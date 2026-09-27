import { Component, inject, output, signal } from '@angular/core';
import { PRIORITY_LABELS } from '../../constants/priority-labels';
import { STATUS_LABELS } from '../../constants/status-labels';
import { Priority } from '../../enums/priority.enum';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { TicketStore } from '../../services/ticket.store';
import { TicketResponse } from '../../interfaces/ticket-response.interface';

@Component({
  selector: 'ticket-filter',
  imports: [],
  templateUrl: './ticket-filter.html',
})
export class TicketFilter {
  readonly priority = Priority;
  readonly priorityLabels = PRIORITY_LABELS;
  readonly priorities = Object.values(Priority);

  readonly ticketStatus = TicketStatus;
  readonly statusLabels = STATUS_LABELS;
  readonly statuses = Object.values(TicketStatus);

  private readonly ticketsStore = inject(TicketStore);
  readonly tickets: TicketResponse[] = this.ticketsStore.tickets();

  readonly searchChange = output<string>();
  readonly statusChange = output<TicketStatus | undefined>();
  readonly priorityChange = output<Priority | undefined>();

  onStatusChange(value: string) {
    const status = value ? (value as TicketStatus) : undefined;

    this.statusChange.emit(status);
  }

  onPriorityChange(value: string) {
    const priority = value ? (value as Priority) : undefined;

    this.priorityChange.emit(priority);
  }
}
