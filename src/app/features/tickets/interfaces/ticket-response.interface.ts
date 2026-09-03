import { UserSummary } from './user-summary.interface';
import { Priority } from '../enums/priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export interface TicketResponse {
  id: string;
  title: string;
  detail: string;
  status: TicketStatus;
  priority: Priority;
  createdBy: UserSummary;
  assignedUser: UserSummary | null;
  images: any[];
}
