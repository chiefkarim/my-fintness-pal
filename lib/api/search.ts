'use client';

import { USDASearchResult } from '@/app/api/usda/route';

export async function searchFoods(query: string): Promise<USDASearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(`/api/usda?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Search failed:', response.status, response.statusText, errorBody);
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}
