'use client';

import React, { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { products, categories } from '@/data/products';
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Download,
  Upload,
  Settings,
} from 'lucide-react';

// Product Status Badge Component
function ProductStatusBadge({ inStock, featured }: { inStock: boolean; featured: boolean }) {
  if (!inStock) {
    return (
      <Badge variant="destructive" className="text-xs">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Out of Stock
      </Badge>
    );
  }
  
  if (featured) {
    return (
      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
        <TrendingUp className="h-3 w-3 mr-1" />
        Featured
      </Badge>
    );
  }
  
  return (
    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
      <CheckCircle className="h-3 w-3 mr-1" />
      In Stock
    </Badge>
  );
}

// Product Row Component
interface ProductRowProps {
  product: typeof products[0];
  onEdit: (product: typeof products[0]) => void;
  onDelete: (productId: string) => void;
  onView: (product: typeof products[0]) => void;
}

function ProductRow({ product, onEdit, onDelete, onView }: ProductRowProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Product Info */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 truncate">{product.name}</p>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          </div>
        </div>
      </td>

      {/* SKU/ID */}
      <td className="py-4 px-4 text-sm text-gray-600 font-mono">
        #{product.id}
      </td>

      {/* Price */}
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-xs text-red-600 font-medium">
              -{discountPercentage}% off
            </span>
          )}
        </div>
      </td>

      {/* Stock Status */}
      <td className="py-4 px-4">
        <ProductStatusBadge inStock={product.inStock} featured={product.featured} />
      </td>

      {/* Rating */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">{product.rating}</span>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(product)}
            className="text-gray-600 hover:text-blue-600"
            title="View Product"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(product)}
            className="text-gray-600 hover:text-blue-600"
            title="Edit Product"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(product.id)}
            className="text-gray-600 hover:text-red-600"
            title="Delete Product"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800"
            title="More Actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Status filter
    if (statusFilter === 'instock') {
      filtered = filtered.filter(product => product.inStock);
    } else if (statusFilter === 'outofstock') {
      filtered = filtered.filter(product => !product.inStock);
    } else if (statusFilter === 'featured') {
      filtered = filtered.filter(product => product.featured);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleEdit = (product: typeof products[0]) => {
    console.log('Edit product:', product);
    // TODO: Open edit modal or navigate to edit page
  };

  const handleDelete = (productId: string) => {
    console.log('Delete product:', productId);
    // TODO: Show confirmation dialog and delete
  };

  const handleView = (product: typeof products[0]) => {
    console.log('View product:', product);
    // TODO: Open product details modal or navigate to view page
  };

  const handleAddProduct = () => {
    console.log('Add new product');
    // TODO: Open add product modal or navigate to add page
  };

  // Stats
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const featuredProducts = products.filter(p => p.featured).length;

  return (
    <AdminLayout title="Products" subtitle="Manage your product catalog and inventory">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Stock</p>
                  <p className="text-3xl font-bold text-green-600">{inStockProducts}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                  <p className="text-3xl font-bold text-red-600">{outOfStockProducts}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <p className="text-3xl font-bold text-yellow-600">{featuredProducts}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products by name, category, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="instock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                  <option value="featured">Featured</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button onClick={handleAddProduct} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Products ({filteredProducts.length})</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <ProductRow
                        key={product.id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No products found</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Try adjusting your search or filter criteria
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}