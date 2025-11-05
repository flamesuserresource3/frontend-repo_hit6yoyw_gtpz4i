import React, { useEffect, useMemo, useState } from 'react';
import { Star, SlidersHorizontal, X } from 'lucide-react';

const PRODUCTS = [
  {
    id: 'tee-classic',
    name: 'Classic Crew Tee',
    price: 28,
    rating: 4.7,
    category: 'Men',
    colors: ['Black', 'White', 'Heather Gray'],
    image:
      'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1932&auto=format&fit=crop',
    description: 'Ultra-soft cotton with a tailored fit. Your everyday essential.',
  },
  {
    id: 'tee-women',
    name: 'Everyday Women Tee',
    price: 30,
    rating: 4.6,
    category: 'Women',
    colors: ['Sage', 'Cream', 'Black'],
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop',
    description: 'Flattering cut, breathable fabric. Dress up or down.',
  },
  {
    id: 'denim-relaxed',
    name: 'Relaxed Denim',
    price: 72,
    rating: 4.8,
    category: 'Men',
    colors: ['Indigo', 'Washed Blue'],
    image:
      'https://images.unsplash.com/photo-1520975661595-645a1d4fddd6?q=80&w=1932&auto=format&fit=crop',
    description: 'Roomy fit with soft stretch for all-day comfort.',
  },
  {
    id: 'hoodie-cozy',
    name: 'Cozy Fleece Hoodie',
    price: 58,
    rating: 4.9,
    category: 'Unisex',
    colors: ['Oat', 'Charcoal', 'Navy'],
    image:
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1887&auto=format&fit=crop',
    description: 'Brushed interior, oversized comfort. Your go-to layer.',
  },
  {
    id: 'cap-minimal',
    name: 'Minimal Cap',
    price: 24,
    rating: 4.5,
    category: 'Accessories',
    colors: ['Khaki', 'Black'],
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1887&auto=format&fit=crop',
    description: 'Clean lines and breathable cotton twill.',
  },
  {
    id: 'jacket-bomber',
    name: 'Light Bomber Jacket',
    price: 98,
    rating: 4.7,
    category: 'Unisex',
    colors: ['Olive', 'Black'],
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1974&auto=format&fit=crop',
    description: 'Modern silhouette with water-repellent finish.',
  },
];

function Rating({ value }) {
  const stars = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < stars ? 'fill-amber-400' : 'fill-none'}`} />
      ))}
      <span className="ml-1 text-xs text-gray-500">{value.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCatalog({ onAddToCart, externalQuery = '' }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(120);
  const [sort, setSort] = useState('featured');
  const [active, setActive] = useState(null); // active product for modal

  useEffect(() => {
    setQuery(externalQuery);
  }, [externalQuery]);

  const filtered = useMemo(() => {
    let items = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (category !== 'All') items = items.filter((p) => p.category === category);
    items = items.filter((p) => p.price <= maxPrice);
    if (sort === 'price-asc') items = items.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') items = items.sort((a, b) => b.price - a.price);
    if (sort === 'rating') items = items.sort((a, b) => b.rating - a.rating);
    return items;
  }, [query, category, maxPrice, sort]);

  return (
    <section id="catalog" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop the Collection</h2>
            <p className="text-gray-600 mt-1">Refined essentials designed to mix, match, and move with you.</p>
          </div>
          <div className="grid grid-cols-2 md:flex items-center gap-3">
            <label className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent outline-none"
              >
                <option>All</option>
                <option>Men</option>
                <option>Women</option>
                <option>Unisex</option>
                <option>Accessories</option>
              </select>
            </label>
            <label className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 text-sm">
              <span className="text-gray-500">Max ${maxPrice}</span>
              <input
                type="range"
                min="10"
                max="120"
                step="2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-indigo-600"
              />
            </label>
            <label className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 text-sm">
              <span className="text-gray-500">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="col-span-2 md:col-span-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <button
                  onClick={() => setActive(p)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 text-xs rounded-full bg-white/90 text-gray-900 hover:bg-white shadow"
                >
                  Quick View
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <span className="font-semibold text-gray-900">${p.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{p.category} • {p.colors[0]}</p>
                <div className="mt-2"><Rating value={p.rating} /></div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => onAddToCart(p)}
                    className="flex-1 rounded-full bg-indigo-600 text-white py-2 text-sm hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setActive(p)}
                    className="rounded-full ring-1 ring-gray-300 text-gray-700 px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm grid place-items-center p-4" onClick={() => setActive(null)}>
          <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="grid md:grid-cols-2">
              <img src={active.image} alt={active.name} className="h-72 md:h-full w-full object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{active.name}</h3>
                    <div className="mt-1"><Rating value={active.rating} /></div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setActive(null)}>
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="mt-3 text-gray-600">{active.description}</p>
                <div className="mt-4 text-2xl font-semibold text-gray-900">${active.price}</div>
                <div className="mt-6 flex gap-3">
                  {active.colors.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">{c}</span>
                  ))}
                </div>
                <button
                  onClick={() => { onAddToCart(active); setActive(null); }}
                  className="mt-6 w-full rounded-full bg-gray-900 text-white py-3 hover:bg-black transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
