import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Bestsellers', href: '/shop?filter=bestseller' },
    { name: 'Evening Wear', href: '/category/evening-wear' },
    { name: 'Bridal Collection', href: '/category/bridal' },
    { name: 'Sale', href: '/sale' },
  ],
  help: [
    { name: 'Shipping & Returns', href: '/shipping' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact Us', href: '/contact' },
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-rose-50">
      {/* Newsletter Section */}
      <div className="border-t border-rose-200">
        <div className="container-boutique py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="heading-section mb-3">Join the Bella Rosa Family</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to know about new arrivals, exclusive offers, and style inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="input-elegant flex-1"
              />
              <Button className="btn-primary px-8 py-3 rounded-full">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-rose-200">
        <div className="container-boutique py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <h2 className="font-serif text-2xl">
                  <span className="text-gradient font-semibold">Bella</span>
                  <span className="font-light">Rosa</span>
                </h2>
              </Link>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Curating timeless elegance for the modern woman. Each piece tells a story of sophistication and style.
              </p>
              <div className="flex items-center gap-3">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-hover transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Help</h4>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">About</h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>123 Fashion Avenue, New York, NY 10001</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+1 (800) BELLA-ROSA</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>hello@bellarosa.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-rose-200">
        <div className="container-boutique py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Bella Rosa. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="hover:text-foreground transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
