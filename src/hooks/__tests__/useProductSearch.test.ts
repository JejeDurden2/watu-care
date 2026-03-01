import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProductSearch } from '@/hooks/useProductSearch';

describe('useProductSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns empty results for empty query', () => {
    const { result } = renderHook(() => useProductSearch());
    expect(result.current.results).toEqual([]);
    expect(result.current.query).toBe('');
    expect(result.current.isSearching).toBe(false);
  });

  it('debounces the search query', () => {
    const { result } = renderHook(() => useProductSearch(300));

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
    const { result } = renderHook(() => useProductSearch(0));

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
          r.product.name.toLowerCase().includes('latex') ||
          r.product.description.toLowerCase().includes('latex'),
      ),
    ).toBe(true);
  });

  it('clears results when query is emptied', () => {
    const { result } = renderHook(() => useProductSearch(0));

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
    const { result } = renderHook(() => useProductSearch(0));

    act(() => {
      result.current.setQuery('xyznonexistentproduct123');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.results).toEqual([]);
  });

  it('prioritizes name matches over description matches', () => {
    const { result } = renderHook(() => useProductSearch(0));

    act(() => {
      result.current.setQuery('gloves');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    // Name matches should come first
    const results = result.current.results;
    if (results.length > 1) {
      const firstHasNameMatch = results[0].product.name
        .toLowerCase()
        .includes('gloves');
      expect(firstHasNameMatch).toBe(true);
    }
  });

  it('handles accented characters via normalization', () => {
    const { result } = renderHook(() => useProductSearch(0));

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
});
