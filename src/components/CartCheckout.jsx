import React, { useMemo, useState } from 'react';

export default function CartCheckout({ cart, onUpdateQty, onRemove, onClear }) {
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '' });
  const [placed, setPlaced] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );
  const shipping = subtotal > 100 ? 0 : 6.9;
  const total = subtotal + shipping;

  const canPlace = form.name && form.email && form.address && form.card && cart.length > 0;

  const placeOrder = () => {
    if (!canPlace) return;
    setPlaced(true);
    onClear();
  };

  return (
    <section id="cart-checkout" className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
        <div className="mt-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 && (
              <div className="p-6 rounded-xl bg-white border text-gray-600">Your cart is empty.</div>
            )}
            {cart.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-white border flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price} • {item.category}</p>
                  <div className="mt-2 inline-flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                    <button
                      className="px-2 text-gray-600 hover:text-gray-900"
                      onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
                    >
                      −
                    </button>
                    <span className="text-sm">{item.qty}</span>
                    <button
                      className="px-2 text-gray-600 hover:text-gray-900"
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${(item.price * item.qty).toFixed(2)}</div>
                  <button className="text-sm text-rose-600 hover:underline" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-white border space-y-3">
              <h3 className="font-semibold text-gray-900">Order Summary</h3>
              <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="border-t pt-2 flex justify-between font-semibold text-gray-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <div className="p-6 rounded-xl bg-white border space-y-3">
              <h3 className="font-semibold text-gray-900">Checkout</h3>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
              />
              <input
                type="text"
                placeholder="Shipping address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
              />
              <input
                type="text"
                placeholder="Card number"
                value={form.card}
                onChange={(e) => setForm({ ...form, card: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
              />
              <button
                disabled={!canPlace}
                onClick={placeOrder}
                className={`w-full rounded-full py-3 text-white transition ${
                  canPlace ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Place Order
              </button>
              {placed && (
                <div className="mt-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                  Order placed! A confirmation has been sent to your email.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
