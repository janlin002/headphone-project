import React, { useRef } from 'react'
import Link from 'next/link'
import {
  AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping,
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

function Cart() {
  const cartRef = useRef()

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext()

  const handleCheckout = async () => {
    const stripe = await getStripe()

    // 打api
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    // 錯誤回應
    if (response.statusCode === 500) return

    // 資料內容
    const data = await response.json()

    // UI 提示
    toast.loading('交易處理中...')

    // 導到確認頁 successUrl OR cancelUrl
    stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">

        {/* 關閉確認頁の按鈕 */}
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {
          cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>您的購物車是空的!</h3>

              <Link href="/">
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="btn"
                >
                  返回購物
                </button>
              </Link>
            </div>
          )
        }

        {/* 陳列商品 */}
        <div className="product-container">
          {
            cartItems.length >= 1 && cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} className="cart-product-image" alt="product" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      {/* 產品新增減少 */}
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartItemQuanitity(item._id, 'dec')}
                          role="button"
                          tabIndex={0}
                          onKeyDown=""
                        >
                          <AiOutlineMinus />
                        </span>
                        <span
                          className="num"
                        >
                          {item.qutity}
                        </span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItemQuanitity(item._id, 'inc')}
                          role="button"
                          tabIndex={0}
                          onKeyDown=""
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* 確定購買按鈕 */}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={handleCheckout}
              >
                信用卡支付
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
