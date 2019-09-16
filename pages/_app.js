// pages/_app.js
import React from 'react'
import App, { Container } from 'next/app'
import Header from '../components/Header'
import Reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
import moment from 'moment'
import Footer from '../components/Footer'
import axios from 'axios'
import { SnackbarProvider } from 'notistack'
import mediaQueries from '../helpers/mediaQueries'
import colors from '../helpers/colors'

axios.defaults.baseURL = process.env.API_DOMAIN

moment.locale('pt-br')

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
    font-family: 'Lato', sans-serif !important;

    * {
      background-color: transparent !important;
      color: ${colors.jet} !important;
    }
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
    background: black;
  }

  strong {
    font-weight: bold !important;
  }

  .my-wrapper {
    display: block;
    border-radius: 4px;
    box-shadow: 9px 14px 17px 0px rgba(0,0,0,0.71);
    max-width: 500px;
    background: white;
  }

  /* other styles */

`

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const res = await axios.get('/api/config/current')

    return {
      pageProps: {
        // Call page-level getInitialProps
        currentConfig: res.data,
        ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, currentConfig: res.data }) : {})
      }
    }
  }

  render () {
    const { Component, pageProps } = this.props
    const render = typeof window !== 'undefined'
    return (
      <SnackbarProvider maxSnack={3}>
        <GlobalStyle />
        <Container>
          <Header {...pageProps} />
          {render && <Component {...pageProps} />}
          <Footer />
        </Container>
      </SnackbarProvider>
    )
  }
}

export default MyApp
