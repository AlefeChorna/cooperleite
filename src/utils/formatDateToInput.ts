import { format, parseISO } from 'date-fns';

export default function formatDateToInput(
  date: string,
  formatTo = 'dd/mm/yyyy',
): string {
  if (!date) return '';

  const parsedDate = parseISO(date);

  return format(parsedDate, formatTo);
}
