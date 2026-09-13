import { Priority } from '../enums/priority.enum';

export const PRIORITY_BADGES: Record<Priority, string> = {
  [Priority.high]: 'badge-error',
  [Priority.medium]: 'badge-warning',
  [Priority.low]: 'badge-success',
};
