export default function formatNumberToAPI(
  value: string,
  decimalSeparator = '.',
): string {
  if (!value) return '';

  return value.replace(/\./g, '').replace(',', decimalSeparator);
}
