import { Component, input } from '@angular/core';
import { TicketResponse } from '../../interfaces/ticket-response.interface';

@Component({
  selector: 'ticket-list',
  imports: [],
  templateUrl: './ticket-list.html',
})
export class TicketList {
  tickets = input<TicketResponse[] | []>([]);
}
