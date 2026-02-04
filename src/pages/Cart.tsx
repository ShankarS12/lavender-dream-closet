import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, Tag, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 150 ? 0 : 9.99;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const suggestedProducts = products.filter((p) => !cart.some((c) => c.product.id === p.id)).slice(0, 4);

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'bella10') {
      setCouponApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-28 pb-16">
          <div className="container-boutique">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto text-center py-16"
            >
              <div className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-12 h-12 text-primary" />
              </div>
              <h1 className="font-serif text-3xl mb-4">Your Bag is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any dresses to your bag yet. Explore our collection and find your perfect look.
              </p>
              <Button className="btn-primary px-8 py-4 rounded-full text-base" asChild>
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </motion.div>

            {/* Suggested Products */}
            <section className="mt-16">
              <h2 className="heading-section text-center mb-8">You Might Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {suggestedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>
          </div>
        </main>
        <Footer />
        <CartDrawer />
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="container-boutique">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl">Shopping Bag</h1>
            <p className="text-muted-foreground mt-2">{cart.length} items</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 md:gap-6 p-4 md:p-6 bg-muted/30 rounded-2xl"
                  >
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-32 md:w-32 md:h-40 object-cover rounded-xl"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-serif text-lg hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.product.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-3 text-sm">
                        <span className="px-3 py-1 bg-background rounded-lg">Size: {item.size}</span>
                        <span className="px-3 py-1 bg-background rounded-lg">Color: {item.color}</span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 bg-background rounded-xl p-1">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateCartQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                                : removeFromCart(item.product.id, item.size, item.color)
                            }
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                            }
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-xl">${(item.product.price * item.quantity).toFixed(2)}</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">${item.product.price} each</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-28 bg-gradient-card rounded-3xl p-6 md:p-8"
              >
                <h2 className="font-serif text-xl mb-6">Order Summary</h2>

                {/* Coupon */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="input-elegant pl-10"
                        disabled={couponApplied}
                      />
                    </div>
                    <Button
                      onClick={handleApplyCoupon}
                      variant="outline"
                      className="px-4"
                      disabled={couponApplied || !couponCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-sm text-green-600 mt-2">🎉 Coupon applied! 10% off</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">Try: BELLA10</p>
                </div>

                {/* Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount (10%)</span>
                      <span className="text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-primary">
                      Add ${(150 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium">Total</span>
                  <span className="font-serif text-2xl">${total.toFixed(2)}</span>
                </div>

                <Button className="w-full btn-primary py-4 rounded-xl text-base font-medium" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Taxes calculated at checkout. Free returns within 30 days.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Suggested Products */}
          <section className="mt-16">
            <h2 className="heading-section mb-8">Complete Your Look</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {suggestedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
}
