import React from 'react'
import '../styles/globals.css'
import PropTypes from 'prop-types'
import { Toaster } from 'react-hot-toast'

import Layout from '../components/Layout'
import StateContext from '../context/StateContext'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </StateContext>
  )
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.instanceOf(Object).isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
}
