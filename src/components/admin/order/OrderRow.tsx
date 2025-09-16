'use client';

import React, { useState } from 'react';
import { Order, OrderItem, OrderTimeline } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from './OrderStatusBadge';
import {
  Eye,
  Edit3,
  Printer,
  MoreHorizontal,
  Package,
  Truck,
  DollarSign,
  Clock,
} from 'lucide-react';

interface OrderRowProps {
  order: Order;
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onPrintInvoice: (order: Order) => void;
}

export function OrderRow({ order, onEdit, onUpdateStatus, onPrintInvoice }: OrderRowProps) {
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
        {/* Order ID & Date */}
        <td className="py-4 px-4">
          <div className="flex flex-col">
            <span className="font-medium text-foreground truncate" title={order.id}>
              {order.id}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(order.date).toLocaleDateString()}
            </span>
          </div>
        </td>

        {/* Delivery Address */}
        <td className="py-4 px-4">
          <div className="flex flex-col">
            <span className="font-medium text-foreground truncate" title={order.shippingInfo?.address || 'N/A'}>
              {order.shippingInfo?.address || 'N/A'}
            </span>
            <span className="text-sm text-muted-foreground truncate">
              {order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zip}
            </span>
            <span className="text-xs text-muted-foreground mt-1 truncate">
              {order.shippingInfo?.method}
            </span>
          </div>
        </td>

        {/* Products & Quantities */}
        <td className="py-4 px-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">{order.items.length} items</span>
              {order.items.slice(0, 2).map((item: OrderItem, index: number) => (
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
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {order.items.slice(0, 3).map((item: OrderItem, index: number) => (
                <div key={index} className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate max-w-32" title={item.name}>
                    {item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name}
                  </span>
                  <span className="font-medium text-foreground ml-2">×{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </td>

        {/* Pricing Details */}
        <td className="py-4 px-4">
          <div className="flex flex-col text-right">
            <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
            <div className="text-xs text-muted-foreground space-y-0.5 mt-1">
              <div className="flex justify-between">
                <span>Sub:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ship:</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </td>

        {/* Status & Tracking */}
        <td className="py-4 px-4">
          <div className="flex flex-col space-y-2">
            <OrderStatusBadge status={order.status} />
            {order.shippingInfo?.tracking && (
              <span className="text-xs text-blue-600 dark:text-blue-400 font-mono truncate" title={order.shippingInfo.tracking}>
                {order.shippingInfo.tracking.length > 12 
                  ? order.shippingInfo.tracking.substring(0, 12) + '...' 
                  : order.shippingInfo.tracking}
              </span>
            )}
          </div>
        </td>

        {/* Payment & Notes */}
        <td className="py-4 px-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground truncate" title={order.paymentMethod || 'Credit Card'}>
              {order.paymentMethod || 'Credit Card'}
            </span>
            <span className="text-xs text-green-600 dark:text-green-400">Paid</span>
            {order.notes && (
              <span className="text-xs text-muted-foreground mt-1 truncate max-w-28" title={order.notes}>
                Notes: {order.notes.length > 15 ? order.notes.substring(0, 15) + '...' : order.notes}
              </span>
            )}
          </div>
        </td>

        {/* Invoice */}
        <td className="py-4 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPrintInvoice(order)}
            className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
            title="Print Invoice"
          >
            <Printer className="h-4 w-4" />
          </Button>
        </td>

        {/* Actions */}
        <td className="py-4 px-4">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1"
              title={expanded ? "Collapse Details" : "Expand Details"}
            >
              <Eye className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(order)}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1"
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
                className="text-muted-foreground hover:text-foreground p-1"
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
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-muted text-red-600 dark:text-red-400  dark:hover:bg-red-900/20"
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
          <td colSpan={8} className="py-6 px-4">
            <div className="space-y-6">
              {/* Products Detail */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Order Items
                </h4>
                <div className="space-y-3">
                  {order.items.map((item: OrderItem, index: number) => (
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
                      {order.timeline.map((event: OrderTimeline, index: number) => (
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
