'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export default function NewArrivals({ 
  products, 
  title = "New Arrivals", 
  showViewAll = true 
}: NewArrivalsProps) {
  
  // Show only recent arrivals (first 8)
  const displayProducts = products.slice(0, 8);
  
  if (displayProducts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No new arrivals yet.</p>
      </div>
    );
  }

  const getDaysAgo = (arrivalDate: string | undefined) => {
    if (!arrivalDate) return '';
    const days = Math.floor((Date.now() - new Date(arrivalDate).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 14) return '1 week ago';
    return `${Math.floor(days / 7)} weeks ago`;
  };

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center animate-fadeInUp">
        <div >
          <div className="flex items-center gap-3 mb-4">
            
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900">
              {title}
            </h2>
          
          </div>
          
        </div>
        
      </div>

      {/* Products Grid with Staggered Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <div
            key={product.id}
            className="group animate-fadeInUp"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="relative">
              {/* Arrival Date Badge */}
              <div className="absolute -top-2 -right-2 z-10">
                
              </div>
              
              {/* Enhanced Product Card */}
              <div className="relative overflow-hidden rounded-lg group-hover:shadow-lg transition-all duration-300">
                <ProductCard product={product} />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
              </div>
              
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
