export default function formatNumberToAPI(
  value: string,
  decimalSeparator = '.',
): number | string {
  if (!value) return '';

  const formattedNumber = value
    .replace(/\./g, '')
    .replace(',', decimalSeparator);

  return Number(formattedNumber);
}
