'use client';

import ProductCard from './ProductCard';
import { Product } from '@/data/products';

interface ProductGridProps {
  products: Product[];
  title?: string;
  className?: string;
}

export default function ProductGrid({ products, title, className = '' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={`py-12 text-center ${className}`}>
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
