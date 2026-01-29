'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FoodSearchBar } from '@/components/FoodSearchBar';
import { FoodResults } from '@/components/FoodResults';
import { searchFoods } from '@/lib/api/search';
import { USDASearchResult } from '@/app/api/usda/route';
import { Button } from '@/components/ui/button';

export function AddFoodClient() {
  const [results, setResults] = useState<USDASearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchFoods(query);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAdded = () => {
    router.push('/');
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Add Food</h1>
          <p className="text-sm text-muted-foreground">Search the USDA database to log meals.</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/')}
        >
          Back to dashboard
        </Button>
      </div>

      <FoodSearchBar onSearch={handleSearch} loading={loading} />

      <FoodResults results={results} onAdded={handleAdded} />
    </div>
  );
}
