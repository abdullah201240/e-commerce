'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/contexts/AdminContext';
import {
  Search,
  Bell,
  Settings,
  User,
  RefreshCw,
  Moon,
  Sun,
} from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const { state, refreshStats } = useAdmin();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleRefreshStats = () => {
    refreshStats();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Refresh Stats */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefreshStats}
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            title="Refresh Stats"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 relative"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* User Profile */}
          {state.user && (
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {state.user.name}
                </p>
                <p className="text-xs text-gray-600">
                  {state.user.role.replace('_', ' ').toUpperCase()}
                </p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                {state.user.avatar ? (
                  <img
                    src={state.user.avatar}
                    alt={state.user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}