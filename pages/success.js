import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import runFireworks from '../lib/utils'

function Success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    runFireworks()
  }, [])

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>感謝您的購物!</h2>
        <p className="email-msg">檢查您的電子郵件收件箱以獲取收據。</p>
        <p className="description">
          如有任何問題，歡迎來信!
          <a className="email" href="coolStyle@example.com">
            coolStyle@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            繼續購物
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success
