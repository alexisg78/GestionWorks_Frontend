import { Priority } from '../enums/priority.enum';

export const PRIORITY_LABELS: Record<Priority, string> = {
  [Priority.high]: 'Alta',
  [Priority.medium]: 'Media',
  [Priority.low]: 'Baja',
};
