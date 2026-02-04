import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { occasions } from '@/data/products';

export function ShopByOccasion() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-rose-50/50">
      <div className="container-boutique">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-elegant text-primary mb-3 block">Find Your Perfect Look</span>
          <h2 className="heading-section">Shop by Occasion</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/occasion/${occasion.slug}`}
                className="group block relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img
                  src={occasion.image}
                  alt={occasion.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <h3 className="text-white font-serif text-xl md:text-2xl font-medium mb-1">
                      {occasion.name}
                    </h3>
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
