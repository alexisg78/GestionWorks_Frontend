import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ticket-detail-page',
  imports: [RouterLink],
  templateUrl: './ticket-detail-page.html',
})
export default class TicketDetailPage {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly paramID = this.activatedRoute.snapshot.paramMap.get('id');

  private readonly ticketService = inject(TicketService);

  ticketResource = rxResource({
    stream: () => this.ticketService.getTicket(this.paramID!),
  });
}
