import { Priority } from '../enums/priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export interface TicketRequest {
  title: string;
  detail: string;
  status?: TicketStatus;
  priority: Priority;
  assignedUserId?: string;
  images?: string[];
}
