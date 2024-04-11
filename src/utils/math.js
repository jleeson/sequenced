/**
 * Formats a string to x digits 
 * @param {*} str Digits string
 * @param {*} digits How many digits to format, ex: 2 would set 51.567 to 51.56
 * @returns 
 */
export function formatDigits(str, digits) {
  return str.toLocaleString("en-US", {
    minimumIntegerDigits: digits,
    useGrouping: false,
  });
}
