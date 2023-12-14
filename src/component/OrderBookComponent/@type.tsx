import { Dispatch, SetStateAction } from "react";

export interface OrderBookData {
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
  count: number;
}


export interface OrderBookTableContract {
    orderBookData: {
        bids: OrderBookEntry[];
        asks: OrderBookEntry[];
      };
      precesion:boolean
  }


export interface orderRowsContract {
  orderBookData: {
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
  };

}


export type SetOrderBookData = Dispatch<SetStateAction<OrderBookData>>;
