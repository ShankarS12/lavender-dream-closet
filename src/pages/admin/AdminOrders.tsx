import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, ChevronDown } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const orders = [
  {
    id: 'ORD-001',
    customer: { name: 'Sarah Johnson', email: 'sarah@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    products: [{ name: 'Rosé Evening Gown', size: 'S', color: 'Blush Rose', quantity: 1, price: 289 }],
    total: 289,
    status: 'Delivered',
    paymentStatus: 'Paid',
    date: '2024-01-15',
    address: '123 Fashion Ave, New York, NY 10001',
  },
  {
    id: 'ORD-002',
    customer: { name: 'Emily Davis', email: 'emily@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    products: [{ name: 'Lavender Dreams Midi', size: 'M', color: 'Soft Lavender', quantity: 1, price: 198 }],
    total: 198,
    status: 'Shipped',
    paymentStatus: 'Paid',
    date: '2024-01-14',
    address: '456 Style Blvd, Los Angeles, CA 90001',
  },
  {
    id: 'ORD-003',
    customer: { name: 'Jessica Miller', email: 'jessica@example.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
    products: [
      { name: 'Blush Satin Maxi', size: 'S', color: 'Pearl Blush', quantity: 1, price: 325 },
      { name: 'Classic LBD', size: 'S', color: 'Classic Black', quantity: 1, price: 225 },
    ],
    total: 550,
    status: 'Processing',
    paymentStatus: 'Paid',
    date: '2024-01-13',
    address: '789 Elegance Lane, Chicago, IL 60601',
  },
  {
    id: 'ORD-004',
    customer: { name: 'Amanda Wilson', email: 'amanda@example.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
    products: [{ name: 'Garden Party Floral', size: 'L', color: 'Rose Garden', quantity: 2, price: 356 }],
    total: 356,
    status: 'Pending',
    paymentStatus: 'Pending',
    date: '2024-01-12',
    address: '321 Grace St, Miami, FL 33101',
  },
  {
    id: 'ORD-005',
    customer: { name: 'Rachel Brown', email: 'rachel@example.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80' },
    products: [{ name: 'Bohemian Rhapsody', size: 'M', color: 'Desert Rose', quantity: 1, price: 265 }],
    total: 265,
    status: 'Delivered',
    paymentStatus: 'Paid',
    date: '2024-01-11',
    address: '654 Boho Way, Austin, TX 78701',
  },
];

const statusColors: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-amber-100 text-amber-700',
  Pending: 'bg-muted text-muted-foreground',
  Cancelled: 'bg-red-100 text-red-700',
};

const paymentStatusColors: Record<string, string> = {
  Paid: 'bg-green-100 text-green-700',
  Pending: 'bg-amber-100 text-amber-700',
  Failed: 'bg-red-100 text-red-700',
  Refunded: 'bg-purple-100 text-purple-700',
};

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Orders" subtitle={`${orders.length} total orders`}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter || ''}
          onChange={(e) => setStatusFilter(e.target.value || null)}
          className="px-4 py-2 rounded-lg border border-border bg-background text-sm"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-background rounded-2xl shadow-soft overflow-hidden"
          >
            {/* Order Header */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.customer.avatar}
                  alt={order.customer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="font-medium">${order.total}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('px-2.5 py-1 text-xs font-medium rounded-full', statusColors[order.status])}>
                    {order.status}
                  </span>
                  <span className={cn('px-2.5 py-1 text-xs font-medium rounded-full hidden sm:inline-flex', paymentStatusColors[order.paymentStatus])}>
                    {order.paymentStatus}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-muted-foreground transition-transform',
                    expandedOrder === order.id && 'rotate-180'
                  )}
                />
              </div>
            </button>

            {/* Order Details */}
            {expandedOrder === order.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border"
              >
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  {/* Products */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Products</h4>
                    <div className="space-y-3">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                          <div className="w-12 h-14 bg-rose-100 rounded-lg" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {product.size} · {product.color} · Qty: {product.quantity}
                            </p>
                          </div>
                          <p className="font-medium">${product.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer & Shipping */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Customer</h4>
                      <p className="text-sm">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-muted-foreground">{order.address}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Update Status</h4>
                      <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm">
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-background rounded-2xl">
          <p className="text-muted-foreground">No orders found</p>
        </div>
      )}
    </AdminLayout>
  );
}
