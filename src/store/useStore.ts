import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  occasion: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  fabric: string;
  fit: string;
  modelInfo: string;
  isNew?: boolean;
  isTrending?: boolean;
  isBestseller?: boolean;
  lowStock?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: Date;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

  // UI State
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (i) =>
              i.product.id === item.product.id &&
              i.size === item.size &&
              i.color === item.color
          );
          if (existingIndex >= 0) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += item.quantity;
            return { cart: newCart };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (productId, size, color) =>
        set((state) => ({
          cart: state.cart.filter(
            (i) =>
              !(i.product.id === productId && i.size === size && i.color === color)
          ),
        })),
      updateCartQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (productId) =>
        set((state) => ({
          wishlist: [...state.wishlist, { productId, addedAt: new Date() }],
        })),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((i) => i.productId !== productId),
        })),
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some((i) => i.productId === productId);
      },

      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // UI State
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isAuthModalOpen: false,
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      authModalMode: 'login',
      setAuthModalMode: (mode) => set({ authModalMode: mode }),
    }),
    {
      name: 'bella-rosa-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
