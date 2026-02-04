import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, Truck, RotateCcw, ShieldCheck, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'sizing' | 'delivery'>('details');
  
  const { addToCart, setCartOpen, isInWishlist, addToWishlist, removeFromWishlist } = useStore();
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart({
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setCartOpen(true);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <div className="pt-24 bg-muted/30">
        <div className="container-boutique py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <Link 
              to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="container-boutique py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-28">
              {/* Main Image */}
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-rose-50 mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'w-20 h-24 rounded-xl overflow-hidden border-2 transition-all',
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      )}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && <span className="badge-new">New Arrival</span>}
              {product.isTrending && <span className="badge-trending">Trending</span>}
              {product.lowStock && <span className="badge-low-stock">Only {product.stock} left</span>}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.category}</p>
            
            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-3xl">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <span className="badge-new bg-rose-500 text-primary-foreground">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Color</span>
                {selectedColor && <span className="text-sm text-muted-foreground">{selectedColor}</span>}
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      'w-12 h-12 rounded-full border-2 transition-all relative',
                      selectedColor === color.name
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-border hover:border-muted-foreground'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <Check className={cn(
                        'w-5 h-5 absolute inset-0 m-auto',
                        color.hex === '#FFFFFF' || color.hex === '#F5E6E0' || color.hex === '#F7E7CE'
                          ? 'text-foreground'
                          : 'text-primary-foreground'
                      )} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Size</span>
                <button className="text-sm text-primary hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'px-6 py-3 rounded-xl border-2 text-sm font-medium transition-all',
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center gap-3 bg-muted rounded-xl px-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-background rounded-full transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-background rounded-full transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="flex-1 btn-primary py-4 rounded-xl text-base font-medium"
              >
                Add to Bag
              </Button>
              
              <button
                onClick={handleWishlist}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all',
                  inWishlist
                    ? 'border-rose-500 bg-rose-50 text-rose-500'
                    : 'border-border hover:border-primary'
                )}
              >
                <Heart className={cn('w-5 h-5', inWishlist && 'fill-current')} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-muted/50 rounded-2xl mb-8">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders $150+</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30 day returns</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% protected</p>
              </div>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <Share2 className="w-4 h-4" />
              Share this product
            </button>

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-8">
                {[
                  { id: 'details', label: 'Details' },
                  { id: 'sizing', label: 'Sizing' },
                  { id: 'delivery', label: 'Delivery' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={cn(
                      'pb-4 text-sm font-medium transition-colors relative',
                      activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <ul className="space-y-2 list-none pl-0">
                    <li><strong>Fabric:</strong> {product.fabric}</li>
                    <li><strong>Fit:</strong> {product.fit}</li>
                    <li><strong>Occasion:</strong> {product.occasion.join(', ')}</li>
                    <li><strong>Model Info:</strong> {product.modelInfo}</li>
                  </ul>
                </div>
              )}
              {activeTab === 'sizing' && (
                <div className="space-y-4">
                  <p>This dress runs true to size. If you're between sizes, we recommend sizing up for a more relaxed fit.</p>
                  <p className="text-primary font-medium cursor-pointer hover:underline">
                    View complete size chart →
                  </p>
                </div>
              )}
              {activeTab === 'delivery' && (
                <div className="space-y-4">
                  <ul className="space-y-2 list-none pl-0">
                    <li><strong>Standard Delivery:</strong> 3-5 business days (Free on orders $150+)</li>
                    <li><strong>Express Delivery:</strong> 1-2 business days ($15)</li>
                    <li><strong>Same Day:</strong> Available in select cities ($25)</li>
                  </ul>
                  <p>Easy returns within 30 days. Items must be unworn with tags attached.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="heading-section mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
}
