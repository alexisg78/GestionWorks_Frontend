import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketService } from '../../services/ticket.service';
import { PRIORITY_LABELS } from '../../constants/priority-labels';
import { STATUS_LABELS } from '../../constants/status-labels';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'ticket-detail-page',
  imports: [RouterLink, DatePipe, TimeAgoPipe],
  templateUrl: './ticket-detail-page.html',
})
export default class TicketDetailPage {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly paramID = this.activatedRoute.snapshot.paramMap.get('id');
  private readonly ticketService = inject(TicketService);
  readonly priorityLabels = PRIORITY_LABELS;
  readonly statusLabels = STATUS_LABELS;

  ticketResource = rxResource({
    stream: () => this.ticketService.getTicket(this.paramID!),
  });
}
