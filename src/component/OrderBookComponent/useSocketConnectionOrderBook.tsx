import { useEffect, useRef, useState } from "react";
import { w3cwebsocket } from "websocket";
import handelOrderBookSocektConnection from "../../helper/OrderBookSocketConnection";
import { OrderBookData } from "./@type";

const useSocketConnectionOrderBook = () => {
  const [orderBookData, setOrderBookData] = useState<OrderBookData>({
    asks: [],
    bids: [],
  });
  const [connectionValue, setConnectionValue] = useState<boolean>(true);

  const ws: React.MutableRefObject<w3cwebsocket | null> = useRef(null);
  useEffect(() => {
    ws.current = handelOrderBookSocektConnection(setOrderBookData);
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [orderBookData]);

  const handelDisconnect = () => {
    if (ws.current) {
      ws.current.close();
      setConnectionValue(false);
    }
  };

  const handelConnect = () => {
    handelOrderBookSocektConnection(setOrderBookData);
    setConnectionValue(true);
  };

  return {
    orderBookData,
    connectionValue,
    handelConnect,
    handelDisconnect,
  };
};

export default useSocketConnectionOrderBook;
