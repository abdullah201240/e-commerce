'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import MobileLayout from '@/components/layout/MobileLayout';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Download,
  RefreshCw
} from 'lucide-react';

// Mock orders data
const mockOrders = [
  {
    id: '12345',
    date: '2024-01-15',
    status: 'Delivered',
    total: 299.99,
    items: [
      {
        id: '1',
        name: 'Modern 3-Seater Sofa',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        price: 299.99,
        quantity: 1
      }
    ],
    shipping: {
      address: '123 Main St, City, State 12345',
      method: 'Standard Shipping',
      tracking: 'TRK123456789'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-12', completed: true },
      { status: 'Processing', date: '2024-01-13', completed: true },
      { status: 'Shipped', date: '2024-01-14', completed: true },
      { status: 'Delivered', date: '2024-01-15', completed: true }
    ]
  },
  {
    id: '12344',
    date: '2024-01-10',
    status: 'In Transit',
    total: 599.99,
    items: [
      {
        id: '8',
        name: 'Wooden Dining Table',
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
        price: 599.99,
        quantity: 1
      }
    ],
    shipping: {
      address: '123 Main St, City, State 12345',
      method: 'Express Shipping',
      tracking: 'TRK123456788'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-08', completed: true },
      { status: 'Processing', date: '2024-01-09', completed: true },
      { status: 'Shipped', date: '2024-01-10', completed: true },
      { status: 'Out for Delivery', date: '2024-01-11', completed: false }
    ]
  },
  {
    id: '12343',
    date: '2024-01-05',
    status: 'Processing',
    total: 149.99,
    items: [
      {
        id: '13',
        name: 'Storage Ottoman',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop',
        price: 149.99,
        quantity: 1
      }
    ],
    shipping: {
      address: '123 Main St, City, State 12345',
      method: 'Standard Shipping',
      tracking: null
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-05', completed: true },
      { status: 'Processing', date: '2024-01-06', completed: false },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  }
];

export default function OrdersPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in transit':
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in transit':
      case 'shipped':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'processing':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <MobileLayout mobileTitle="My Orders">
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              My Orders
            </h1>
            <p className="text-gray-600">
              Track and manage your orders
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'processing', 'shipped', 'delivered'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                {filter === 'all' ? 'All Orders' : filter}
              </Button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No orders found
              </h2>
              <p className="text-gray-600 mb-6">
                You don't have any orders matching the selected filter.
              </p>
              <Link href="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    {/* Order Header */}
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Order #{order.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge className={`${getStatusColor(order.status)} border`}>
                            {order.status}
                          </Badge>
                          <p className="text-lg font-semibold text-gray-900 mt-1">
                            ${order.total}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className={`h-4 w-4 transition-transform ${
                            expandedOrder === order.id ? 'rotate-90' : ''
                          }`} />
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Order Details */}
                    {expandedOrder === order.id && (
                      <div className="mt-6 space-y-6">
                        <Separator />

                        {/* Order Items */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{item.name}</h5>
                                  <p className="text-sm text-gray-600">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                                <div className="font-medium text-gray-900">
                                  ${item.price}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping Info */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Shipping Information</h4>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="text-gray-900">{order.shipping.address}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Method:</span>
                              <span className="text-gray-900">{order.shipping.method}</span>
                            </div>
                            {order.shipping.tracking && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tracking:</span>
                                <span className="font-mono text-sm text-gray-900">
                                  {order.shipping.tracking}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Order Timeline */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Order Timeline</h4>
                          <div className="space-y-3">
                            {order.timeline.map((step, index) => (
                              <div key={index} className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${
                                  step.completed ? 'bg-green-500' : 'bg-gray-300'
                                }`} />
                                <div className="flex-1">
                                  <div className={`font-medium ${
                                    step.completed ? 'text-gray-900' : 'text-gray-500'
                                  }`}>
                                    {step.status}
                                  </div>
                                  {step.date && (
                                    <div className="text-sm text-gray-600">
                                      {new Date(step.date).toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t">
                          {order.shipping.tracking && (
                            <Button variant="outline" size="sm">
                              <Truck className="h-4 w-4 mr-2" />
                              Track Package
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </Button>
                          {order.status === 'Delivered' && (
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reorder
                            </Button>
                          )}
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
