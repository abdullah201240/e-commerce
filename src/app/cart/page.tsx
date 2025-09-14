'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import MobileLayout from '@/components/layout/MobileLayout';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const subtotal = state.total;
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <MobileLayout mobileTitle="Shopping Cart">
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/products" className="md:hidden mr-4">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Shopping Cart
                  </h1>
                  <p className="text-gray-600 hidden md:block">
                    {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
              </div>
              {state.items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              )}
            </div>
          </div>

          {state.items.length === 0 ? (
            // Empty cart state
            <div className="text-center py-12 md:py-16">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link href="/products">
                  <Button size="lg" className="w-full md:w-auto">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            // Cart with items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {state.items.map((item) => (
                  <Card key={item.id} className="border-0 shadow-sm">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full md:w-32 h-32 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between gap-4">
                            <div className="flex-1">
                              <Link 
                                href={`/products/${item.product.id}`}
                                className="hover:text-gray-600 transition-colors"
                              >
                                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                  {item.product.name}
                                </h3>
                              </Link>
                              
                              <div className="text-sm text-gray-600 mb-4">
                                <p className="capitalize">{item.product.category.replace('-', ' ')}</p>
                                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                                {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                              </div>

                              <div className="text-xl font-bold text-gray-900">
                                ${item.product.price.toLocaleString()}
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex flex-row md:flex-col items-center md:items-end gap-4">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                  className="w-16 h-8 text-center border-0 focus:ring-0"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-sm sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Order Summary
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>

                      {shipping === 0 && (
                        <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                          🎉 You get free shipping on this order!
                        </div>
                      )}
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-between text-lg font-semibold mb-6">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="space-y-3">
                      <Link href="/checkout">
                        <Button size="lg" className="w-full">
                          Proceed to Checkout
                        </Button>
                      </Link>
                      
                      <Link href="/products">
                        <Button variant="outline" size="lg" className="w-full">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>

                    {/* Promo Code */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Promo Code</h4>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Enter code"
                          className="flex-1"
                        />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
