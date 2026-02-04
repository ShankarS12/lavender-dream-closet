import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collections } from '@/data/products';

export function CollectionsSection() {
  return (
    <section className="section-padding">
      <div className="container-boutique">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-elegant text-primary mb-3 block">Curated For You</span>
          <h2 className="heading-section">Featured Collections</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {collections.slice(0, 2).map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                to={`/collection/${collection.id}`}
                className="group block relative aspect-[16/10] rounded-3xl overflow-hidden"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center p-8 md:p-12">
                  <div className="max-w-xs">
                    <h3 className="font-serif text-3xl md:text-4xl text-white font-medium mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-white/80 mb-4">{collection.description}</p>
                    <span className="inline-flex items-center gap-2 text-white font-medium border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                      Explore Collection
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {collections.slice(2, 5).map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                to={`/collection/${collection.id}`}
                className="group block relative aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-medium mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-white/70 text-sm">{collection.description}</p>
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
