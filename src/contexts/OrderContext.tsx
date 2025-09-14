'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';

// Types
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderTimeline {
  status: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface OrderShipping {
  address: string;
  city: string;
  state: string;
  zip: string;
  method: string;
  tracking?: string;
  estimatedDelivery?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Returned';
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  items: OrderItem[];
  shippingInfo: OrderShipping;
  timeline: OrderTimeline[];
  paymentMethod?: string;
  notes?: string;
}

interface OrderState {
  orders: Order[];
  recentOrders: Order[];
  isLoading: boolean;
  error: string | null;
}

type OrderAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status']; timeline?: OrderTimeline[] } }
  | { type: 'LOAD_ORDERS'; payload: Order[] }
  | { type: 'CANCEL_ORDER'; payload: string }
  | { type: 'REORDER'; payload: string };

// Initial state
const initialState: OrderState = {
  orders: [],
  recentOrders: [],
  isLoading: true, // Start with loading true
  error: null,
};

// Sample orders data for demonstration
const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 329.99,
    subtotal: 299.99,
    shipping: 15.00,
    tax: 15.00,
    paymentMethod: 'Credit Card (**** 4532)',
    items: [
      {
        id: '1',
        name: 'Modern 3-Seater Sofa',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        price: 299.99,
        quantity: 1,
        selectedColor: 'Dark Grey',
        selectedSize: 'Large'
      }
    ],
    shippingInfo: {
      address: '123 Main Street, Apartment 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      method: 'Standard Shipping (3-5 business days)',
      tracking: 'TRK123456789',
      estimatedDelivery: '2024-01-15'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-12', completed: true, description: 'Your order has been received and is being processed.' },
      { status: 'Confirmed', date: '2024-01-12', completed: true, description: 'Payment confirmed and order details verified.' },
      { status: 'Processing', date: '2024-01-13', completed: true, description: 'Items are being prepared for shipment.' },
      { status: 'Shipped', date: '2024-01-14', completed: true, description: 'Your order has been dispatched from our warehouse.' },
      { status: 'Delivered', date: '2024-01-15', completed: true, description: 'Order delivered successfully. Thank you for shopping with us!' }
    ],
    notes: 'Thank you for your purchase! We hope you love your new sofa.'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-10',
    status: 'In Transit',
    total: 649.99,
    subtotal: 599.99,
    shipping: 25.00,
    tax: 25.00,
    paymentMethod: 'PayPal',
    items: [
      {
        id: '8',
        name: 'Wooden Dining Table',
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
        price: 599.99,
        quantity: 1,
        selectedColor: 'Natural Oak',
        selectedSize: '6-Seater'
      }
    ],
    shippingInfo: {
      address: '456 Oak Avenue, Suite 12',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90210',
      method: 'Express Shipping (1-2 business days)',
      tracking: 'TRK987654321',
      estimatedDelivery: '2024-01-12'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-08', completed: true, description: 'Your order has been received and is being processed.' },
      { status: 'Confirmed', date: '2024-01-08', completed: true, description: 'Payment confirmed and order details verified.' },
      { status: 'Processing', date: '2024-01-09', completed: true, description: 'Items are being prepared for shipment.' },
      { status: 'Shipped', date: '2024-01-10', completed: true, description: 'Your order has been dispatched from our warehouse.' },
      { status: 'In Transit', date: '2024-01-11', completed: false, description: 'Your package is on its way to you.' }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-05',
    status: 'Processing',
    total: 169.99,
    subtotal: 149.99,
    shipping: 10.00,
    tax: 10.00,
    paymentMethod: 'Credit Card (**** 8765)',
    items: [
      {
        id: '13',
        name: 'Storage Ottoman',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop',
        price: 149.99,
        quantity: 1,
        selectedColor: 'Cream White',
        selectedSize: 'Medium'
      }
    ],
    shippingInfo: {
      address: '789 Pine Street, House 15',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      method: 'Standard Shipping (3-5 business days)',
      estimatedDelivery: '2024-01-10'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-05', completed: true, description: 'Your order has been received and is being processed.' },
      { status: 'Confirmed', date: '2024-01-05', completed: true, description: 'Payment confirmed and order details verified.' },
      { status: 'Processing', date: '2024-01-06', completed: false, description: 'Items are being prepared for shipment.' },
      { status: 'Shipped', date: '', completed: false, description: 'Your order will be shipped once processing is complete.' },
      { status: 'Delivered', date: '', completed: false, description: 'Your order will be delivered once shipped.' }
    ]
  },
  {
    id: 'ORD-2024-004',
    date: '2023-12-28',
    status: 'Delivered',
    total: 899.99,
    subtotal: 799.99,
    shipping: 50.00,
    tax: 50.00,
    paymentMethod: 'Credit Card (**** 1234)',
    items: [
      {
        id: '15',
        name: 'Executive Office Chair',
        image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop',
        price: 399.99,
        quantity: 1,
        selectedColor: 'Black Leather'
      },
      {
        id: '16',
        name: 'Standing Desk',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        price: 399.99,
        quantity: 1,
        selectedColor: 'White'
      }
    ],
    shippingInfo: {
      address: '321 Elm Drive, Building B',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      method: 'White Glove Delivery',
      tracking: 'TRK456789123',
      estimatedDelivery: '2023-12-30'
    },
    timeline: [
      { status: 'Order Placed', date: '2023-12-25', completed: true, description: 'Your order has been received and is being processed.' },
      { status: 'Confirmed', date: '2023-12-25', completed: true, description: 'Payment confirmed and order details verified.' },
      { status: 'Processing', date: '2023-12-26', completed: true, description: 'Items are being prepared for shipment.' },
      { status: 'Shipped', date: '2023-12-27', completed: true, description: 'Your order has been dispatched from our warehouse.' },
      { status: 'Delivered', date: '2023-12-30', completed: true, description: 'Order delivered successfully with white glove service.' }
    ]
  }
];

