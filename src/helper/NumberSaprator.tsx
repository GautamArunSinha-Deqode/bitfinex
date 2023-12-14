export const numberWithCommas = (price: number) => {
  let newPrice: string = price.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(newPrice)) newPrice = newPrice.replace(pattern, "$1,$2");
  return newPrice;
};
