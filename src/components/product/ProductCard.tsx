'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  
  const isWishlisted = isInWishlist(product.id);
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToWishlist(true);
    
    try {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setTimeout(() => setIsAddingToWishlist(false), 300);
    }
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
          onClick={handleWishlistToggle}
          disabled={isAddingToWishlist}
          className={`absolute top-2 right-2 p-2 h-8 w-8 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl ${
            isWishlisted 
              ? 'text-red-500 bg-red-50 opacity-100' 
              : 'text-gray-600 hover:text-red-500'
          } ${
            isAddingToWishlist ? 'scale-110' : 'hover:scale-110'
          }`}
        >
          <Heart className={`h-4 w-4 transition-all duration-200 ${
            isWishlisted ? 'fill-current text-red-500' : ''
          } ${
            isAddingToWishlist ? 'animate-pulse' : ''
          }`} />
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
          <div className="mt-3 space-y-2">
            <Button 
              size="sm" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleWishlistToggle}
              disabled={isAddingToWishlist}
              className={`w-full transition-all duration-200 ${
                isWishlisted 
                  ? 'border-red-200 text-red-600 hover:bg-red-50 bg-red-50/50' 
                  : 'border-gray-200 hover:border-red-200 hover:text-red-600'
              }`}
            >
              <Heart className={`h-4 w-4 mr-2 transition-all duration-200 ${
                isWishlisted ? 'fill-current text-red-500' : ''
              }`} />
              {isWishlisted ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
