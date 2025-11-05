import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import ParallaxHero from './components/ParallaxHero';
import ProductCatalog from './components/ProductCatalog';
import CartCheckout from './components/CartCheckout';

function App() {
  const [cart, setCart] = useState([]);
  const [globalQuery, setGlobalQuery] = useState('');

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar cartCount={cartCount} onSearch={(q) => { setGlobalQuery(q); const el = document.getElementById('catalog'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
      <ParallaxHero />
      <ProductCatalog onAddToCart={addToCart} externalQuery={globalQuery} />
      <CartCheckout cart={cart} onUpdateQty={updateQty} onRemove={removeItem} onClear={clearCart} />
      <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} BlueFlame Apparel. All rights reserved.</footer>
    </div>
  );
}

export default App;
