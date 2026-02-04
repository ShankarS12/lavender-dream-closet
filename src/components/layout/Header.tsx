import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'New Arrivals', href: '/new-arrivals' },
  { 
    name: 'Shop', 
    href: '/shop',
    children: [
      { name: 'All Dresses', href: '/shop' },
      { name: 'Evening Wear', href: '/category/evening-wear' },
      { name: 'Cocktail', href: '/category/cocktail' },
      { name: 'Bridal', href: '/category/bridal' },
      { name: 'Day Dresses', href: '/category/day-dresses' },
      { name: 'Maxi Dresses', href: '/category/maxi-dresses' },
    ]
  },
  { name: 'Collections', href: '/collections' },
  { name: 'Lookbook', href: '/lookbook' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  
  const { 
    getCartCount, 
    wishlist, 
    setCartOpen, 
    isAuthenticated, 
    user,
    setAuthModalOpen 
  } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-soft py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-boutique">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-rose-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-serif text-2xl md:text-3xl tracking-wide">
                <span className="text-gradient font-semibold">Bella</span>
                <span className="font-light">Rosa</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'text-sm font-medium tracking-wide transition-colors flex items-center gap-1 link-underline py-2',
                      location.pathname === link.href
                        ? 'text-primary'
                        : 'text-foreground/80 hover:text-foreground'
                    )}
                  >
                    {link.name}
                    {link.children && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated overflow-hidden"
                      >
                        <div className="py-3">
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className="block px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-rose-50 transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2 hover:bg-rose-100 rounded-full transition-colors hidden md:flex">
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => isAuthenticated ? undefined : setAuthModalOpen(true)}
                className="p-2 hover:bg-rose-100 rounded-full transition-colors"
              >
                {isAuthenticated && user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              <Link to="/wishlist" className="p-2 hover:bg-rose-100 rounded-full transition-colors relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:bg-rose-100 rounded-full transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-serif text-xl">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-rose-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-5 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      to={link.href}
                      className="block py-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                    {link.children && (
                      <div className="ml-4 space-y-1 border-l-2 border-rose-200 pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
