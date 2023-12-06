import { ThemeProvider } from "@emotion/react";

import React from 'react'

const Myapp = ({ Component, pageProps }) => {
  return (
    <div>
    <ThemeProvider theme={{}}>
    <Component {...pageProps} />
  </ThemeProvider>
    </div>
  )
}

export default Myapp
