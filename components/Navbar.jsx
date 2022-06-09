import React from 'react'
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <button 
        type="button" 
        className="cart-icon" 
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">
          {/* {totalQuantities} */}
          1
        </span>
      </button>

      {/* {showCart && <Cart />} */}
    </div>
  )
}

export default Navbar