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
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block relative">
          <div className="aspect-square overflow-hidden bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
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
          {!product.inStock && (
            <Badge variant="secondary" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-2 h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Quick Action Buttons */}
        <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Info */}
        <div className="space-y-2">
          <Link 
            href={`/products/${product.id}`}
            className="block hover:text-gray-600 transition-colors"
          >
            <h3 className="font-medium text-sm line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="text-xs text-gray-500 capitalize">
            {product.category.replace('-', ' ')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
