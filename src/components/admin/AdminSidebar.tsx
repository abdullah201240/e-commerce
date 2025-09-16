'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    permission: 'view_analytics',
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: Package,
    permission: 'manage_products',
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
    permission: 'manage_orders',
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users,
    permission: 'manage_customers',
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    permission: 'view_analytics',
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    permission: 'system_settings',
  },
];

export default function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const { state, logout, hasPermission } = useAdmin();

  // Filter navigation items based on user permissions
  const allowedNavigation = navigation.filter(item => 
    hasPermission(item.permission)
  );

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col h-screen ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link 
              href="/admin/dashboard"
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              FurniStore
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        {!isCollapsed && state.user && (
          <div className="mt-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {state.user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {state.user.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {state.user.role.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {allowedNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        {/* Go to Store */}
        <Link href="/">
          <Button
            variant="ghost"
            className={`w-full text-gray-300 hover:text-white hover:bg-gray-800 ${
              isCollapsed ? 'justify-center px-2' : 'justify-start px-3'
            }`}
          >
            <Home className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && <span>Go to Store</span>}
          </Button>
        </Link>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={logout}
          className={`w-full text-red-400 hover:text-red-300 hover:bg-red-900/20 ${
            isCollapsed ? 'justify-center px-2' : 'justify-start px-3'
          }`}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}