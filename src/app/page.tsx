import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroSlider from '@/components/ui/hero-slider';
import ProductGrid from '@/components/product/ProductGrid';
import MobileLayout from '@/components/layout/MobileLayout';
import { featuredProducts, discountedProducts, categories, heroSlides } from '@/data/products';
import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from 'lucide-react';

export default function Home() {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Slider */}
        <HeroSlider slides={heroSlides} />

     
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect furniture for every room in your home
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.slice(1).map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gray-100 rounded-lg aspect-square mb-4 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <span className="text-3xl font-bold text-gray-400 group-hover:text-gray-600">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-gray-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {category.count} items
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 animate-fadeInUp">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked items from our premium collection
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts.slice(0, 8)} />
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <Badge className="bg-yellow-500 text-yellow-900 mb-4">
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Special Deals & Discounts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these amazing deals on premium furniture
            </p>
          </div>
          <ProductGrid products={discountedProducts.slice(0, 4)} />
        </div>
      </section>

      
      </div>
    </MobileLayout>
  );
}
