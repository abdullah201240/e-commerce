'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/data/products';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu,
  X,
  ChevronDown,
  Package,
  Grid3X3,
  Clock,
  TrendingUp,
  Star,
  Filter
} from 'lucide-react';

export default function Header() {
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { state } = useCart();

  // Mock search suggestions
  const popularSearches = [
    'Modern Sofa', 'Dining Table', 'Bedroom Set', 'Office Chair', 
    'Coffee Table', 'Bookshelf', 'Wardrobe', 'TV Stand'
  ];

  const recentSearches = [
    'Leather Armchair', 'Glass Dining Table', 'King Size Bed'
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search suggestions logic
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = popularSearches.filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setCategoryDropdownOpen(false);
      setOrderDropdownOpen(false);
      setProfileDropdownOpen(false);
      setIsSearchFocused(false);
    }
  };
  
  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!isCategoryDropdownOpen);
    if (isCategoryDropdownOpen) setHoveredCategory(null);
    setIsSearchFocused(false);
  };
  
  const toggleOrderDropdown = () => {
    setOrderDropdownOpen(!isOrderDropdownOpen);
    setProfileDropdownOpen(false);
    setIsSearchFocused(false);
  };
  
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
    setOrderDropdownOpen(false);
    setIsSearchFocused(false);
  };

  const handleCategoryHover = (categoryId: string | null) => {
    if (isCategoryDropdownOpen) {
      setHoveredCategory(categoryId);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setCategoryDropdownOpen(false);
    setOrderDropdownOpen(false);
    setProfileDropdownOpen(false);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  const handleSearchSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsSearchFocused(false);
    // Handle search logic here
  };

  // Mock recent orders
  const recentOrders = [
    { id: '12345', date: '2024-01-15', status: 'Delivered', total: 299.99 },
    { id: '12344', date: '2024-01-10', status: 'In Transit', total: 599.99 },
    { id: '12343', date: '2024-01-05', status: 'Processing', total: 149.99 }
  ];

  // Filter categories for display
  const displayCategories = categories.filter(cat => cat.id !== 'all');

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg backdrop-blur-sm bg-white/95' : 'shadow-sm'
    }`}>
      {/* Main header */}
      <div className="container mx-auto px-4 xl:px-6 py-4 lg:py-5">
        <div className="flex items-center justify-between gap-6 lg:gap-8">
          
          {/* Company Name */}
          <Link href="/" className={`text-2xl lg:text-3xl font-bold text-gray-900 hover:text-gray-700 transition-all duration-300 flex-shrink-0 hover:scale-105 ${
            isScrolled ? 'transform scale-95' : ''
          }`}>
            <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
              FurniStore
            </span>
          </Link>

          {/* Category Dropdown - Improved Spacing and Icons */}
          <div className="relative hidden lg:block">
            <Button
              variant="outline"
              size="lg"
              className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-all duration-300 hover:shadow-md hover:scale-105 border-gray-300 ${
                isCategoryDropdownOpen ? 'bg-blue-50 border-blue-300 shadow-md' : ''
              }`}
              onClick={toggleCategoryDropdown}
            >
              <Grid3X3 className={`h-6 w-6 transition-all duration-300 ${
                isCategoryDropdownOpen ? 'text-blue-600 rotate-12' : ''
              }`} />
              <span className={`font-medium text-base transition-all duration-300 ${
                isCategoryDropdownOpen ? 'text-blue-600' : ''
              }`}>Categories</span>
              <ChevronDown className={`h-5 w-5 transition-all duration-300 ${
                isCategoryDropdownOpen ? 'rotate-180 text-blue-600' : ''
              }`} />
            </Button>

            {/* Enhanced Category Dropdown */}
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 flex bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 animate-slideDown overflow-hidden min-w-max">
                {/* Main Categories */}
                <div className="w-72">
                  
                  <div className="space-y-2">
                    {displayCategories.map((category, index) => (
                      <div key={category.id} className="group">
                        <div
                          className={`flex items-center justify-between p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 cursor-pointer ${
                            hoveredCategory === category.id ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' : ''
                          }`}
                          onMouseEnter={() => handleCategoryHover(category.id)}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <Link
                            href={`/products?category=${category.id}`}
                            className="flex-1 flex items-center justify-between"
                            onClick={() => setCategoryDropdownOpen(false)}
                          >
                            <span className={`font-semibold text-base transition-all duration-300 ${
                              hoveredCategory === category.id ? 'text-blue-600 translate-x-2' : 'text-gray-900'
                            }`}>
                              {category.name}
                            </span>
                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {category.count}
                            </span>
                          </Link>
                          {category.subcategories && category.subcategories.length > 0 && (
                            <ChevronDown className={`h-5 w-5 ml-3 transition-all duration-300 ${
                              hoveredCategory === category.id ? 'rotate-270 text-blue-600' : 'rotate-270 text-gray-400'
                            }`} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Subcategories Panel */}
                {hoveredCategory && (
                  <div className="w-80 bg-gradient-to-br from-gray-50 to-blue-50/30 animate-slideDown border-l border-gray-100">
                    {(() => {
                      const category = displayCategories.find(cat => cat.id === hoveredCategory);
                      return category && category.subcategories ? (
                        <div>
                         
                          <div className="grid grid-cols-1 gap-3">
                            {category.subcategories.map((subcategory, index) => (
                              <Link
                                key={subcategory.id}
                                href={`/products?category=${category.id}&subcategory=${subcategory.id}`}
                                className="flex items-center justify-between p-3 hover:bg-white hover:shadow-md rounded-xl transition-all duration-300 group animate-fadeInUp border border-transparent hover:border-blue-100"
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => setCategoryDropdownOpen(false)}
                              >
                                <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                  {subcategory.name}
                                </span>
                                <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600">
                                  {subcategory.count}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                          <Grid3X3 className="h-8 w-8 mb-2 opacity-50" />
                          <span className="text-sm">No subcategories available</span>
                        </div>
                      );
                    })()} 
                  </div>
                )}
                
                {/* View All Categories Link */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <Link
                    href="/categories"
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300 group"
                    onClick={() => setCategoryDropdownOpen(false)}
                  >
                    <span>View All Categories</span>
                    <ChevronDown className="h-4 w-4 rotate-270 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex items-center flex-1 max-w-2xl relative">
            <div className="relative w-full group">
              <Search className={`absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${
                isSearchFocused || searchQuery ? 'text-blue-500 scale-110' : 'text-gray-400'
              }`} />
              <Input
                type="text"
                placeholder="Search for furniture, decor, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className={`pl-14 pr-12 py-4 w-full border-2 rounded-2xl transition-all duration-300 text-base ${
                  isSearchFocused ? 'ring-2 ring-blue-500 border-blue-300 shadow-lg bg-white' : 
                  isScrolled ? 'border-blue-200 bg-white shadow-sm hover:border-blue-300' : 
                  'border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400'
                } hover:shadow-md focus:shadow-lg`}
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Enhanced Search Suggestions */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slideDown">
                  {searchSuggestions.length > 0 ? (
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Search className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Search Results</span>
                      </div>
                      <div className="space-y-1">
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearchSelect(suggestion)}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl transition-all duration-200 flex items-center gap-3 group"
                          >
                            <TrendingUp className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                            <span className="font-medium text-gray-700 group-hover:text-blue-600">{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      {/* Popular Searches */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Popular Searches</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {popularSearches.slice(0, 6).map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSelect(search)}
                              className="px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Recent Searches */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Recent Searches</span>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSelect(search)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-3 group"
                            >
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span className="text-sm text-gray-600 group-hover:text-gray-800">{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Profile Dropdown */}
            <div className="relative hidden sm:block">
              <Button
                variant="ghost"
                size="lg"
                className={`p-3 transition-all duration-300 hover:scale-110 hover:bg-blue-50 rounded-xl ${
                  isProfileDropdownOpen ? 'bg-blue-50 text-blue-600 scale-105 shadow-md' : 'hover:text-blue-600'
                }`}
                onClick={toggleProfileDropdown}
              >
                <User className={`h-6 w-6 transition-all duration-300 ${
                  isProfileDropdownOpen ? 'text-blue-600' : ''
                }`} />
              </Button>

              {/* Enhanced Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 animate-slideDown overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-base">John Doe</p>
                        <p className="text-sm text-gray-500">john.doe@example.com</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/account"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 group-hover:text-blue-600" />
                        <span className="group-hover:text-blue-600">My Account</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Package className="h-4 w-4 group-hover:text-blue-600" />
                        <span className="group-hover:text-blue-600">Order History</span>
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Heart className="h-4 w-4 group-hover:text-red-500" />
                        <span className="group-hover:text-red-500">Wishlist</span>
                      </Link>
                      <hr className="my-3" />
                      <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                        <X className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Order Dropdown */}
            <div className="relative hidden sm:block">
              <Button
                variant="ghost"
                size="lg"
                className={`p-3 relative transition-all duration-300 hover:scale-110 hover:bg-blue-50 rounded-xl ${
                  isOrderDropdownOpen ? 'bg-blue-50 text-blue-600 scale-105 shadow-md' : 'hover:text-blue-600'
                }`}
                onClick={toggleOrderDropdown}
              >
                <Package className={`h-6 w-6 transition-all duration-300 ${
                  isOrderDropdownOpen ? 'text-blue-600' : ''
                }`} />
                {recentOrders.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold animate-pulse hover:animate-bounce"
                  >
                    {recentOrders.length}
                  </Badge>
                )}
              </Button>

              {/* Enhanced Order Dropdown */}
              {isOrderDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 animate-slideDown overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="h-5 w-5 text-blue-600" />
                      <h3 className="font-bold text-gray-900 text-lg">Recent Orders</h3>
                    </div>
                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                          <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-all duration-200 hover:shadow-md animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-bold text-gray-900">Order #{order.id}</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                'bg-orange-100 text-orange-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                {new Date(order.date).toLocaleDateString()}
                              </span>
                              <span className="font-bold text-gray-900 text-lg">${order.total}</span>
                            </div>
                          </div>
                        ))}
                        <div className="pt-4 border-t border-gray-200">
                          <Link
                            href="/orders"
                            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
                            onClick={() => setOrderDropdownOpen(false)}
                          >
                            <Package className="h-4 w-4" />
                            <span>View All Orders</span>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4 font-medium">No orders yet</p>
                        <Link
                          href="/products"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold"
                          onClick={() => setOrderDropdownOpen(false)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Start Shopping</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Cart */}
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="lg"
                className="relative p-3 transition-all duration-300 hover:scale-110 hover:bg-green-50 hover:text-green-600 group rounded-xl"
              >
                <ShoppingCart className={`h-6 w-6 transition-all duration-300 group-hover:text-green-600 ${
                  state.itemCount > 0 ? 'text-green-600' : ''
                }`} />
                {state.itemCount > 0 && (
                  <>
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold bg-green-500 hover:bg-green-600 animate-bounce"
                    >
                      {state.itemCount > 99 ? '99+' : state.itemCount}
                    </Badge>
                    <div className="absolute inset-0 rounded-xl bg-green-500/10 animate-ping"></div>
                  </>
                )}
              </Button>
            </Link>

            {/* Enhanced Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="lg"
              className={`lg:hidden p-3 transition-all duration-300 hover:scale-110 hover:bg-blue-50 rounded-xl ${
                isMenuOpen ? 'bg-blue-50 text-blue-600 rotate-90 shadow-md' : 'hover:text-blue-600'
              }`}
              onClick={toggleMenu}
            >
              {isMenuOpen ? 
                <X className="h-6 w-6 transition-all duration-300 rotate-180" /> : 
                <Menu className="h-6 w-6 transition-all duration-300" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Search - Enhanced for tablets */}
        <div className="hidden sm:block md:hidden mt-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-all duration-300" />
            <Input
              type="text"
              placeholder="Search furniture, decor..."
              className="pl-12 pr-4 py-4 w-full border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-gray-50 hover:bg-white transition-all duration-300 hover:shadow-md focus:shadow-lg text-base"
            />
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 py-6 border-t border-gray-200 animate-slideDown bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-inner">
            {/* Mobile Search for smallest screens */}
            <div className="sm:hidden mb-6 px-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-all duration-300" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-12 pr-4 py-3 w-full border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white transition-all duration-300 hover:shadow-md focus:shadow-lg"
                />
              </div>
            </div>
            
            <nav className="flex flex-col">
              {/* Mobile Category Menu */}
              <div className="mb-6 px-4">
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  Categories
                </h4>
                <div className="space-y-2">
                  {displayCategories.map((category, index) => (
                    <div key={category.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 50}ms` }}>
                      <Link 
                        href={`/products?category=${category.id}`}
                        className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-xl mx-2 group"
                        onClick={toggleMenu}
                      >
                        <span className="font-semibold group-hover:translate-x-2 transition-transform duration-300">{category.name}</span>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600">{category.count}</span>
                      </Link>
                      {category.subcategories && (
                        <div className="ml-8 mr-4 space-y-1 border-l-2 border-gray-100 pl-6 mt-3">
                          {category.subcategories.map((sub, subIndex) => (
                            <Link
                              key={sub.id}
                              href={`/products?category=${category.id}&subcategory=${sub.id}`}
                              className="block text-sm font-medium text-gray-600 hover:text-blue-600 py-2 transition-all duration-300 hover:translate-x-2 animate-fadeInUp rounded-lg hover:bg-blue-50 px-3"
                              style={{ animationDelay: `${(index * 50) + (subIndex * 25)}ms` }}
                              onClick={toggleMenu}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Mobile User Actions */}
              <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-gray-200 px-4">
                <Link href="/account" onClick={toggleMenu}>
                  <Button variant="ghost" className="flex flex-col items-center justify-center space-y-2 w-full py-4 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-xl group h-20">
                    <User className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold text-sm">Account</span>
                  </Button>
                </Link>
                <Link href="/orders" onClick={toggleMenu}>
                  <Button variant="ghost" className="flex flex-col items-center justify-center space-y-2 w-full py-4 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-xl group h-20">
                    <Package className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold text-sm">Orders</span>
                  </Button>
                </Link>
                <Link href="/wishlist" onClick={toggleMenu}>
                  <Button variant="ghost" className="flex flex-col items-center justify-center space-y-2 w-full py-4 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-xl group h-20">
                    <Heart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold text-sm">Wishlist</span>
                  </Button>
                </Link>
                <Link href="/cart" onClick={toggleMenu}>
                  <Button className="flex flex-col items-center justify-center space-y-2 w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 rounded-xl group h-20 relative">
                    <div className="relative">
                      <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      {state.itemCount > 0 && (
                        <Badge variant="secondary" className="absolute -top-2 -right-2 h-4 w-4 p-0 bg-green-500 text-white text-xs flex items-center justify-center">
                          {state.itemCount > 99 ? '99+' : state.itemCount}
                        </Badge>
                      )}
                    </div>
                    <span className="font-semibold text-sm">Cart</span>
                  </Button>
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 px-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                  <h5 className="font-bold text-gray-900 mb-3 text-sm">Quick Actions</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/categories" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full justify-start text-left py-2 px-3 hover:bg-white transition-all duration-300 rounded-lg group">
                        <Filter className="h-4 w-4 mr-2 group-hover:text-blue-600" />
                        <span className="text-sm group-hover:text-blue-600">All Categories</span>
                      </Button>
                    </Link>
                    <Link href="/deals" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full justify-start text-left py-2 px-3 hover:bg-white transition-all duration-300 rounded-lg group">
                        <Star className="h-4 w-4 mr-2 group-hover:text-yellow-500" />
                        <span className="text-sm group-hover:text-yellow-600">Best Deals</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {(isCategoryDropdownOpen || isOrderDropdownOpen || isProfileDropdownOpen || isSearchFocused) && (
        <div 
          className="fixed inset-0 z-40 bg-black/5" 
          onClick={() => {
            setCategoryDropdownOpen(false);
            setOrderDropdownOpen(false);
            setProfileDropdownOpen(false);
            setIsSearchFocused(false);
          }}
        />
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}