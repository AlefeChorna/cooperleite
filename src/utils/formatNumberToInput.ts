export default function formatNumberToInput(
  value: string,
  decimalSeparator = ',',
): string {
  if (!value) return '';

  return value.replace('.', decimalSeparator);
}
