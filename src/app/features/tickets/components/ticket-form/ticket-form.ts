import { Component, inject } from '@angular/core';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { Priority } from '../../enums/priority.enum';
import { STATUS_LABELS } from '../../constants/status-labels';
import { PRIORITY_LABELS } from '../../constants/priority-labels';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketRequest } from '../../interfaces/ticket-request.interface';

@Component({
  selector: 'ticket-form',
  imports: [ReactiveFormsModule],
  templateUrl: './ticket-form.html',
})
export class TicketForm {
  readonly priority = Priority;
  readonly priorityLabels = PRIORITY_LABELS;
  readonly priorities = Object.values(Priority);

  readonly ticketStatus = TicketStatus;
  readonly statusLabels = STATUS_LABELS;
  readonly statuses = Object.values(TicketStatus);

  private readonly fb = inject(NonNullableFormBuilder);

  readonly ticketForm = this.fb.group({
    title: this.fb.control('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(150),
    ]),
    detail: this.fb.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(5000),
    ]),
    status: this.fb.control<TicketStatus | undefined>(this.ticketStatus.OPEN),
    priority: this.fb.control<Priority>(Priority.low, Validators.required),
  });

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const value = this.ticketForm.getRawValue();

    const request: TicketRequest = {
      title: value.title,
      detail: value.detail,
      priority: value.priority,
      status: value.status,
    };

    // TODO: Llamar al metodo create del service
  }

  clear() {
    this.ticketForm.reset({
      title: '',
      status: TicketStatus.OPEN,
      priority: Priority.low,
      detail: '',
    });
  }
}
