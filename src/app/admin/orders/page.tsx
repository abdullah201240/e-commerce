'use client';

import React, { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/contexts/OrderContext';
import {
  Search,
  Filter,
  Eye,
  Edit3,
  Truck,
  CheckCircle,
  Clock,
  Package,
  AlertTriangle,
  MoreHorizontal,
  Download,
  RefreshCw,
  Calendar,
  DollarSign,
  ShoppingCart,
  Users,
} from 'lucide-react';

// Order Status Badge Component
function OrderStatusBadge({ status }: { status: string }) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          icon: CheckCircle,
          className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
          color: 'text-green-600 dark:text-green-400'
        };
      case 'shipped':
      case 'in transit':
      case 'out for delivery':
        return {
          icon: Truck,
          className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
          color: 'text-blue-600 dark:text-blue-400'
        };
      case 'processing':
      case 'confirmed':
        return {
          icon: Clock,
          className: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
          color: 'text-orange-600 dark:text-orange-400'
        };
      case 'cancelled':
      case 'returned':
        return {
          icon: AlertTriangle,
          className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
          color: 'text-red-600 dark:text-red-400'
        };
      default:
        return {
          icon: Package,
          className: 'bg-muted text-muted-foreground border-border',
          color: 'text-muted-foreground'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} text-xs font-medium border`}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </Badge>
  );
}

// Order Row Component
interface OrderRowProps {
  order: any;
  onView: (order: any) => void;
  onEdit: (order: any) => void;
  onUpdateStatus: (orderId: string, status: string) => void;
}

function OrderRow({ order, onView, onEdit, onUpdateStatus }: OrderRowProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr className="border-b border-border hover:bg-muted/50 transition-colors">
      {/* Order ID */}
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{order.id}</span>
          <span className="text-sm text-muted-foreground">
            {new Date(order.date).toLocaleDateString()}
          </span>
        </div>
      </td>

      {/* Customer */}
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {order.shippingInfo?.address ? order.shippingInfo.address.split(',')[0] : 'N/A'}
          </span>
          <span className="text-sm text-muted-foreground">
            {order.shippingInfo?.city}, {order.shippingInfo?.state}
          </span>
        </div>
      </td>

      {/* Items */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-foreground">{order.items.length} items</span>
          {order.items.slice(0, 3).map((item: any, index: number) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="w-6 h-6 rounded object-cover"
              title={item.name}
            />
          ))}
          {order.items.length > 3 && (
            <span className="text-xs text-muted-foreground">+{order.items.length - 3}</span>
          )}
        </div>
      </td>

      {/* Total */}
      <td className="py-4 px-4">
        <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <OrderStatusBadge status={order.status} />
      </td>

      {/* Payment */}
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {order.paymentMethod || 'Credit Card'}
          </span>
          <span className="text-xs text-green-600 dark:text-green-400">Paid</span>
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(order)}
            className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
            title="View Order"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(order)}
            className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
            title="Edit Order"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              className="text-muted-foreground hover:text-foreground"
              title="More Actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {showActions && (
              <div className="absolute right-0 top-8 bg-card border border-border rounded-lg shadow-lg z-10 min-w-32">
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'Confirmed');
                    setShowActions(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-muted text-foreground"
                >
                  Mark Confirmed
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'Shipped');
                    setShowActions(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-muted text-foreground"
                >
                  Mark Shipped
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'Delivered');
                    setShowActions(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-muted text-foreground"
                >
                  Mark Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function AdminOrdersPage() {
  const { state, updateOrderStatus } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let filtered = [...state.orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(query) ||
        order.shippingInfo?.address?.toLowerCase().includes(query) ||
        order.items.some((item: any) => item.name.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(order => new Date(order.date) >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(order => new Date(order.date) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(order => new Date(order.date) >= filterDate);
          break;
      }
    }

    // Sort
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'total':
        filtered.sort((a, b) => b.total - a.total);
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    return filtered;
  }, [state.orders, searchQuery, statusFilter, dateFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleView = (order: any) => {
    console.log('View order:', order);
    // TODO: Open order details modal or navigate to view page
  };

  const handleEdit = (order: any) => {
    console.log('Edit order:', order);
    // TODO: Open edit modal or navigate to edit page
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status as any);
  };

  // Calculate stats
  const totalOrders = state.orders.length;
  const pendingOrders = state.orders.filter(o => o.status === 'Processing').length;
  const shippedOrders = state.orders.filter(o => ['Shipped', 'In Transit', 'Out for Delivery'].includes(o.status)).length;
  const deliveredOrders = state.orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <AdminLayout title="Orders" subtitle="Manage customer orders and track fulfillment">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-bold text-foreground">{totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Shipped</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{shippedOrders}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Truck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{deliveredOrders}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search orders by ID, customer, or items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="in transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {/* Date Filter */}
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
                >
                  <option value="date">Sort by Date</option>
                  <option value="total">Sort by Total</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Orders ({filteredOrders.length})</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 dark:bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <OrderRow
                        key={order.id}
                        order={order}
                        onView={handleView}
                        onEdit={handleEdit}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-foreground">No orders found</p>
                        <p className="text-sm text-muted-foreground mt-1">
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
              <div className="border-t border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
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