import { Component, input } from '@angular/core';
import { TicketCardViewModel } from '../../models/ticket-card.vm';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ticket-card',
  imports: [RouterLink],
  templateUrl: './ticket-card.html',
})
export class TicketCard {
  card = input.required<TicketCardViewModel>();
}
