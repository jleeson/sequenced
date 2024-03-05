export function formatDigits(str, digits) {
  return str.toLocaleString("en-US", {
    minimumIntegerDigits: digits,
    useGrouping: false,
  });
}
