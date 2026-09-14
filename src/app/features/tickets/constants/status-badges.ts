import { TicketStatus } from '../enums/ticket-status.enum';

export const STATUS_BADGES: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'badge-outline badge-info',
  [TicketStatus.IN_PROGRESS]: 'badge-outline badge-warning',
  [TicketStatus.CLOSED]: 'badge-outline badge-success',
  [TicketStatus.ABORTED]: 'badge-outline badge-error',
};
