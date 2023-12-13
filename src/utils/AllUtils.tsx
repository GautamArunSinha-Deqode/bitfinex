import { numberWithCommas } from "@/helper/NumberSaprator";

export const getOrderPrice = (data: number, precesion: boolean) => {
  let value = numberWithCommas(data);
  if (precesion) {
    let numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      value = numericValue.toFixed(2);
    }
  }

  return value;
};
