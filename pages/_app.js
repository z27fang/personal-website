import React from 'react'
import '../styles/index.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../lib/redux/store'

export default function MyApp ({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>Zihao Fang | 方子豪</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Provider store={store}>
          <Component {...pageProps}/>
        </Provider>
      </>
  )
}
