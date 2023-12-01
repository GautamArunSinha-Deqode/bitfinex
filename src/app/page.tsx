import OHLCChart from '@/component/OHLCChart'
import OrderBook from '@/component/OrderBook'
import React from 'react'


const page = () => {
  return (
    <main>
      <OHLCChart />
      <OrderBook />
    </main>
  )
}

export default page