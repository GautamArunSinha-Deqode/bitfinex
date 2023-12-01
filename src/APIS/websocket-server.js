const WebSocket = require("ws");
const axios = require("axios");
const wss = new WebSocket.Server({ port: 3001 });
const generateRandomData = () => {
  const timestamp = new Date().getTime();
  const open = Math.random() * 1000 + 35000; // Random value around 35000
  const high = open + Math.random() * 200;
  const low = open - Math.random() * 200;
  const close = open + (Math.random() - 0.5) * 50; // Random close value around open
  const volume = Math.random() * 2; // Random volume

  return {
    timestamp,
    open,
    high,
    low,
    close,
    volume,
  };
};




const fetchApiData = async () => {
  const options = {
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get(
      "https://api-pub.bitfinex.com/v2/candles/trade:15m:tBTCUSD/hist",
      options
    );
    const data = response.data;
    // console.log("websocket-data", data)
    const ohlcData = data.map((dataPoint) => ({
      timestamp: dataPoint[0],
      open: dataPoint[1],
      high: dataPoint[3],
      low: dataPoint[4],
      close: dataPoint[2],
      volume: dataPoint[5],
    }));
    return ohlcData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchOrderBookData = async () => {
  const options = {
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get(
      "https://api-pub.bitfinex.com/v2/book/tBTCUSD/P0?len=25",
      options
    );
    const data = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};






//****************** OHLC CHART WEBSOCKET *****************//

wss.on("connection", (ws) => {
  // You can send real-time updates to connected clients here
  console.log("WebSocket connection established", ws);

  const interval = setInterval(() => {
    // const newData =fetchApiData();
    const getApiData = async () => {
      const newData = await fetchApiData();
      console.log("websocket-data-setinterval", newData);
      ws.send(JSON.stringify(newData));
    };
    getApiData();
  }, 5000);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("WebSocket connection closed");
  });
});

//****************** ORDER BOOK WEBSOCKET *****************//

// wss.on("connection", (ws) => {
//   // You can send real-time updates to connected clients here
//   console.log("WebSocket connection established");

//   const interval = setInterval(() => {
//     // const newData =fetchApiData();
//     const getApiData = async () => {
//       const newData = await fetchApiData();
//       console.log("websocket-data-setinterval", newData);
//       ws.send(JSON.stringify(newData));
//     };
//     getApiData();
//   }, 3000);

//   ws.on("close", () => {
//     clearInterval(interval);
//     console.log("WebSocket connection closed");
//   });
// });
