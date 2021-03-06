import React from 'react'
import PropTypes from 'prop-types'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData[0]} />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>
      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData[0]} />
    </>
  )
}

Home.propTypes = {
  products: PropTypes.instanceOf(Object).isRequired,
  bannerData: PropTypes.instanceOf(Object).isRequired,
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData },
  }
}
