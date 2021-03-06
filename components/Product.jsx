import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { urlFor } from '../lib/client'

function Product({ product }) {
  const {
    image, name, slug, price,
  } = product

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
            alt="product"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">
            ${price}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Product

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
}
