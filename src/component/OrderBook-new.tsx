import React from 'react'
import {css} from '@emotion/css'

const styles = {
    table: css`
      color: white;
      width: 100%;
      text-align: right;
      display: flex;
      flex-direction: column;
    `,
    title: css`
      display: flex;
      flex-direction: column;
    `,
    heading: css`
      font-weight: 400;
      display: flex;
    `,
    head: css`
      border-bottom: 1px solid white;
      font-weight: 200;
      width: 100%;
    `,
    row: css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      top: 0;
      position: absolute;
      width: 100%;
    `,
    cell: css`
      text-align: right;
      width: 100%;
    `,
    ghostRow: css`
      position: relative;
      display: flex;
    `,
    colorSprite: css`
      width: 100%;
      height: 100%;
      /* position: absolute; */
      display: flex;
      min-height: 20px;
      height: 100%;
    `,
    colored: (showPercentage: number, color: string) => css`
      flex: ${showPercentage * 10};
      background-color: ${color};
    `,
    uncolored: (showPercentage: number) => css`
      flex: ${(1 - showPercentage) * 10};
    `,
  };
const OrderBook = () => {
    const askOrBidOptions = {
        ask: { key: "ask", color: "red" },
        bid: { key: "bid", color: "green" },
      };
    return (
     <div>
           <table className={styles.table}>
          <thead>
            <tr ></tr>
            <tr >
              <th >Price</th>
              <th >Size</th>
              <th >Total</th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
     </div>
      );
}




export default OrderBook
