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
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Users,
  UserPlus,
  Download,
  MoreHorizontal,
  Star,
  TrendingUp,
} from 'lucide-react';

// Mock customer data - in a real app this would come from an API
interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: 'active' | 'inactive' | 'vip';
  location: string;
  loyaltyPoints?: number;
}

const mockCustomers: Customer[] = [
  {
    id: 'cust-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    joinDate: '2023-01-15',
    totalOrders: 8,
    totalSpent: 2340.50,
    lastOrderDate: '2024-01-15',
    status: 'vip',
    location: 'New York, NY',
    loyaltyPoints: 1200
  },
  {
    id: 'cust-002',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    joinDate: '2023-03-22',
    totalOrders: 5,
    totalSpent: 1580.25,
    lastOrderDate: '2024-01-10',
    status: 'active',
    location: 'Los Angeles, CA',
    loyaltyPoints: 790
  },
  {
    id: 'cust-003',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2023-05-10',
    totalOrders: 12,
    totalSpent: 3850.75,
    lastOrderDate: '2024-01-05',
    status: 'vip',
    location: 'Chicago, IL',
    loyaltyPoints: 1925
  },
  {
    id: 'cust-004',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    joinDate: '2023-07-18',
    totalOrders: 2,
    totalSpent: 650.00,
    lastOrderDate: '2023-12-28',
    status: 'active',
    location: 'Miami, FL',
    loyaltyPoints: 325
  },
  {
    id: 'cust-005',
    name: 'Lisa Brown',
    email: 'lisa.brown@email.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    joinDate: '2023-09-05',
    totalOrders: 0,
    totalSpent: 0,
    status: 'inactive',
    location: 'Seattle, WA',
    loyaltyPoints: 0
  }
];

// Customer Status Badge Component
function CustomerStatusBadge({ status }: { status: string }) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'vip':
        return {
          className: 'bg-purple-100 text-purple-700 border-purple-200',
          icon: Star
        };
      case 'active':
        return {
          className: 'bg-green-100 text-green-700 border-green-200',
          icon: TrendingUp
        };
      case 'inactive':
        return {
          className: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: Users
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: Users
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} text-xs font-medium border capitalize`}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </Badge>
  );
}

// Customer Row Component
interface CustomerRowProps {
  customer: Customer;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onEmail: (customer: Customer) => void;
}

function CustomerRow({ customer, onView, onEdit, onEmail }: CustomerRowProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Customer Info */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          {customer.avatar ? (
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{customer.name}</p>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="py-4 px-4">
        <div className="flex flex-col space-y-1">
          {customer.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-3 w-3 mr-1" />
              {customer.phone}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            {customer.location}
          </div>
        </div>
      </td>

      {/* Orders */}
      <td className="py-4 px-4 text-center">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{customer.totalOrders}</span>
          {customer.lastOrderDate && (
            <span className="text-xs text-gray-500">
              Last: {new Date(customer.lastOrderDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </td>

      {/* Total Spent */}
      <td className="py-4 px-4">
        <span className="font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</span>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <CustomerStatusBadge status={customer.status} />
      </td>

      {/* Join Date */}
      <td className="py-4 px-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(customer.joinDate).toLocaleDateString()}
        </div>
      </td>

      {/* Loyalty Points */}
      <td className="py-4 px-4 text-center">
        <span className="font-medium text-purple-600">{customer.loyaltyPoints || 0}</span>
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(customer)}
            className="text-gray-600 hover:text-blue-600"
            title="View Customer"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEmail(customer)}
            className="text-gray-600 hover:text-green-600"
            title="Send Email"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(customer)}
            className="text-gray-600 hover:text-blue-600"
            title="Edit Customer"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              className="text-gray-600 hover:text-gray-800"
              title="More Actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {showActions && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                <button className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50">
                  View Orders
                </button>
                <button className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50">
                  Reset Password
                </button>
                <button className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600">
                  Deactivate
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function AdminCustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let filtered = [...customers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone?.toLowerCase().includes(query) ||
        customer.location.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'spent':
        filtered.sort((a, b) => b.totalSpent - a.totalSpent);
        break;
      case 'orders':
        filtered.sort((a, b) => b.totalOrders - a.totalOrders);
        break;
      case 'joined':
        filtered.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
        break;
      default:
        break;
    }

    return filtered;
  }, [customers, searchQuery, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleView = (customer: Customer) => {
    console.log('View customer:', customer);
    // TODO: Open customer details modal or navigate to view page
  };

  const handleEdit = (customer: Customer) => {
    console.log('Edit customer:', customer);
    // TODO: Open edit modal or navigate to edit page
  };

  const handleEmail = (customer: Customer) => {
    console.log('Email customer:', customer);
    // TODO: Open email compose modal
  };

  // Calculate stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const vipCustomers = customers.filter(c => c.status === 'vip').length;
  const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const avgOrderValue = customers.length > 0 ? totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0) : 0;

  return (
    <AdminLayout title="Customers" subtitle="Manage customer relationships and analyze customer data">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-3xl font-bold text-green-600">{activeCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">VIP</p>
                  <p className="text-3xl font-bold text-purple-600">{vipCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive</p>
                  <p className="text-3xl font-bold text-gray-600">{inactiveCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-3xl font-bold text-orange-600">${avgOrderValue.toFixed(0)}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search customers by name, email, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="vip">VIP</option>
                  <option value="inactive">Inactive</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="spent">Total Spent</option>
                  <option value="orders">Total Orders</option>
                  <option value="joined">Join Date</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Orders</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Points</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.length > 0 ? (
                    paginatedCustomers.map((customer) => (
                      <CustomerRow
                        key={customer.id}
                        customer={customer}
                        onView={handleView}
                        onEdit={handleEdit}
                        onEmail={handleEmail}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No customers found</p>
                        <p className="text-sm text-gray-500 mt-1">
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
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
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