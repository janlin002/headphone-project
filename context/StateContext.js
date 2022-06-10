import React, {
  useState,
  createContext,
  useEffect,
  useContext,
} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import PropTypes from 'prop-types'

const Context = createContext()

function StateContext({ children }) {
  // 點擊購物車圖示後，顯示右側清單
  const [showCart, setShowCart] = useState(false)

  // 購物車內容
  const [cartItems, setCartItems] = useState([])

  // 總價格
  const [totalPrice, setTotalPrice] = useState(0)

  // 總數量
  const [totalQuantities, setTotalQuantities] = useState(0)

  // 購買數量
  const [qty, setQty] = useState(1)

  // 加到購物車
  const onAdd = (product, qutity) => {
    // 確定此產品已經入購物車
    const checkCartItem = cartItems.find((item) => item._id === product._id)

    // 錢
    setTotalPrice((prev) => prev + product.price * qutity)
    // 數量
    setTotalQuantities((prev) => prev + qutity)

    // 購物車顯示
    if (checkCartItem) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            utity: cartProduct.qutity + qutity, // 增加數量
          }
        }
      })
      setCartItems(updatedCartItems)
    } else {
      product.qutity = qutity // 購物車內沒有東西，故直接嫁入即可

      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qutity}個 ${product.name} 已加入購物車！`)
  }

  // useEffect(() => {
  //   console.log(cartItems, 'cartItems')
  // }, [cartItems])

  // 購買數量
  // 新增
  const inQty = () => {
    setQty((prev) => prev + 1)
  }

  // 減少
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) {
        return 1
      }
      return prev - 1
    })
  }

  return (
    <Context.Provider
        // 先這樣處理
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        inQty,
        decQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  )
}

StateContext.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
}

export default StateContext

export const useStateContext = () => useContext(Context)
