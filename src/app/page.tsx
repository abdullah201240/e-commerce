import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import HeroSlider from '@/components/ui/hero-slider';
import ProductGrid from '@/components/product/ProductGrid';
import NewArrivals from '@/components/product/NewArrivals';
import MobileLayout from '@/components/layout/MobileLayout';
import { featuredProducts, discountedProducts, newArrivalProducts, categories, heroSlides } from '@/data/products';

export default function Home() {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Slider */}
        <HeroSlider slides={heroSlides} />

     
      {/* Categories Section */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-left mb-4 animate-fadeInUp">
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900">
              Category
            </h2>
            
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.slice(1).map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 p-0">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      {category.image ? (
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-3xl font-bold text-gray-400 group-hover:text-gray-600">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-gray-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {category.count} items
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <NewArrivals products={newArrivalProducts} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          
          <ProductGrid products={featuredProducts.slice(0, 8)} title="Featured Products"/>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-4 bg-yellow-50">
        <div className="container mx-auto px-4">

          <ProductGrid products={discountedProducts.slice(0, 4)} title="Special Deals & Discounts"/>
        </div>
      </section>

      
      </div>
    </MobileLayout>
  );
}
