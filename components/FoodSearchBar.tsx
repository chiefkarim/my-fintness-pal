'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FoodSearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export function FoodSearchBar({ onSearch, loading = false }: FoodSearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search USDA foods (e.g. chicken breast)"
        className="flex-1"
      />
      <Button type="submit" disabled={loading || !query.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
}
