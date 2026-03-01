import { describe, it, expect, beforeEach } from 'vitest';
import { useQuoteStore } from '@/lib/quote-store';

const mockItem = {
  productId: 'latex-exam-gloves-powdered',
  productName: 'Powdered Latex Exam Gloves',
  categorySlug: 'gloves',
  categoryTitle: 'Gloves',
};

const mockItem2 = {
  productId: 'nitrile-exam-gloves',
  productName: 'Nitrile Exam Gloves',
  categorySlug: 'gloves',
  categoryTitle: 'Gloves',
};

describe('useQuoteStore', () => {
  beforeEach(() => {
    // Reset store between tests
    useQuoteStore.setState({
      items: [],
      isModalOpen: false,
      showForm: false,
    });
  });

  describe('addItem', () => {
    it('adds an item to the list', () => {
      useQuoteStore.getState().addItem(mockItem);
      const { items } = useQuoteStore.getState();

      expect(items).toHaveLength(1);
      expect(items[0].productId).toBe(mockItem.productId);
      expect(items[0].productName).toBe(mockItem.productName);
      expect(items[0].addedAt).toBeDefined();
    });

    it('prevents duplicate items', () => {
      useQuoteStore.getState().addItem(mockItem);
      useQuoteStore.getState().addItem(mockItem);
      const { items } = useQuoteStore.getState();

      expect(items).toHaveLength(1);
    });

    it('adds multiple different items', () => {
      useQuoteStore.getState().addItem(mockItem);
      useQuoteStore.getState().addItem(mockItem2);
      const { items } = useQuoteStore.getState();

      expect(items).toHaveLength(2);
    });
  });

  describe('removeItem', () => {
    it('removes an item by productId', () => {
      useQuoteStore.getState().addItem(mockItem);
      useQuoteStore.getState().addItem(mockItem2);
      useQuoteStore.getState().removeItem(mockItem.productId);
      const { items } = useQuoteStore.getState();

      expect(items).toHaveLength(1);
      expect(items[0].productId).toBe(mockItem2.productId);
    });

    it('does nothing when removing a nonexistent item', () => {
      useQuoteStore.getState().addItem(mockItem);
      useQuoteStore.getState().removeItem('nonexistent');
      const { items } = useQuoteStore.getState();

      expect(items).toHaveLength(1);
    });
  });

  describe('clearItems', () => {
    it('removes all items and resets showForm', () => {
      useQuoteStore.getState().addItem(mockItem);
      useQuoteStore.getState().addItem(mockItem2);
      useQuoteStore.getState().setShowForm(true);
      useQuoteStore.getState().clearItems();
      const { items, showForm } = useQuoteStore.getState();

      expect(items).toHaveLength(0);
      expect(showForm).toBe(false);
    });
  });

  describe('isInList', () => {
    it('returns true for items in the list', () => {
      useQuoteStore.getState().addItem(mockItem);
      expect(useQuoteStore.getState().isInList(mockItem.productId)).toBe(true);
    });

    it('returns false for items not in the list', () => {
      expect(useQuoteStore.getState().isInList('nonexistent')).toBe(false);
    });
  });

  describe('modal state', () => {
    it('opens modal', () => {
      useQuoteStore.getState().openModal();
      expect(useQuoteStore.getState().isModalOpen).toBe(true);
    });

    it('closes modal and resets showForm', () => {
      useQuoteStore.getState().openModal();
      useQuoteStore.getState().setShowForm(true);
      useQuoteStore.getState().closeModal();

      const { isModalOpen, showForm } = useQuoteStore.getState();
      expect(isModalOpen).toBe(false);
      expect(showForm).toBe(false);
    });

    it('opens modal with form', () => {
      useQuoteStore.getState().openModalWithForm();
      const { isModalOpen, showForm } = useQuoteStore.getState();

      expect(isModalOpen).toBe(true);
      expect(showForm).toBe(true);
    });
  });
});
