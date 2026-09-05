import { Component } from '@angular/core';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { Priority } from '../../enums/priority.enum';
import { STATUS_LABELS } from '../../constants/status-labels';
import { PRIORITY_LABELS } from '../../constants/priority-labels';

@Component({
  selector: 'ticket-form',
  imports: [],
  templateUrl: './ticket-form.html',
})
export class TicketForm {
  readonly priority = Priority;
  readonly priorityLabels = PRIORITY_LABELS;
  readonly priorities = Object.values(Priority);

  readonly ticketStatus = TicketStatus;
  readonly statusLabels = STATUS_LABELS;
  readonly statuses = Object.values(TicketStatus);
}
