import { TicketStatus } from '../enums/ticket-status.enum';

export const STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'Abierto',
  [TicketStatus.IN_PROGRESS]: 'En progreso',
  [TicketStatus.CLOSSED]: 'Cerrado',
  [TicketStatus.ABORTED]: 'Abortado',
};
