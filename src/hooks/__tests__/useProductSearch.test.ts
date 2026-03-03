import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { createElement, type ReactNode } from 'react';
import { useProductSearch } from '@/hooks/useProductSearch';
import enMessages from '../../../messages/en.json';
import frMessages from '../../../messages/fr.json';

type IntlMessages = typeof enMessages;

function createWrapper(locale: string, messages: IntlMessages) {
  return function Wrapper({ children }: { children: ReactNode }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createElement(NextIntlClientProvider, { locale, messages } as any, children);
  };
}

const enWrapper = createWrapper('en', enMessages);
const frWrapper = createWrapper('fr', frMessages);

describe('useProductSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns empty results for empty query', () => {
    const { result } = renderHook(() => useProductSearch(), {
      wrapper: enWrapper,
    });
    expect(result.current.results).toEqual([]);
    expect(result.current.query).toBe('');
    expect(result.current.isSearching).toBe(false);
  });

  it('debounces the search query', () => {
    const { result } = renderHook(() => useProductSearch(300), {
      wrapper: enWrapper,
    });

    act(() => {
      result.current.setQuery('gloves');
    });

    // Before debounce resolves, results should be empty
    expect(result.current.isSearching).toBe(true);
    expect(result.current.results).toEqual([]);

    // After debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.isSearching).toBe(false);
    expect(result.current.results.length).toBeGreaterThan(0);
  });

  it('returns results matching product names', () => {
    const { result } = renderHook(() => useProductSearch(0), {
      wrapper: enWrapper,
    });

    act(() => {
      result.current.setQuery('latex');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.results.length).toBeGreaterThan(0);
    expect(
      result.current.results.every(
        (r) =>
          r.translatedName.toLowerCase().includes('latex') ||
          r.translatedDescription.toLowerCase().includes('latex'),
      ),
    ).toBe(true);
  });

  it('clears results when query is emptied', () => {
    const { result } = renderHook(() => useProductSearch(0), {
      wrapper: enWrapper,
    });

    act(() => {
      result.current.setQuery('latex');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.results.length).toBeGreaterThan(0);

    act(() => {
      result.current.setQuery('');
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.isSearching).toBe(false);
  });

  it('returns empty results for no matches', () => {
    const { result } = renderHook(() => useProductSearch(0), {
      wrapper: enWrapper,
    });

    act(() => {
      result.current.setQuery('xyznonexistentproduct123');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.results).toEqual([]);
  });

  it('prioritizes name matches over description matches', () => {
    const { result } = renderHook(() => useProductSearch(0), {
      wrapper: enWrapper,
    });

    act(() => {
      result.current.setQuery('gloves');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    // Name matches should come first
    const results = result.current.results;
    if (results.length > 1) {
      const firstHasNameMatch = results[0].translatedName
        .toLowerCase()
        .includes('gloves');
      expect(firstHasNameMatch).toBe(true);
    }
  });

  it('handles accented characters via normalization', () => {
    const { result } = renderHook(() => useProductSearch(0), {
      wrapper: enWrapper,
    });

    // The normalizeString function strips diacritics
    act(() => {
      result.current.setQuery('sterile');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    // Just verify it doesn't crash and returns consistent results
    const resultsWithoutAccent = result.current.results.length;

    act(() => {
      result.current.setQuery('stérile');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    // Normalized search should produce same results
    expect(result.current.results.length).toBe(resultsWithoutAccent);
  });

  it('searches against French translations when locale is fr', () => {
    const { result } = renderHook(() => useProductSearch(0), {
      wrapper: frWrapper,
    });

    // "gants" is French for "gloves"
    act(() => {
      result.current.setQuery('gants');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.results.length).toBeGreaterThan(0);
    expect(
      result.current.results.some((r) =>
        r.translatedName.toLowerCase().includes('gants'),
      ),
    ).toBe(true);
  });

  it('does not match English terms when locale is fr', () => {
    const { result } = renderHook(() => useProductSearch(0), {
      wrapper: frWrapper,
    });

    // "gloves" is the English term — should not match French translated names
    act(() => {
      result.current.setQuery('gloves');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.results.length).toBe(0);
  });

  it('returns translated names and category titles for fr locale', () => {
    const { result } = renderHook(() => useProductSearch(0), {
      wrapper: frWrapper,
    });

    act(() => {
      result.current.setQuery('latex');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.results.length).toBeGreaterThan(0);
    // Category title should be in French
    const firstResult = result.current.results[0];
    expect(firstResult.translatedCategoryTitle).toBe('Gants');
  });
});
