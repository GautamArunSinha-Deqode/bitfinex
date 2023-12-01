import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export interface OHLCData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// export const fetchApiData = async (): Promise<OHLCData[]> => {

export const fetchApiData = async () => {
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
    // console.log("datadatadatadatadata" ,data);
    const ohlcData: OHLCData[] = data.map((dataPoint:any) => ({
      timestamp: dataPoint[0],
      open: dataPoint[1],
      high: dataPoint[3],
      low: dataPoint[4],
      close: dataPoint[2],
      volume: dataPoint[5],
    }));
    // console.log("ohlcData" ,ohlcData);
    return ohlcData;
    // res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchOrderBookData = async () => {
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
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
