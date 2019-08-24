import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'

const PageHead = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <link rel='apple-touch-icon' sizes='57x57' href='/static/apple-icon-57x57.png' />>
    <link rel='apple-touch-icon' sizes='60x60' href='/static/apple-icon-60x60.png' />
    <link rel='apple-touch-icon' sizes='72x72' href='/static/apple-icon-72x72.png' />
    <link rel='apple-touch-icon' sizes='76x76' href='/static/apple-icon-76x76.png' />
    <link rel='apple-touch-icon' sizes='114x114' href='/static/apple-icon-114x114.png' />
    <link rel='apple-touch-icon' sizes='120x120' href='/static/apple-icon-120x120.png' />
    <link rel='apple-touch-icon' sizes='144x144' href='/static/apple-icon-144x144.png' />
    <link rel='apple-touch-icon' sizes='152x152' href='/static/apple-icon-152x152.png' />
    <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-icon-180x180.png' />
    <link rel='icon' type='image/png' sizes='192x192' href='/static/android-icon-192x192.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='96x96' href='/static/favicon-96x96.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
    <meta name='theme-color' content='#ffffff' />
    <link rel='stylesheet' type='text/css' charset='UTF-8' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
    <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
    <link href='https://fonts.googleapis.com/css?family=Rubik|Karla:300,600,700|Material+Icons' rel='stylesheet' />
    <meta name='description' content={description} />
    <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
    <meta httpEquiv='content-language' content='pt-br' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  </Head>
)

PageHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default PageHead
