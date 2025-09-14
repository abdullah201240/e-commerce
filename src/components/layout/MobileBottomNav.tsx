'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Grid3X3, 
  ShoppingCart, 
  User
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    exact: true
  },
  {
    name: 'Categories',
    href: '/categories',
    icon: Grid3X3,
    exact: false
  },
  {
    name: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
    exact: false
  },
  {
    name: 'Account',
    href: '/account',
    icon: User,
    exact: false
  }
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { state } = useCart();

  const isActiveRoute = (item: typeof navigationItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <nav className="flex items-center justify-around py-2 px-4">
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive
                  ? 'text-gray-900 bg-gray-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5 mb-1" />
                {item.name === 'Cart' && state.itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                  >
                    {state.itemCount > 9 ? '9+' : state.itemCount}
                  </Badge>
                )}
              </div>
              <span 
                className={`text-xs font-medium truncate w-full text-center ${
                  isActive ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
