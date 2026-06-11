import { Component } from '@angular/core';
import { TicketFilter } from '../ticket-filter/ticket-filter';

@Component({
  selector: 'ticket-list',
  imports: [TicketFilter],
  templateUrl: './ticket-list.html',
})
export class TicketList {}
