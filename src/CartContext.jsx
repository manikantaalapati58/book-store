import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart-state'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('papertrail-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('papertrail-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (book, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === book.id)
      return existing
        ? current.map((item) => item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...book, quantity }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setItems((current) => quantity <= 0
      ? current.filter((item) => item.id !== id)
      : current.map((item) => item.id === id ? { ...item, quantity } : item))
  }

  const removeFromCart = (id) => setItems((current) => current.filter((item) => item.id !== id))
  const clearCart = () => setItems([])
  const count = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const value = useMemo(() => ({ items, count, subtotal, addToCart, updateQuantity, removeFromCart, clearCart }), [items, count, subtotal])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
