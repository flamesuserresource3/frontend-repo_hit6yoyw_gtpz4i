import React from 'react';
import { ShoppingCart, Shirt, Search } from 'lucide-react';

export default function Navbar({ cartCount, onSearch }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
          <Shirt className="w-6 h-6 text-indigo-600" />
          <span>BlueFlame Apparel</span>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 w-96">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search tees, denim, hoodies..."
            className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <button
          className="relative inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition"
          onClick={() => {
            const el = document.getElementById('cart-checkout');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-semibold rounded-full w-6 h-6 grid place-items-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
