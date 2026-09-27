import { Pipe, type PipeTransform } from '@angular/core';

import { Priority } from '../enums/priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketResponse } from '../interfaces/ticket-response.interface';

@Pipe({
  name: 'ticketFilter',
})
export class TicketFilterPipe implements PipeTransform {
  transform(
    tickets: TicketResponse[],
    search: string,
    status?: TicketStatus,
    priority?: Priority,
  ): TicketResponse[] {
    const normalizedSearch = search.trim().toLocaleLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        !normalizedSearch ||
        ticket.title.toLocaleLowerCase().includes(normalizedSearch) ||
        ticket.createdBy.fullName.toLocaleLowerCase().includes(normalizedSearch);

      const matchesStatus = !status || ticket.status === status;

      const matchesPriority = !priority || ticket.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }
}
