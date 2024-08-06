export function formatPrice(price: number) {
  const formattedPrice = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

  return formattedPrice;
}
