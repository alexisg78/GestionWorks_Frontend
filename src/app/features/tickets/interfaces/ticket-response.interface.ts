export interface TicketResponse {
  id: string;
  title: string;
  detail: string;
  status: string;
  priority: string;
  createdBy: CreatedBy;
  assignedUser: CreatedBy | null;
  images: any[];
}

export interface CreatedBy {
  id: string;
  fullName: string;
}
