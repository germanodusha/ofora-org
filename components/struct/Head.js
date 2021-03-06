import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default class CustomHead extends React.Component {
  render () {
    return (
      <Head>
        <title>Fora {this.props.title && `- ${this.props.title}`}</title>
        <meta name='viewport' content='width=480px, initial-scale=1.0' />
        <link rel='stylesheet' type='text/css' href='/static/main.css' />
        <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Source+Serif+Pro' rel='stylesheet' />
        <link rel='apple-touch-icon' sizes='57x57' href='/static/apple-icon-57x57.png' />
        <link rel='apple-touch-icon' sizes='60x60' href='/static/apple-icon-60x60.png' />
        <link rel='apple-touch-icon' sizes='72x72' href='/static/apple-icon-72x72.png' />
        <link rel='apple-touch-icon' sizes='76x76' href='/static/apple-icon-76x76.png' />
        <link rel='apple-touch-icon' sizes='114x114' href='/static/apple-icon-114x114.png' />
        <link rel='apple-touch-icon' sizes='120x120' href='/static/apple-icon-120x120.png' />
        <link rel='apple-touch-icon' sizes='144x144' href='/static/apple-icon-144x144.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/static/apple-icon-152x152.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-icon-180x180.png' />
        <link rel='icon' type='image/png' sizes='192x192'  href='/static/android-icon-192x192.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/static/favicon-96x96.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
        <link rel='manifest' href='/static/manifest.json' />
        <meta name='theme-color' content='#ffffff' />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={this.props.title} />
        <meta property='og:image' content={this.props.cover} />
        <style jsx global>{
          `html {
            min-height: 100%;
            width: 100%;
          }
          body {
            margin: 0;
            overflow-x: hidden;
            width: 100%;
          }`
        }</style>
      </Head>
    )
  }
}
