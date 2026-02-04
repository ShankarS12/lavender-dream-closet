import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', likes: 1234 },
  { id: 2, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80', likes: 2156 },
  { id: 3, image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=400&q=80', likes: 1875 },
  { id: 4, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80', likes: 3421 },
  { id: 5, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80', likes: 2987 },
  { id: 6, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80', likes: 1654 },
];

export function InstagramSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-lavender-50">
      <div className="container-boutique">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-elegant text-primary mb-3 block">Follow Us</span>
          <h2 className="heading-section mb-3">@BellaRosaOfficial</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Share your Bella Rosa moments with #MyBellaRosa for a chance to be featured
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white flex items-center gap-2">
                  <Instagram className="w-5 h-5" />
                  <span className="font-medium">{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
