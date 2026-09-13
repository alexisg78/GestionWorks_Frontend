import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketResponse } from '../../interfaces/ticket-response.interface';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { PRIORITY_LABELS } from '../../constants/priority-labels';
import { PRIORITY_BADGES } from '../../constants/priority-badges';
import { STATUS_BADGES } from '../../constants/status-badges';
import { STATUS_LABELS } from '../../constants/status-labels';

@Component({
  selector: 'ticket-list',
  imports: [RouterLink, TimeAgoPipe, NgClass],
  templateUrl: './ticket-list.html',
})
export class TicketList {
  tickets = input<TicketResponse[] | []>([]);

  readonly priorityLabels = PRIORITY_LABELS;
  readonly priorityBadges = PRIORITY_BADGES;
  readonly statusLabels = STATUS_LABELS;
  readonly statusBadges = STATUS_BADGES;
}
