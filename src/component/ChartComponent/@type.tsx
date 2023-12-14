import { Dispatch, SetStateAction } from "react";

export interface ApexChartContract {
  options: any;
  series: any[];
}

export interface ohlcDataContract {
  x: string;
  y: [number, number, number, number];
}
export type setOHLCDataContract = Dispatch<SetStateAction<ohlcDataContract>>;
