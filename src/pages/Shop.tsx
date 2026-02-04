import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutList, X, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = [
  { name: 'Rose', hex: '#E8B4B8' },
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Black', hex: '#1a1a2e' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Blue', hex: '#4A90A4' },
];
const priceRanges = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $300', min: 200, max: 300 },
  { label: 'Over $300', min: 300, max: 9999 },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(['category', 'size', 'color', 'price']);

  const selectedCategory = searchParams.get('category');
  const selectedSizes = searchParams.getAll('size');
  const selectedColors = searchParams.getAll('color');
  const selectedPriceRange = searchParams.get('price');
  const sortBy = searchParams.get('sort') || 'popular';

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.label === selectedPriceRange);
      if (range) {
        filtered = filtered.filter((p) => p.price >= range.min && p.price <= range.max);
      }
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered = filtered.filter((p) => p.isNew).concat(filtered.filter((p) => !p.isNew));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered = filtered.filter((p) => p.isBestseller || p.isTrending).concat(
          filtered.filter((p) => !p.isBestseller && !p.isTrending)
        );
    }

    return filtered;
  }, [selectedCategory, selectedSizes, selectedColors, selectedPriceRange, sortBy]);

  const toggleFilter = (key: string, value: string) => {
    const current = searchParams.getAll(key);
    if (current.includes(value)) {
      searchParams.delete(key);
      current.filter((v) => v !== value).forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.append(key, value);
    }
    setSearchParams(searchParams);
  };

  const setFilter = (key: string, value: string | null) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const hasActiveFilters = selectedCategory || selectedSizes.length > 0 || selectedColors.length > 0 || selectedPriceRange;

  const FilterSection = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full py-2 text-left font-medium"
      >
        {title}
        <ChevronDown
          className={cn('w-4 h-4 transition-transform', openSections.includes(id) && 'rotate-180')}
        />
      </button>
      {openSections.includes(id) && <div className="pt-2">{children}</div>}
    </div>
  );

  const FiltersContent = () => (
    <div className="space-y-4">
      <FilterSection title="Category" id="category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter('category', selectedCategory === cat.slug ? null : cat.slug)}
              className={cn(
                'block w-full text-left py-1.5 text-sm transition-colors',
                selectedCategory === cat.slug ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size" id="size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleFilter('size', size)}
              className={cn(
                'px-4 py-2 text-sm rounded-lg border transition-all',
                selectedSizes.includes(size)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color" id="color">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleFilter('color', color.name)}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all',
                selectedColors.includes(color.name) ? 'border-primary ring-2 ring-primary/30' : 'border-border'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price" id="price">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setFilter('price', selectedPriceRange === range.label ? null : range.label)}
              className={cn(
                'block w-full text-left py-1.5 text-sm transition-colors',
                selectedPriceRange === range.label ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-28 pb-12 bg-gradient-rose">
        <div className="container-boutique text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-elegant text-primary mb-3 block">Discover Your Style</span>
            <h1 className="heading-editorial mb-4">All Dresses</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Explore our curated collection of elegant dresses for every occasion
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container-boutique py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-medium">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setFilter('sort', e.target.value)}
                  className="text-sm bg-transparent border-0 focus:outline-none cursor-pointer"
                >
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-1.5 rounded transition-colors',
                      viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted/50'
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-1.5 rounded transition-colors',
                      viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted/50'
                    )}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <button
                    onClick={() => setFilter('category', null)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm"
                  >
                    {categories.find((c) => c.slug === selectedCategory)?.name}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {selectedSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleFilter('size', size)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    Size: {size}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => toggleFilter('color', color)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-lavender-100 text-purple-700 rounded-full text-sm"
                  >
                    {color}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedPriceRange && (
                  <button
                    onClick={() => setFilter('price', null)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm"
                  >
                    {selectedPriceRange}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  'grid gap-4 md:gap-6',
                  viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                )}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-serif text-xl mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for
                </p>
                <Button onClick={clearAllFilters} className="btn-primary rounded-full px-8">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-background z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-serif text-xl">Filters</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <FiltersContent />
            </div>
            <div className="sticky bottom-0 p-5 bg-background border-t border-border">
              <Button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full btn-primary py-4 rounded-full"
              >
                Show {filteredProducts.length} Products
              </Button>
            </div>
          </motion.div>
        </>
      )}

      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
}
