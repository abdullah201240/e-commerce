'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Card className="group h-full hover:shadow-lg transition-all duration-300 border-0 p-0">
      <div className="relative h-full flex flex-col">
        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs font-semibold">
              ✨ New
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-2 h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Product Info */}
        <div className="p-3 flex-1 flex flex-col">
          <Link 
            href={`/products/${product.id}`}
            className="block hover:text-gray-600 transition-colors flex-1"
          >
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          {/* Price */}
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-3">
            <Button 
              size="sm" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
