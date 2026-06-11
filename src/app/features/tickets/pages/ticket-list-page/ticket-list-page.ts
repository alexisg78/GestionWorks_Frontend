import { Component } from '@angular/core';
import { TicketList } from '../../components/ticket-list/ticket-list';

@Component({
  selector: 'ticket-list-page',
  imports: [TicketList],
  templateUrl: './ticket-list-page.html',
})
export default class TicketListPage {}
