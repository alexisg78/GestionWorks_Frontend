import { Component, input } from '@angular/core';
import { TicketCardViewModel } from '../../models/ticket-card.vm';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ticket-card',
  imports: [NgClass],
  templateUrl: './ticket-card.html',
})
export class TicketCard {
  card = input.required<TicketCardViewModel>();
}
