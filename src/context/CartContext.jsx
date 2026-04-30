import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem('cart-items');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(items));
  }, [items]);

  const add = (product) => setItems((prev) => {
    const existing = prev.find((x) => x.id === product.id);
    if (existing) return prev.map((x) => x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x);
    return [...prev, { ...product, quantity: 1 }];
  });
  const remove = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const update = (id, quantity) => setItems((prev) => prev.map((x) => x.id === id ? { ...x, quantity: Math.max(1, Number(quantity) || 1) } : x));
  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((s, i) => s + (Number(i.price) || 0) * i.quantity, 0), [items]);

  return <CartContext.Provider value={{ items, add, remove, update, clear, total }}>{children}</CartContext.Provider>;
}
