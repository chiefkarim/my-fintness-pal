export interface FoodEntry {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  timestamp: number; // milliseconds
  name: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  serving: string;
}

export interface DailyGoals {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

export interface DailyTotals {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyRemaining {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
