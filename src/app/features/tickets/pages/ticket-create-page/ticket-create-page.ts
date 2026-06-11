import { Component } from '@angular/core';
import { TicketForm } from '../../components/ticket-form/ticket-form';

@Component({
  selector: 'ticket-create-page',
  imports: [TicketForm],
  templateUrl: './ticket-create-page.html',
})
export default class TicketCreatePage {}
