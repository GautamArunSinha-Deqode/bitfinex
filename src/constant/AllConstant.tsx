export const OrderBookConstant = {
  wsEndpointApi: "wss://api.bitfinex.com/ws/2",
  subscription_event: "subscribe",
  subscription_channel: "book",
  subscription_freq: "F1",
  subscription_len: "25",
  subscription_symbol: "BTCUSD",
  subscription_prec: "P0",
};

export const ChartConstant = {
  wsEndpointApi: "wss://api-pub.bitfinex.com/ws/2",
  subscription_event: "subscribe",
  subscription_channel: "candles",
  subscription_key: "trade:15m:tBTCUSD",
  candlestick_name: "candlesticks"
};


export const enviornment = {
  production:"production",
  development:"development"
}