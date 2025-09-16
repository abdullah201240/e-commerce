'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/contexts/OrderContext';
import {
  Search,
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
  DollarSign,
  ShoppingCart,
  Plus,
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
  const [expanded, setExpanded] = useState(false);

  // Close actions dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActions) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showActions]);

  return (
    <>
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

        {/* Customer & Address */}
        <td className="py-4 px-4">
          <div className="flex flex-col max-w-xs">
            <span className="font-medium text-foreground truncate">
              {order.shippingInfo?.address || 'N/A'}
            </span>
            <span className="text-sm text-muted-foreground">
              {order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zip}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {order.shippingInfo?.method}
            </span>
          </div>
        </td>

        {/* Products Summary */}
        <td className="py-4 px-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">{order.items.length} items</span>
              {order.items.slice(0, 2).map((item: any, index: number) => (
                <div key={index} className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 rounded object-cover"
                    title={`${item.name} (Qty: ${item.quantity})`}
                  />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
              ))}
              {order.items.length > 2 && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">+{order.items.length - 2}</span>
              )}
            </div>
            {/* Product details with quantities */}
            <div className="space-y-1">
              {order.items.slice(0, 3).map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate max-w-24" title={item.name}>
                    {item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
                  </span>
                  <span className="font-medium text-foreground ml-2">×{item.quantity}</span>
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="text-xs text-muted-foreground">
                  +{order.items.length - 3} more items
                </div>
              )}
            </div>
          </div>
        </td>

        {/* Pricing Breakdown */}
        <td className="py-4 px-4">
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <div>Subtotal: ${order.subtotal.toFixed(2)}</div>
              <div>Shipping: ${order.shipping.toFixed(2)}</div>
              <div>Tax: ${order.tax.toFixed(2)}</div>
            </div>
          </div>
        </td>

        {/* Status & Tracking */}
        <td className="py-4 px-4">
          <div className="flex flex-col space-y-2">
            <OrderStatusBadge status={order.status} />
            {order.shippingInfo?.tracking && (
              <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                {order.shippingInfo.tracking}
              </span>
            )}
          </div>
        </td>

        {/* Payment & Notes */}
        <td className="py-4 px-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {order.paymentMethod || 'Credit Card'}
            </span>
            <span className="text-xs text-green-600 dark:text-green-400">Paid</span>
            {order.notes && (
              <span className="text-xs text-muted-foreground mt-1 truncate max-w-24" title={order.notes}>
                Notes: {order.notes}
              </span>
            )}
          </div>
        </td>

        {/* Actions */}
        <td className="py-4 px-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
              title={expanded ? "Collapse Details" : "Expand Details"}
            >
              <Eye className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
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
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
                className="text-muted-foreground hover:text-foreground"
                title="More Actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              {showActions && (
                <div 
                  className="absolute right-0 top-8 bg-card border border-border rounded-lg shadow-lg z-10 min-w-32"
                  onClick={(e) => e.stopPropagation()}
                >
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
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={() => {
                      onUpdateStatus(order.id, 'Cancelled');
                      setShowActions(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-muted text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
      
      {/* Expanded Details Row */}
      {expanded && (
        <tr className="bg-muted/30 dark:bg-muted/20">
          <td colSpan={7} className="py-6 px-4">
            <div className="space-y-6">
              {/* Products Detail */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Order Items
                </h4>
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 bg-background dark:bg-card p-3 rounded-lg border border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-foreground">{item.name}</h5>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          {item.selectedColor && (
                            <span className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-1 border border-border" 
                                style={{ backgroundColor: item.selectedColor.toLowerCase() }}
                              />
                              {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span>Size: {item.selectedSize}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">Qty: {item.quantity}</div>
                        <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
                        <div className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <Truck className="h-4 w-4 mr-2" />
                    Delivery Information
                  </h4>
                  <div className="bg-background dark:bg-card p-4 rounded-lg border border-border space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Address:</span>
                      <p className="text-sm font-medium text-foreground">{order.shippingInfo?.address}</p>
                      <p className="text-sm text-foreground">{order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zip}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Shipping Method:</span>
                      <p className="text-sm font-medium text-foreground">{order.shippingInfo?.method}</p>
                    </div>
                    {order.shippingInfo?.estimatedDelivery && (
                      <div>
                        <span className="text-sm text-muted-foreground">Estimated Delivery:</span>
                        <p className="text-sm font-medium text-foreground">
                          {new Date(order.shippingInfo.estimatedDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {order.shippingInfo?.tracking && (
                      <div>
                        <span className="text-sm text-muted-foreground">Tracking Number:</span>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 font-mono">
                          {order.shippingInfo.tracking}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Payment & Pricing
                  </h4>
                  <div className="bg-background dark:bg-card p-4 rounded-lg border border-border space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Subtotal:</span>
                      <span className="text-sm font-medium text-foreground">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Shipping:</span>
                      <span className="text-sm font-medium text-foreground">${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tax:</span>
                      <span className="text-sm font-medium text-foreground">${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold text-foreground">Total:</span>
                        <span className="text-sm font-bold text-foreground">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm text-muted-foreground">Payment Method:</span>
                      <p className="text-sm font-medium text-foreground">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              {order.timeline && order.timeline.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Order Timeline
                  </h4>
                  <div className="bg-background dark:bg-card p-4 rounded-lg border border-border">
                    <div className="space-y-3">
                      {order.timeline.map((event: any, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            event.completed 
                              ? 'bg-green-500' 
                              : 'bg-muted-foreground'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-medium ${
                                event.completed 
                                  ? 'text-foreground' 
                                  : 'text-muted-foreground'
                              }`}>
                                {event.status}
                              </span>
                              {event.date && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            {event.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {order.notes && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Order Notes</h4>
                  <div className="bg-background dark:bg-card p-4 rounded-lg border border-border">
                    <p className="text-sm text-foreground">{order.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminOrdersPage() {
  const { state, updateOrder, updateOrderStatus } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    setEditingOrder({ ...order });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingOrder) {
      // Update the order in the context
      updateOrder(editingOrder);
      setShowEditModal(false);
      setEditingOrder(null);
      console.log('Order updated successfully:', editingOrder.id);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingOrder(null);
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

        {/* Orders Table with Integrated Filters */}
        <Card className="border-0 shadow-lg flex flex-col h-[calc(100vh-200px)]">
         

          {/* Integrated Filters and Actions */}
          <div className="flex-shrink-0 bg-muted/20 dark:bg-muted/10 border-b border-border p-4">
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

                {/* Items per page */}
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link href="/admin/orders/create">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Order
                  </Button>
                </Link>
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
          </div>
          {/* Scrollable Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Fixed Table Header */}
            <div className="flex-shrink-0 bg-muted/50 dark:bg-muted/30 border-b border-border">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID & Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Delivery Address</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Products & Quantities</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Pricing Details</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status & Tracking</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment & Notes</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
              </table>
            </div>
            
            {/* Scrollable Table Body */}
            <div className="flex-1 overflow-auto">
              <table className="w-full">
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

            {/* Fixed Pagination */}
            {totalPages > 1 && (
              <div className="flex-shrink-0 bg-background border-t border-border px-6 py-4 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* First Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="hidden sm:block"
                    >
                      First
                    </Button>
                    
                    {/* Previous */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`w-8 h-8 p-0 ${
                              currentPage === pageNumber 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:bg-muted"
                            }`}
                          >
                            {pageNumber}
                          </Button>
                        );
                      })}
                    </div>
                    
                    {/* Next */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                    
                    {/* Last Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="hidden sm:block"
                    >
                      Last
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Edit Order Modal */}
      {showEditModal && editingOrder && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCancelEdit}
        >
          <div 
            className="bg-background dark:bg-card border border-border rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Edit Order {editingOrder.id}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Order Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Order Status</label>
                    <select
                      value={editingOrder.status}
                      onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
                    <Input
                      value={editingOrder.paymentMethod || ''}
                      onChange={(e) => setEditingOrder({ ...editingOrder, paymentMethod: e.target.value })}
                      placeholder="Credit Card, PayPal, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Order Notes</label>
                    <textarea
                      value={editingOrder.notes || ''}
                      onChange={(e) => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-24 resize-none"
                      placeholder="Add any notes about this order..."
                    />
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Shipping Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                    <Input
                      value={editingOrder.shippingInfo?.address || ''}
                      onChange={(e) => setEditingOrder({
                        ...editingOrder,
                        shippingInfo: { ...editingOrder.shippingInfo, address: e.target.value }
                      })}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City</label>
                      <Input
                        value={editingOrder.shippingInfo?.city || ''}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder,
                          shippingInfo: { ...editingOrder.shippingInfo, city: e.target.value }
                        })}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">State</label>
                      <Input
                        value={editingOrder.shippingInfo?.state || ''}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder,
                          shippingInfo: { ...editingOrder.shippingInfo, state: e.target.value }
                        })}
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                      <Input
                        value={editingOrder.shippingInfo?.zip || ''}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder,
                          shippingInfo: { ...editingOrder.shippingInfo, zip: e.target.value }
                        })}
                        placeholder="ZIP Code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Tracking Number</label>
                      <Input
                        value={editingOrder.shippingInfo?.tracking || ''}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder,
                          shippingInfo: { ...editingOrder.shippingInfo, tracking: e.target.value }
                        })}
                        placeholder="Tracking number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Shipping Method</label>
                    <select
                      value={editingOrder.shippingInfo?.method || ''}
                      onChange={(e) => setEditingOrder({
                        ...editingOrder,
                        shippingInfo: { ...editingOrder.shippingInfo, method: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select shipping method</option>
                      <option value="Standard Shipping (3-5 business days)">Standard Shipping (3-5 business days)</option>
                      <option value="Express Shipping (1-2 business days)">Express Shipping (1-2 business days)</option>
                      <option value="Overnight Shipping">Overnight Shipping</option>
                      <option value="White Glove Delivery">White Glove Delivery</option>
                      <option value="Local Pickup">Local Pickup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Estimated Delivery</label>
                    <Input
                      type="date"
                      value={editingOrder.shippingInfo?.estimatedDelivery || ''}
                      onChange={(e) => setEditingOrder({
                        ...editingOrder,
                        shippingInfo: { ...editingOrder.shippingInfo, estimatedDelivery: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Pricing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subtotal</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingOrder.subtotal || 0}
                      onChange={(e) => {
                        const subtotal = parseFloat(e.target.value) || 0;
                        const total = subtotal + editingOrder.shipping + editingOrder.tax;
                        setEditingOrder({ ...editingOrder, subtotal, total });
                      }}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Shipping</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingOrder.shipping || 0}
                      onChange={(e) => {
                        const shipping = parseFloat(e.target.value) || 0;
                        const total = editingOrder.subtotal + shipping + editingOrder.tax;
                        setEditingOrder({ ...editingOrder, shipping, total });
                      }}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tax</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingOrder.tax || 0}
                      onChange={(e) => {
                        const tax = parseFloat(e.target.value) || 0;
                        const total = editingOrder.subtotal + editingOrder.shipping + tax;
                        setEditingOrder({ ...editingOrder, tax, total });
                      }}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Total</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingOrder.total || 0}
                      onChange={(e) => setEditingOrder({ ...editingOrder, total: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Order Items</h3>
                <div className="space-y-3">
                  {editingOrder.items?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border border-border rounded-lg bg-muted/30">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                          {item.selectedSize && ` • Size: ${item.selectedSize}`}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Quantity</label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const newItems = [...editingOrder.items];
                              newItems[index] = { ...item, quantity: parseInt(e.target.value) || 1 };
                              const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                              const newTotal = newSubtotal + editingOrder.shipping + editingOrder.tax;
                              setEditingOrder({ ...editingOrder, items: newItems, subtotal: newSubtotal, total: newTotal });
                            }}
                            className="w-20"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Price</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => {
                              const newItems = [...editingOrder.items];
                              newItems[index] = { ...item, price: parseFloat(e.target.value) || 0 };
                              const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                              const newTotal = newSubtotal + editingOrder.shipping + editingOrder.tax;
                              setEditingOrder({ ...editingOrder, items: newItems, subtotal: newSubtotal, total: newTotal });
                            }}
                            className="w-24"
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Total</div>
                          <div className="font-medium text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}