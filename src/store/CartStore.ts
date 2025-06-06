// store/cartStore.ts
import {create} from 'zustand';

type CartItem = {
  productId: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (productId: string) => {
    set(state => {
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.productId === productId
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        };
      } else {
        return {
          items: [...state.items, {productId, quantity: 1}],
        };
      }
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set(state => ({
      items: state.items.map(item =>
        item.productId === productId ? {...item, quantity} : item
      ),
    }));
  },
  

  removeFromCart: (productId: string) => {
    set(state => ({
      items: state.items.filter(item => item.productId !== productId),
    }));
  },

  clearCart: () => {
    set({items: []});
  },
}));