// Order reducer
function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'LOAD_ORDERS':
      // Sort orders by date (most recent first) and get the 3 most recent
      const sortedOrders = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return {
        ...state,
        orders: sortedOrders,
        recentOrders: sortedOrders.slice(0, 3),
        isLoading: false,
        error: null,
      };

    case 'ADD_ORDER':
      const newOrders = [action.payload, ...state.orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return {
        ...state,
        orders: newOrders,
        recentOrders: newOrders.slice(0, 3),
      };

    case 'UPDATE_ORDER_STATUS':
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.id
          ? {
              ...order,
              status: action.payload.status,
              timeline: action.payload.timeline || order.timeline,
            }
          : order
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return {
        ...state,
        orders: updatedOrders,
        recentOrders: updatedOrders.slice(0, 3),
      };

    case 'CANCEL_ORDER':
      const cancelledOrders = state.orders.map(order =>
        order.id === action.payload
          ? { ...order, status: 'Cancelled' as const }
          : order
      );
      return {
        ...state,
        orders: cancelledOrders,
        recentOrders: cancelledOrders.slice(0, 3),
      };

    default:
      return state;
  }
}

// Context
const OrderContext = createContext<{
  state: OrderState;
  loadOrders: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status'], timeline?: OrderTimeline[]) => void;
  cancelOrder: (id: string) => void;
  reorder: (id: string) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
} | undefined>(undefined);

// Provider
export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    setTimeout(() => {
      try {
        dispatch({ type: 'LOAD_ORDERS', payload: sampleOrders });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load orders' });
      }
    }, 500);
  };

  const addOrder = (order: Order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const updateOrderStatus = (
    id: string,
    status: Order['status'],
    timeline?: OrderTimeline[]
  ) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status, timeline } });
  };

  const cancelOrder = (id: string) => {
    dispatch({ type: 'CANCEL_ORDER', payload: id });
  };

  const reorder = (id: string) => {
    const order = state.orders.find(o => o.id === id);
    if (order) {
      // In a real app, this would add items to cart and redirect to checkout
      console.log('Reordering items from order:', id);
    }
  };

  const getOrderById = (id: string) => {
    return state.orders.find(order => order.id === id);
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return state.orders.filter(order => order.status === status);
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        loadOrders,
        addOrder,
        updateOrderStatus,
        cancelOrder,
        reorder,
        getOrderById,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// Hook
export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider. Make sure to wrap your app with the OrderProvider component.');
  }
  return context;
}