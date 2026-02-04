import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  ArrowUpRight,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

const stats = [
  {
    name: 'Total Revenue',
    value: '$48,652',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Orders',
    value: '256',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Products',
    value: products.length.toString(),
    change: '+2 this week',
    trend: 'up',
    icon: Package,
    color: 'bg-lavender-100 text-purple-600',
  },
  {
    name: 'Customers',
    value: '1,429',
    change: '+5.4%',
    trend: 'up',
    icon: Users,
    color: 'bg-rose-100 text-rose-600',
  },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Sarah Johnson', product: 'Rosé Evening Gown', amount: '$289', status: 'Delivered' },
  { id: 'ORD-002', customer: 'Emily Davis', product: 'Lavender Dreams Midi', amount: '$198', status: 'Shipped' },
  { id: 'ORD-003', customer: 'Jessica Miller', product: 'Blush Satin Maxi', amount: '$325', status: 'Processing' },
  { id: 'ORD-004', customer: 'Amanda Wilson', product: 'Classic LBD', amount: '$225', status: 'Pending' },
  { id: 'ORD-005', customer: 'Rachel Brown', product: 'Garden Party Floral', amount: '$178', status: 'Delivered' },
];

const topProducts = products.filter((p) => p.isBestseller || p.isTrending).slice(0, 5);

const statusColors: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-amber-100 text-amber-700',
  Pending: 'bg-muted text-muted-foreground',
};

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back! Here's what's happening.">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background rounded-2xl p-5 shadow-soft"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn('p-3 rounded-xl', stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="font-serif text-2xl mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-background rounded-2xl shadow-soft overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-serif text-lg">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                    Order ID
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                    Product
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                    <td className="px-6 py-4 text-sm">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex px-2.5 py-1 text-xs font-medium rounded-full',
                          statusColors[order.status]
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-background rounded-2xl shadow-soft overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-serif text-lg">Top Products</h2>
            <Link
              to="/admin/products"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${product.price}</p>
                  <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { name: 'Add New Product', href: '/admin/products/new', icon: Package },
          { name: 'View Orders', href: '/admin/orders', icon: ShoppingCart },
          { name: 'Manage Categories', href: '/admin/categories', icon: Eye },
          { name: 'Customer List', href: '/admin/customers', icon: Users },
        ].map((action) => (
          <Link
            key={action.name}
            to={action.href}
            className="flex items-center gap-4 p-5 bg-background rounded-2xl shadow-soft hover:shadow-hover transition-all group"
          >
            <div className="p-3 rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <action.icon className="w-5 h-5" />
            </div>
            <span className="font-medium">{action.name}</span>
          </Link>
        ))}
      </motion.div>
    </AdminLayout>
  );
}
