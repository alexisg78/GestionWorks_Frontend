import { Component, inject } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { TicketRequest } from '../../interfaces/ticket-request.interface';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { Priority } from '../../enums/priority.enum';
import { STATUS_LABELS } from '../../constants/status-labels';
import { PRIORITY_LABELS } from '../../constants/priority-labels';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import { finalize } from 'rxjs';

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
  isCreating = false;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly ticketService = inject(TicketService);
  private readonly alertService = inject(AlertService);

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

    this.ticketService
      .createTicket(request)
      .pipe(finalize(() => (this.isCreating = false)))
      .subscribe({
        next: () => {
          this.alertService.success('Ticket creado correctamente!');
          this.clear();
        },
        error: () => {
          this.alertService.error('No se pudo crear el ticket');
        },
      });
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
