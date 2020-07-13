const emptyString = '';
const comma = ',';
const period = '.';
const minus = '-';
const minusRegExp = /-/;
const nonDigitsRegExp = /\D+/g;
const digitRegExp = /\d/;
const caretTrap = '[]';

type Separator = ',' | '.' | string;

type Mask = (string | RegExp)[];

interface CreateNumberMaskProps {
  prefix?: string;
  suffix?: string;
  includeThousandsSeparator?: boolean;
  thousandsSeparatorSymbol?: Separator;
  allowDecimal?: boolean;
  decimalSymbol?: Separator;
  decimalLimit?: number;
  requireDecimal?: boolean;
  allowNegative?: boolean;
  allowLeadingZeroes?: boolean;
  integerLimit?: number | null;
}

type MaskFn = (value: string) => Mask;

function convertToMask(strNumber: string): Mask {
  return strNumber
    .split(emptyString)
    .map((char) => (digitRegExp.test(char) ? digitRegExp : char));
}

function addThousandsSeparator(
  value: string,
  thousandsSeparatorSymbol: Separator,
): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
}

export default function createNumberMask({
  prefix = '',
  suffix = emptyString,
  includeThousandsSeparator = true,
  thousandsSeparatorSymbol = period,
  allowDecimal = true,
  decimalSymbol = comma,
  decimalLimit = 2,
  requireDecimal = false,
  allowNegative = false,
  allowLeadingZeroes = false,
  integerLimit = null,
}: CreateNumberMaskProps = {}): MaskFn {
  const prefixLength = (prefix && prefix.length) || 0;
  const suffixLength = (suffix && suffix.length) || 0;
  const thousandsSeparatorSymbolLength =
    (thousandsSeparatorSymbol && thousandsSeparatorSymbol.length) || 0;

  function numberMask(value: string): Mask {
    let rawValue = value ?? emptyString;
    const rawValueLength = rawValue.length;

    if (
      rawValue === emptyString ||
      (rawValue[0] === prefix[0] && rawValueLength === 1)
    ) {
      const maskArr: Mask = prefix.split(emptyString);
      return maskArr.concat([digitRegExp]).concat(suffix.split(emptyString));
    }

    if (rawValue === decimalSymbol && allowDecimal) {
      const maskArr: Mask = prefix.split(emptyString);
      return maskArr
        .concat(['0', decimalSymbol, digitRegExp])
        .concat(suffix.split(emptyString));
    }

    const isNegative = rawValue[0] === minus && allowNegative;
    // If negative remove "-" sign
    if (isNegative) {
      rawValue = rawValue.toString().substr(1);
    }

    const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
    const hasDecimal = indexOfLastDecimal !== -1;

    let integer;
    let fraction;
    let mask;

    // remove the suffix
    if (rawValue.slice(suffixLength * -1) === suffix) {
      rawValue = rawValue.slice(0, suffixLength * -1);
    }

    if (hasDecimal && (allowDecimal || requireDecimal)) {
      integer = rawValue.slice(
        rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0,
        indexOfLastDecimal,
      );

      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
      fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString));
    } else if (rawValue.slice(0, prefixLength) === prefix) {
      integer = rawValue.slice(prefixLength);
    } else {
      integer = rawValue;
    }

    if (integerLimit && typeof integerLimit === 'number') {
      const thousandsSeparatorRegex =
        thousandsSeparatorSymbol === '.'
          ? '[.]'
          : `${thousandsSeparatorSymbol}`;
      const numberOfThousandSeparators = (
        integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []
      ).length;

      integer = integer.slice(
        0,
        integerLimit +
          numberOfThousandSeparators * thousandsSeparatorSymbolLength,
      );
    }

    integer = integer.replace(nonDigitsRegExp, emptyString);

    if (!allowLeadingZeroes) {
      integer = integer.replace(/^0+(0$|[^0])/, '$1');
    }

    integer = includeThousandsSeparator
      ? addThousandsSeparator(integer, thousandsSeparatorSymbol)
      : integer;

    mask = convertToMask(integer);

    if ((hasDecimal && allowDecimal) || requireDecimal === true) {
      if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
        mask.push(caretTrap);
      }

      mask.push(decimalSymbol, caretTrap);

      if (fraction) {
        if (typeof decimalLimit === 'number') {
          fraction = fraction.slice(0, decimalLimit);
        }

        mask = mask.concat(fraction);
      }

      if (
        requireDecimal === true &&
        rawValue[indexOfLastDecimal - 1] === decimalSymbol
      ) {
        mask.push(digitRegExp);
      }
    }

    if (prefixLength > 0) {
      const prefixArr: Mask = prefix.split(emptyString);
      mask = prefixArr.concat(mask);
    }

    if (isNegative) {
      // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
      if (mask.length === prefixLength) {
        mask.push(digitRegExp);
      }

      const minusRegExpArr: Mask = [minusRegExp];
      mask = minusRegExpArr.concat(mask);
    }

    if (suffix.length > 0) {
      mask = mask.concat(suffix.split(emptyString));
    }

    return mask;
  }

  numberMask.instanceOf = 'createNumberMask';

  return numberMask;
}
