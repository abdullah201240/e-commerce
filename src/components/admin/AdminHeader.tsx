'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/contexts/AdminContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  Menu,
  Monitor,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export default function AdminHeader({ title, subtitle, onMenuClick, isMobile }: AdminHeaderProps) {
  const { state, refreshStats, logout } = useAdmin();
  const { theme, actualTheme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getThemeIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    }
    return actualTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
  };

  const getThemeTitle = () => {
    if (theme === 'system') {
      return `System theme (${actualTheme})`;
    }
    return actualTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  };

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 sm:py-4 shadow-none">
      <div className="flex items-center justify-between">
        {/* Left Side - Mobile Menu + Title */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Mobile Menu Button */}
          {isMobile && onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm transition-all duration-200 p-2 md:hidden"
              title="Open Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          {/* Title Section */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground mt-1 text-sm hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center - Large Search */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground z-10" />
            <Input
              type="text"
              placeholder="Search products, orders, customers..."
              className="pl-14 pr-6 py-3 w-full text-lg bg-background/90 backdrop-blur-sm border-border focus:border-primary focus:ring-primary focus:bg-background transition-all duration-200 rounded-xl shadow-none"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Search Icon with Dropdown */}
          <div className="lg:hidden relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const searchInput = document.getElementById('mobile-search-input');
                if (searchInput) {
                  searchInput.classList.toggle('hidden');
                  searchInput.classList.toggle('flex');
                  if (!searchInput.classList.contains('hidden')) {
                    (searchInput.querySelector('input') as HTMLInputElement)?.focus();
                  }
                }
              }}
              className="text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm transition-all duration-200 p-2"
              title="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <div id="mobile-search-input" className="hidden absolute right-0 top-full mt-2 w-60 bg-background border border-border rounded-lg shadow-lg p-2 z-50">
              <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products, orders..."
                  className="pl-8 pr-4 py-1 w-full text-sm bg-background border-border"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      if (value.trim()) {
                        // Implement search functionality
                        console.log('Searching for:', value);
                        // You can add actual search implementation here
                        // For example, redirect to search results page or filter current view
                        window.location.href = `/admin/products?search=${encodeURIComponent(value)}`;
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Condensed on mobile */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm relative transition-all duration-200 p-2"
              title="Notifications"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              {/* Notification badge */}
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-destructive rounded-full"></span>
            </Button>

            {/* Dark Mode Toggle - Visible on all devices */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm transition-all duration-200 p-2"
              title={getThemeTitle()}
            >
              {getThemeIcon()}
            </Button>

            {/* Settings - Hidden on small mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm transition-all duration-200 p-2"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* User Profile Dropdown */}
          {state.user && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-border focus:outline-none"
              >
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">
                    {state.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {state.user.role.replace('_', ' ').toUpperCase()}
                  </p>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-none">
                  {state.user.avatar ? (
                    <img
                      src={state.user.avatar}
                      alt={state.user.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  )}
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{state.user.name}</p>
                    <p className="text-xs text-muted-foreground">{state.user.email}</p>
                  </div>
                  <Link 
                    href="/admin/profile" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    My Profile
                  </Link>
                  <Link 
                    href="/admin/settings" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4 inline mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}