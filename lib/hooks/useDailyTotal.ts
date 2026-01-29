'use client';

import { useEffect, useState } from 'react';
import { storage } from '../data/storage';
import { DailyTotals, DailyRemaining } from '../data/models';

export function useDailyTotal(date: string) {
  const [totals, setTotals] = useState<DailyTotals>({
    date,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  useEffect(() => {
    const entries = storage.getEntriesByDate(date);
    const computed: DailyTotals = {
      date,
      calories: entries.reduce((sum, e) => sum + e.calories, 0),
      protein: entries.reduce((sum, e) => sum + e.protein, 0),
      carbs: entries.reduce((sum, e) => sum + e.carbs, 0),
      fat: entries.reduce((sum, e) => sum + e.fat, 0),
    };
    setTotals(computed);
  }, [date]);

  return totals;
}

export function useDailyRemaining(date: string): DailyRemaining {
  const totals = useDailyTotal(date);
  const goals = storage.getGoals();

  return {
    calories: Math.max(0, goals.calories - totals.calories),
    protein: Math.max(0, goals.protein - totals.protein),
    carbs: Math.max(0, goals.carbs - totals.carbs),
    fat: Math.max(0, goals.fat - totals.fat),
  };
}
