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
        bids: number[];
        asks: number[];
      };
  }