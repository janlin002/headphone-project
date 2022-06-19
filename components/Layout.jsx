import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title>Headphone Project</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
}
