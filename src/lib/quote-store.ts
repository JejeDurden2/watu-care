import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteItem {
  productId: string;
  productName: string;
  categorySlug: string;
  categoryTitle: string;
  addedAt: number;
}

interface QuoteStore {
  items: QuoteItem[];
  isModalOpen: boolean;
  showForm: boolean;
  addItem: (item: Omit<QuoteItem, 'addedAt'>) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  openModal: () => void;
  closeModal: () => void;
  setShowForm: (show: boolean) => void;
  isInList: (productId: string) => boolean;
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],
      isModalOpen: false,
      showForm: false,

      addItem: (item) =>
        set((state) => {
          // Prevent duplicates
          if (state.items.some((i) => i.productId === item.productId)) {
            return state;
          }
          return {
            items: [...state.items, { ...item, addedAt: Date.now() }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      clearItems: () => set({ items: [], showForm: false }),

      openModal: () => set({ isModalOpen: true }),

      closeModal: () => set({ isModalOpen: false, showForm: false }),

      setShowForm: (show) => set({ showForm: show }),

      isInList: (productId) =>
        get().items.some((i) => i.productId === productId),
    }),
    {
      name: 'watu-care-product-list',
      skipHydration: true,
    },
  ),
);
