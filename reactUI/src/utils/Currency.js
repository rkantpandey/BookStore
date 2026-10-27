
const currencyFormatter = new Intl.NumberFormat(
  import.meta.env.VITE_CURRENCY_LOCALE,
  {
    style: "currency",
    currency: import.meta.env.VITE_CURRENCY_CODE,
    minimumFractionDigits: Number(
      import.meta.env.VITE_MIN_FRACTION_DIGITS
    ),
  }
);

export function formatPrice(value) {
  return currencyFormatter.format(Number(value));
}
