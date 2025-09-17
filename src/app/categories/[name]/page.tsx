'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/product/ProductCard';
import { 
  Search, 
  SlidersHorizontal, 
  Filter,
  ArrowLeft,
  Loader2,
  Grid3X3,
  List
} from 'lucide-react';
import { products, categories, Category } from '@/data/products';
import MobileLayout from '@/components/layout/MobileLayout';

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [displayedProducts, setDisplayedProducts] = useState<typeof products>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const categoryName = params.name as string;
    const foundCategory = categories.find(cat => 
      cat.id === categoryName || 
      cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
    );
    setCategory(foundCategory || null);
    setLoading(false);

    // Check for subcategory in URL params
    const subcategory = searchParams.get('subcategory');
    if (subcategory) {
      setSelectedSubcategory(subcategory);
    }
  }, [params.name, searchParams]);

  const filteredProducts = useMemo(() => {
    if (!category) return [];

    let filtered = products.filter(product => product.category === category.id);

    // Filter by subcategory if selected
    if (selectedSubcategory !== 'all' && category.subcategories) {
      // This is a simplified subcategory filter - in a real app, 
      // you'd want to add subcategory fields to your product data
      const subcategoryName = category.subcategories.find(sub => sub.id === selectedSubcategory)?.name;
      if (subcategoryName) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(subcategoryName.toLowerCase()) ||
          product.description.toLowerCase().includes(subcategoryName.toLowerCase())
        );
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => {
          const dateA = new Date(a.arrivalDate || '').getTime();
          const dateB = new Date(b.arrivalDate || '').getTime();
          return dateB - dateA;
        });
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sorting (featured first)
        filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [category, selectedSubcategory, searchQuery, sortBy]);

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const hasMoreProducts = displayedProducts.length < totalProducts;
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
  }, [filteredProducts, productsPerPage]);

  // Load more products function
  const loadMoreProducts = async () => {
    if (isLoadingMore || !hasMoreProducts) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * productsPerPage;
    
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };

  // Handle products per page change
  const handleProductsPerPageChange = (newCount: number) => {
    setProductsPerPage(newCount);
    setCurrentPage(1);
    setDisplayedProducts(filteredProducts.slice(0, newCount));
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </MobileLayout>
    );
  }

  if (!category) {
    return (
      <MobileLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Link href="/categories">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
       
        <div className="container mx-auto px-4 py-6">
          {/* Subcategories Filter */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Type</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    selectedSubcategory === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All Types
                </button>
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {subcategory.name} ({subcategory.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={`Search in ${category.name}...`}
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <button
                  aria-label="View Mode Toggle"
                  id="viewModeToggle"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  aria-label="View Mode Toggle"
                  id="viewModeToggle"
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                aria-label="Sort By"
                id="sortBy"
                className="text-sm border rounded-lg px-3 py-2 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          {filteredProducts.length > 0 ? (
            <div className="space-y-6">
              {/* Results Summary and Display Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-gray-600">
                    Showing {displayedProducts.length} of {totalProducts} products
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedSubcategory !== 'all' && (
                      <span>
                        {' '}in {category.subcategories?.find(sub => sub.id === selectedSubcategory)?.name}
                      </span>
                    )}
                  </p>
                  {totalProducts > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>
                
                {/* Products per page selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Show:</span>
                  <select
                    aria-label="Products per page"
                    id="productsPerPage"
                    className="text-sm border rounded-lg px-3 py-1 bg-white min-w-[80px]"
                    value={productsPerPage}
                    onChange={(e) => handleProductsPerPageChange(Number(e.target.value))}
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                  <span className="text-sm text-gray-600">per page</span>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`${
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'
                  : 'space-y-4'
              }`}>
                {displayedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fadeInUp"
                    style={{
                      animationDelay: `${(index % productsPerPage) * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* Load More Button */}
              {hasMoreProducts && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={loadMoreProducts}
                    disabled={isLoadingMore}
                    className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>Load More Products ({totalProducts - displayedProducts.length} remaining)</>
                    )}
                  </Button>
                </div>
              )}
              
              {/* Pagination Info */}
              {!hasMoreProducts && totalProducts > productsPerPage && (
                <div className="text-center mt-8 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-600">
                    You've viewed all {totalProducts} products in this category.
                  </p>
                  <Button
                    onClick={() => {
                      setCurrentPage(1);
                      setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    variant="outline"
                    className="mt-3"
                  >
                    Back to Top
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSubcategory('all');
                  }}
                >
                  Clear filters
                </Button>
                <Link href="/products">
                  <Button>Browse All Products</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </MobileLayout>
    }>
      <CategoryContent />
    </Suspense>
  );
}