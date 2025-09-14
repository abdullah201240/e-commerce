'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { categories } from '@/data/products';
import { ArrowRight, Grid3X3 } from 'lucide-react';

export default function CategoriesPage() {
  // Filter out the 'all' category for display
  const displayCategories = categories.filter(cat => cat.id !== 'all');

  return (
    <MobileLayout mobileTitle="Categories">
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="h-8 w-8 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated categories to find the perfect furniture for your space
            </p>
          </div>

          {/* Categories Grid */}
          <div className="space-y-8 md:space-y-12">
            {displayCategories.map((category, index) => (
              <div 
                key={category.id} 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <Link href={`/categories/${category.id}`}>
                    <Button variant="outline" className="hidden md:flex">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Main Category Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <Link 
                    href={`/categories/${category.id}`}
                    className="lg:col-span-2"
                  >
                    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                      <div className="relative h-64 md:h-80">
                        {category.image && (
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                              {category.name}
                            </h3>
                            <p className="text-sm md:text-base opacity-90 mb-4">
                              {category.count} items available
                            </p>
                            <Button 
                              variant="secondary" 
                              className="bg-white/90 text-gray-900 hover:bg-white"
                            >
                              Explore Collection
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  {/* Category Stats */}
                  <div className="space-y-4">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {category.count}
                        </div>
                        <div className="text-gray-600">Total Items</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {category.subcategories?.length || 0}
                        </div>
                        <div className="text-gray-600">Subcategories</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Subcategories */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Browse by Type
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/categories/${category.id}?subcategory=${subcategory.id}`}
                        >
                          <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square">
                              {subcategory.image && (
                                <Image
                                  src={subcategory.image}
                                  alt={subcategory.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                                {subcategory.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {subcategory.count} items
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mobile View All Button */}
                <div className="md:hidden mt-6">
                  <Link href={`/categories/${category.id}`}>
                    <Button className="w-full">
                      View All {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Browse All Products CTA */}
          <div className="text-center mt-12 md:mt-16">
            <Card className="border-0 shadow-sm bg-gray-900 text-white">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Browse our complete collection of furniture and home decor items
                </p>
                <Link href="/products">
                  <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                    Browse All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
