import { Component } from '@angular/core';
import { TicketList } from '../../components/ticket-list/ticket-list';
import { TicketFilter } from '../../components/ticket-filter/ticket-filter';

@Component({
  selector: 'ticket-list-page',
  imports: [TicketList, TicketFilter],
  templateUrl: './ticket-list-page.html',
})
export default class TicketListPage {}
