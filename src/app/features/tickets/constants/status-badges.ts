import { TicketStatus } from '../enums/ticket-status.enum';

export const STATUS_BADGES: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'badge-info',
  [TicketStatus.IN_PROGRESS]: 'badge-warning',
  [TicketStatus.CLOSED]: 'badge-success',
  [TicketStatus.ABORTED]: 'badge-error',
};
