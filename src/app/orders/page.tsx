'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/layout/MobileLayout';
import { useOrders } from '@/contexts/OrderContext';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Download,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  MapPin,
  CreditCard,
  Copy,
  ExternalLink,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  MessageSquare,
  Phone,
  Mail,
  ShoppingCart,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export default function OrdersPage() {
  const { state: orderState, cancelOrder, reorder, getOrdersByStatus } = useOrders();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search logic
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orderState.orders;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.status.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }
      
      return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    return sorted;
  }, [orderState.orders, selectedFilter, searchQuery, sortBy, sortOrder]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in transit':
      case 'out for delivery':
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
      case 'confirmed':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'cancelled':
      case 'returned':
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  // Order Progress Component
  const OrderProgress = ({ order }: { order: any }) => {
    const steps = [
      { 
        key: 'processing', 
        label: 'Processing', 
        icon: <Clock className="h-4 w-4" />,
        description: 'Order being prepared'
      },
      { 
        key: 'confirmed', 
        label: 'Confirmed', 
        icon: <FileCheck className="h-4 w-4" />,
        description: 'Payment verified'
      },
      { 
        key: 'shipped', 
        label: 'Shipped', 
        icon: <Truck className="h-4 w-4" />,
        description: 'Package dispatched'
      },
      { 
        key: 'delivered', 
        label: 'Delivered', 
        icon: <CheckCircle2 className="h-4 w-4" />,
        description: 'Order completed'
      }
    ];

    const getStepStatus = (stepKey: string) => {
      const status = order.status.toLowerCase();
      const stepOrder = ['processing', 'confirmed', 'shipped', 'delivered'];
      const currentIndex = stepOrder.indexOf(status);
      const stepIndex = stepOrder.indexOf(stepKey);
      
      if (status === 'cancelled' || status === 'returned') {
        return stepIndex === 0 ? 'completed' : 'inactive';
      }
      
      if (stepIndex < currentIndex) return 'completed';
      if (stepIndex === currentIndex) return 'current';
      return 'inactive';
    };

    const getStepColor = (status: string) => {
      switch (status) {
        case 'completed':
          return 'bg-green-500 text-white border-green-500';
        case 'current':
          return 'bg-blue-500 text-white border-blue-500';
        default:
          return 'bg-gray-200 text-gray-400 border-gray-200';
      }
    };

    const getConnectorColor = (index: number) => {
      const status = order.status.toLowerCase();
      const stepOrder = ['processing', 'confirmed', 'shipped', 'delivered'];
      const currentIndex = stepOrder.indexOf(status);
      
      if (status === 'cancelled' || status === 'returned') {
        return index === 0 ? 'bg-green-500' : 'bg-gray-200';
      }
      
      return index < currentIndex ? 'bg-green-500' : 'bg-gray-200';
    };

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between relative px-2">
          {steps.map((step, index) => {
            const status = getStepStatus(step.key);
            return (
              <div key={step.key} className="flex flex-col items-center relative flex-1">
                {/* Connector Line */}
                {index > 0 && (
                  <div className={`absolute top-5 right-1/2 h-0.5 ${
                    getConnectorColor(index - 1)
                  } transition-all duration-300`} 
                  style={{ 
                    width: 'calc(100% - 1.25rem)',
                    zIndex: 1
                  }} />
                )}
                
                {/* Step Circle */}
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  getStepColor(status)
                } shadow-sm relative z-10 bg-white`}>
                  {step.icon}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div className={`text-sm font-semibold ${
                    status === 'completed' ? 'text-green-600' :
                    status === 'current' ? 'text-blue-600' :
                    'text-gray-400'
                  }`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress Percentage */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Order Progress</span>
            <span>{Math.round(getProgressPercentage(order.timeline))}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                order.status === 'Cancelled' || order.status === 'Returned' 
                  ? 'bg-red-500' 
                  : 'bg-gradient-to-r from-blue-500 to-green-500'
              }`}
              style={{ width: `${getProgressPercentage(order.timeline)}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in transit':
      case 'out for delivery':
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'processing':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'cancelled':
      case 'returned':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getProgressPercentage = (timeline: any[]) => {
    const completed = timeline.filter(step => step.completed).length;
    return (completed / timeline.length) * 100;
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleCopyTracking = (tracking: string) => {
    navigator.clipboard.writeText(tracking);
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  const handleReorder = (orderId: string) => {
    reorder(orderId);
  };

  const filterOptions = [
    { value: 'all', label: 'All Orders', count: orderState.orders.length },
    { value: 'processing', label: 'Processing', count: getOrdersByStatus('Processing').length },
    { value: 'confirmed', label: 'Confirmed', count: getOrdersByStatus('Confirmed').length },
    { value: 'shipped', label: 'Shipped', count: getOrdersByStatus('Shipped').length },
    { value: 'in transit', label: 'In Transit', count: getOrdersByStatus('In Transit').length },
    { value: 'delivered', label: 'Delivered', count: getOrdersByStatus('Delivered').length },
    { value: 'cancelled', label: 'Cancelled', count: getOrdersByStatus('Cancelled').length }
  ];

  if (orderState.isLoading) {
    return (
      <MobileLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-4 md:py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  My Orders
                </h1>
                <p className="text-gray-600 text-lg">
                  Track and manage your orders • {orderState.orders.length} total orders
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-600">Active Orders</div>
                  <div className="text-xl font-bold text-blue-600">
                    {orderState.orders.filter(o => !['Delivered', 'Cancelled', 'Returned'].includes(o.status)).length}
                  </div>
                </div>
                <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-600">Total Spent</div>
                  <div className="text-xl font-bold text-green-600">
                    ${orderState.orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search orders by ID or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-base"
                  />
                </div>
                
                {/* Sort Controls */}
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'total' | 'status')}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white text-sm"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="total">Sort by Total</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-3 rounded-xl"
                  >
                    {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-3 rounded-xl lg:hidden"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
              
              {/* Status Filters */}
              <div className={`mt-4 ${showFilters || 'hidden lg:block'}`}>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={selectedFilter === filter.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.value)}
                      className="rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      {filter.label}
                      {filter.count > 0 && (
                        <Badge variant="secondary" className="ml-2 bg-white/20 text-current border-0">
                          {filter.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {filteredAndSortedOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {searchQuery.trim() || selectedFilter !== 'all' ? 'No orders found' : 'No orders yet'}
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchQuery.trim() || selectedFilter !== 'all' 
                  ? 'Try adjusting your search or filters to find what you\'re looking for.'
                  : 'Start shopping to see your orders here. We\'ll track everything for you!'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {(searchQuery.trim() || selectedFilter !== 'all') && (
                  <Button 
                    variant="outline" 
                    onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
                    className="rounded-xl"
                  >
                    Clear Filters
                  </Button>
                )}
                <Link href="/products">
                  <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredAndSortedOrders.map((order) => (
                <Card key={order.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div 
                      className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors duration-200"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
                            {getStatusIcon(order.status)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">#{order.id}</h3>
                              <Badge className={`${getStatusColor(order.status)} border font-semibold px-3 py-1`}>
                                {order.status}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(order.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Package className="h-4 w-4" />
                                <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                              </div>
                              
                              {order.shippingInfo.tracking && (
                                <div className="flex items-center gap-1">
                                  <Truck className="h-4 w-4" />
                                  <span>Tracking: {order.shippingInfo.tracking}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Enhanced Progress Display */}
                            <OrderProgress order={order} />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">
                              {order.paymentMethod}
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${
                              expandedOrder === order.id ? 'rotate-90' : ''
                            }`} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Order Details - Simplified */}
                    {expandedOrder === order.id && (
                      <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50/50 to-blue-50/20">
                        <div className="p-6 space-y-6">
                          {/* Order Items */}
                          <div>
                            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                              <Package className="h-5 w-5 text-blue-600" />
                              Order Items
                            </h4>
                            <div className="grid gap-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 relative bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                      />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h5>
                                      <div className="flex flex-wrap gap-2 mb-1">
                                        {item.selectedColor && (
                                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
                                            {item.selectedColor}
                                          </span>
                                        )}
                                        {item.selectedSize && (
                                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
                                            {item.selectedSize}
                                          </span>
                                        )}
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                                          Qty: {item.quantity}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <div className="text-right">
                                      <div className="font-bold text-gray-900">${item.price.toFixed(2)}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                            {order.shippingInfo.tracking && (
                              <Button variant="outline" size="sm" className="rounded-xl">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Track Package
                              </Button>
                            )}
                            
                            <Button variant="outline" size="sm" className="rounded-xl">
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </Button>
                            
                            {order.status === 'Delivered' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleReorder(order.id)}
                                className="rounded-xl"
                              >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reorder
                              </Button>
                            )}
                            
                            {['Processing', 'Confirmed'].includes(order.status) && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleCancelOrder(order.id)}
                                className="rounded-xl text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel Order
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}