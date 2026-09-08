import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketResponse } from '../../interfaces/ticket-response.interface';
import { PRIORITY_LABELS } from '../../constants/priority-labels';
import { STATUS_LABELS } from '../../constants/status-labels';

@Component({
  selector: 'ticket-list',
  imports: [RouterLink],
  templateUrl: './ticket-list.html',
})
export class TicketList {
  tickets = input<TicketResponse[] | []>([]);

  readonly priorityLabels = PRIORITY_LABELS;
  readonly statusLabels = STATUS_LABELS;
}
