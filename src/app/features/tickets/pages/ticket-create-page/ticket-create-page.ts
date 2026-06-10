import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicketForm } from '../../components/ticket-form/ticket-form';

@Component({
  selector: 'app-ticket-create-page',
  imports: [TicketForm],
  templateUrl: './ticket-create-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TicketCreatePage {}
