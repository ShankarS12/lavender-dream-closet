import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { ShopByOccasion } from '@/components/home/ShopByOccasion';
import { TrendingSection } from '@/components/home/TrendingSection';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';
import { CollectionsSection } from '@/components/home/CollectionsSection';
import { LookbookSection } from '@/components/home/LookbookSection';
import { InstagramSection } from '@/components/home/InstagramSection';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ShopByOccasion />
        <TrendingSection />
        <CollectionsSection />
        <NewArrivalsSection />
        <LookbookSection />
        <InstagramSection />
      </main>
      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
};

export default Index;
