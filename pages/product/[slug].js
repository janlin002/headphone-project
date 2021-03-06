import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar,
} from 'react-icons/ai'

import { client, urlFor } from '../../lib/client'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

function ProductDetails({ product, products }) {
  const [index, setIndex] = useState(0) // 透過 index 決定所選的圖片
  const {
    image, name, details, price,
  } = product

  const {
    inQty, decQty, qty, onAdd, setShowCart,
  } = useStateContext()

  const handleBuyNow = () => {
    onAdd(product, qty)

    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" alt="phote" />
          </div>
          <div className="small-images-container">
            {image?.map((item, indexx) => (
              <img
                // eslint-disable-next-line react/no-array-index-key
                key={indexx}
                src={urlFor(item)}
                className={indexx === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(indexx)}
                alt="product"
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {/* 星星效果 4顆半 */}
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>

            {/* 評分人數 */}
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">
            ${price}
          </p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={decQty}
                role="button"
                tabIndex={0}
                onKeyDown=""
              >
                <AiOutlineMinus />
              </span>
              <span
                className="num"
              >
                {qty}
              </span>
              <span
                className="plus"
                onClick={inQty}
                role="button"
                tabIndex={0}
                onKeyDown=""
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  // slug: { _type: 'slug', current: '耳罩式耳機 2021年款' }
  const query = `*[_type == "product" && slug.current == '${slug}'][0]` // 透過slug做定位
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product },
  }
}

ProductDetails.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  products: PropTypes.instanceOf(Object).isRequired,
}
