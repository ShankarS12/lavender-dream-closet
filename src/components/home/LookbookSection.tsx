import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const lookbookImages = [
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
  'https://images.unsplash.com/photo-1485968579169-a6b296f5bc1a?w=600&q=80',
];

export function LookbookSection() {
  return (
    <section className="section-padding bg-foreground text-white overflow-hidden">
      <div className="container-boutique">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-elegant text-rose-300 mb-4 block">Style Inspiration</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
              The Spring/Summer 2024 Lookbook
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
              Explore our latest collection through the lens of renowned fashion photographer
              Sofia Laurent. Discover new ways to style your favorite pieces and find
              inspiration for your next look.
            </p>
            <div className="flex gap-4">
              <Link to="/lookbook">
                <Button className="bg-white text-foreground hover:bg-white/90 px-8 py-6 rounded-full text-base font-medium">
                  View Lookbook
                </Button>
              </Link>
              <Link to="/shop">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-base font-medium bg-transparent"
                >
                  Shop The Edit
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {lookbookImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${index % 2 === 1 ? 'mt-8' : ''}`}
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden hover-zoom">
                    <img
                      src={image}
                      alt={`Lookbook ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
