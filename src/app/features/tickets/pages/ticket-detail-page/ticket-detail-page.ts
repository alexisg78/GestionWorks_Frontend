import { Component, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { PRIORITY_LABELS } from '../../constants/priority-labels';
import { PRIORITY_BADGES } from '../../constants/priority-badges';
import { STATUS_BADGES } from '../../constants/status-badges';
import { STATUS_LABELS } from '../../constants/status-labels';
import { TicketStore } from '../../services/ticket.store';

@Component({
  selector: 'ticket-detail-page',
  imports: [RouterLink, DatePipe, TimeAgoPipe, NgClass],
  templateUrl: './ticket-detail-page.html',
})
export default class TicketDetailPage {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly paramID = this.activatedRoute.snapshot.paramMap.get('id');

  private readonly ticketStore = inject(TicketStore);

  readonly priorityLabels = PRIORITY_LABELS;
  readonly priorityBadges = PRIORITY_BADGES;
  readonly statusLabels = STATUS_LABELS;
  readonly statusBadges = STATUS_BADGES;

  ticketResource = rxResource({
    stream: () => this.ticketStore.getTicket(this.paramID!),
  });
}
