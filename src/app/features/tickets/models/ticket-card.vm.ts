export interface TicketCardViewModel {
  id: string;
  title: string;
  subtitle: string;
  actionLabel: string;
  actionRoute: string;
  actionVariant: ButtonVariant;
}

export type ButtonVariant =
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-accent'
  | 'btn-success'
  | 'btn-info'
  | 'btn-warning'
  | 'btn-error';
