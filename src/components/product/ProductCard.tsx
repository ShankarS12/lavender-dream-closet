import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { Product } from '@/store/useStore';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="product-card">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-rose-50">
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image w-full h-full object-cover"
            />
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt={product.name}
                className="product-image-alt w-full h-full object-cover"
              />
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && <span className="badge-new">New</span>}
              {product.isTrending && <span className="badge-trending">Trending</span>}
              {product.isBestseller && (
                <span className="badge-new bg-purple-100 text-purple-700">Bestseller</span>
              )}
              {product.lowStock && <span className="badge-low-stock">Only few left</span>}
            </div>

            {/* Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleWishlistClick}
                className={cn('wishlist-heart', inWishlist && 'active')}
              >
                <Heart
                  className={cn('w-4 h-4', inWishlist && 'fill-current')}
                />
              </button>
              <button className="wishlist-heart">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Quick View Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-1.5 justify-center">
                {product.sizes.slice(0, 5).map((size) => (
                  <span
                    key={size}
                    className="px-2 py-1 text-xs font-medium bg-white/90 rounded text-foreground"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color.name}
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-medium text-rose-500">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
