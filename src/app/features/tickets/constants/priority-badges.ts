import { Priority } from '../enums/priority.enum';

export const PRIORITY_BADGES: Record<Priority, string> = {
  [Priority.high]: 'badge-outline badge-error',
  [Priority.medium]: 'badge-outline badge-warning',
  [Priority.low]: 'badge-outline badge-success',
};
