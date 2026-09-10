import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketService } from '../../services/ticket.service';
import { PRIORITY_LABELS } from '../../constants/priority-labels';
import { STATUS_LABELS } from '../../constants/status-labels';

@Component({
  selector: 'ticket-detail-page',
  imports: [RouterLink, DatePipe],
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

  getTimeAgo(date: string | Date): string {
    const createdAt = new Date(date);
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Hace unos segundos';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
  }
}
