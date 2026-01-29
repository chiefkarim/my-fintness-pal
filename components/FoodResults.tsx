'use client';

import { useState } from 'react';
import { USDASearchResult } from '@/app/api/usda/route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createFoodEntry } from '@/lib/actions/entries';

interface FoodResultsProps {
  results: USDASearchResult[];
  onAdded?: () => void;
}

interface ServingState {
  serving: string;
  multiplier: number;
}

function formatMacro(value: number) {
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
}

export function FoodResults({ results, onAdded }: FoodResultsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [servingState, setServingState] = useState<Record<number, ServingState>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const getServingState = (result: USDASearchResult): ServingState => {
    return (
      servingState[result.fdcId] || {
        serving: result.servingSize || '100 g',
        multiplier: 1,
      }
    );
  };

  const updateServingState = (fdcId: number, next: Partial<ServingState>) => {
    setServingState((prev) => ({
      ...prev,
      [fdcId]: {
        serving: prev[fdcId]?.serving || '100 g',
        multiplier: prev[fdcId]?.multiplier ?? 1,
        ...next,
      },
    }));
  };

  const handleAdd = async (result: USDASearchResult) => {
    const state = getServingState(result);
    const multiplier = Number.isFinite(state.multiplier) && state.multiplier > 0 ? state.multiplier : 1;
    const servingLabel = state.serving?.trim() || result.servingSize || '100 g';

    setLoadingId(result.fdcId);
    try {
      await createFoodEntry({
        name: result.description,
        calories: Math.round(result.calories * multiplier * 10) / 10,
        protein: Math.round(result.protein * multiplier * 10) / 10,
        carbs: Math.round(result.carbs * multiplier * 10) / 10,
        fat: Math.round(result.fat * multiplier * 10) / 10,
        serving: multiplier === 1 ? servingLabel : `${servingLabel} x${multiplier}`,
      });
      onAdded?.();
    } catch (error) {
      console.error('Failed to add USDA entry:', error);
    } finally {
      setLoadingId(null);
    }
  };

  if (!results.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No results yet. Try another search.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => {
        const state = getServingState(result);
        const isExpanded = expandedId === result.fdcId;
        const multiplier = Number.isFinite(state.multiplier) && state.multiplier > 0 ? state.multiplier : 1;

        return (
          <Card key={result.fdcId}>
            <CardHeader className="space-y-2">
              <CardTitle className="text-base font-semibold">{result.description}</CardTitle>
              <div className="text-xs text-muted-foreground">
                Per {result.servingSize} • {Math.round(result.calories)} cal • P {formatMacro(result.protein)}g • C {formatMacro(result.carbs)}g • F {formatMacro(result.fat)}g
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isExpanded && (
                <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Serving description</label>
                    <Input
                      value={state.serving}
                      onChange={(event) => updateServingState(result.fdcId, { serving: event.target.value })}
                      placeholder="e.g. 1 cup, 200 g"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Multiplier</label>
                    <Input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={state.multiplier}
                      onChange={(event) => updateServingState(result.fdcId, { multiplier: Number(event.target.value) })}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={isExpanded ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => setExpandedId(isExpanded ? null : result.fdcId)}
                >
                  {isExpanded ? 'Hide options' : 'Adjust serving'}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAdd(result)}
                  disabled={loadingId === result.fdcId}
                >
                  {loadingId === result.fdcId
                    ? 'Adding...'
                    : `Add (${Math.round(result.calories * multiplier)} cal)`}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
