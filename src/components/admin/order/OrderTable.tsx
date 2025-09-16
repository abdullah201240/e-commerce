'use client';

import React from 'react';
import { Order } from '@/contexts/OrderContext';
import { OrderRow } from './OrderRow';
import { MobileOrderCard } from './MobileOrderCard';
import { ShoppingCart } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onPrintInvoice: (order: Order) => void;
}

export function OrderTable({ orders, onView, onEdit, onUpdateStatus, onPrintInvoice }: OrderTableProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Desktop Table View */}
      <div className="hidden lg:flex flex-col h-full">
        {/* Fixed Table Header */}
        <div className="flex-shrink-0 bg-muted/50 dark:bg-muted/30 border-b border-border">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[12%]">Order ID & Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[18%]">Delivery Address</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[20%]">Products & Quantities</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[15%]">Pricing Details</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[12%]">Status & Tracking</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[13%]">Payment & Notes</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[5%]">Invoice</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[5%]">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
        
        {/* Scrollable Table Body */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <tbody>
              {orders.length > 0 ? (
                orders.map((order: Order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    onView={onView}
                    onEdit={onEdit}
                    onUpdateStatus={onUpdateStatus}
                    onPrintInvoice={onPrintInvoice}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
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
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden flex-1 overflow-auto">
        <div className="space-y-0">
          {orders.length > 0 ? (
            orders.map((order: Order) => (
              <div key={order.id} className="border-b border-border">
                <MobileOrderCard
                  order={order}
                  onView={onView}
                  onEdit={onEdit}
                  onUpdateStatus={onUpdateStatus}
                  onPrintInvoice={onPrintInvoice}
                />
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground">No orders found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
