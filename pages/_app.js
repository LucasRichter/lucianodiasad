// pages/_app.js
import React from 'react'
import App, { Container } from 'next/app'
import Header from '../components/Header'
import Reset from 'styled-reset'
import { createGlobalStyle, keyframes } from 'styled-components'
import moment from 'moment'
import Footer from '../components/Footer'
import axios from 'axios'
import { SnackbarProvider } from 'notistack'
import mediaQueries from '../helpers/mediaQueries'
import StockExchange from '../components/StockExchange'

axios.defaults.baseURL = process.env.API_DOMAIN

moment.locale('pt-br')

const bg = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`

const GlobalStyle = createGlobalStyle`
  ${Reset}

  .track-visibility {
    max-width: 100%;

    @media ${mediaQueries.laptop} {
      max-width: 320px;
    }

  }

  * {
    line-height: 1.6 !important;
  }

  .jsx-parser {
    font-family: 'Work Sans', sans-serif !important;
  }

  #__next {
    margin: auto;
    max-width: 1500px;
  }

  body {
    background: transparent;
  }

  html {
    height: 100%;
    width: 100%;
    animation: ${bg} 30s ease infinite;
    background: #9B111E;
    background: linear-gradient(to bottom, #9B111E 0%, #8C020F 100%);
    background-size: 400% 400%;
  }

  strong {
    font-weight: bold !important;
  }

  /* other styles */

`

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const res = await axios.get('/api/config/current')
    const stocks = await axios.get('/api/stocks')

    return {
      stocks: stocks.data.stocks,
      pageProps: {
        // Call page-level getInitialProps
        currentConfig: res.data,
        ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, currentConfig: res.data }) : {})
      }
    }
  }

  render () {
    const { Component, pageProps, stocks } = this.props
    const render = typeof window !== 'undefined'
    return (
      <SnackbarProvider maxSnack={3}>
        <GlobalStyle />
        <Container>
          <Header {...pageProps} />
          <StockExchange stocks={stocks} />
          {render && <Component {...pageProps} />}
          <Footer />
        </Container>
      </SnackbarProvider>
    )
  }
}

export default MyApp
