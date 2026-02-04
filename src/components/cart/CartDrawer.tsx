import { motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

export function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateCartQuantity, getCartTotal } = useStore();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col shadow-elevated"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl">Shopping Bag ({cart.length})</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-serif text-xl mb-2">Your bag is empty</h3>
            <p className="text-muted-foreground mb-6">
              Discover our beautiful collection and find your perfect dress
            </p>
            <Button
              onClick={() => setCartOpen(false)}
              className="btn-primary px-8 py-3 rounded-full"
              asChild
            >
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-elegant">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-4 bg-muted/30 rounded-2xl"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={() => setCartOpen(false)}
                      className="shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-32 object-cover rounded-xl"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setCartOpen(false)}
                        className="font-medium hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.size} · {item.color}
                      </p>
                      <p className="font-semibold mt-2">${item.product.price}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-background rounded-full p-1">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateCartQuantity(
                                    item.product.id,
                                    item.size,
                                    item.color,
                                    item.quantity - 1
                                  )
                                : removeFromCart(item.product.id, item.size, item.color)
                            }
                            className="p-1.5 hover:bg-muted rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 hover:bg-muted rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.size, item.color)
                          }
                          className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground">Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-medium">Total</span>
                <span className="font-serif text-xl">${getCartTotal().toFixed(2)}</span>
              </div>
              <Button
                className="w-full btn-primary py-4 rounded-full text-base font-medium"
                asChild
              >
                <Link to="/checkout" onClick={() => setCartOpen(false)}>
                  Proceed to Checkout
                </Link>
              </Button>
              <button
                onClick={() => setCartOpen(false)}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}
