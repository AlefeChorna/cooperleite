import { parse } from 'date-fns';

export default function formatDateToISO(
  date: string,
  format = 'dd/mm/yyyy',
): string {
  if (!date) return '';

  try {
    const parsedDate = parse(date, format, new Date());

    return parsedDate.toISOString();
  } catch {
    return '';
  }
}
