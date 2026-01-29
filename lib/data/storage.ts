import { FoodEntry, DailyGoals } from './models';

const ENTRIES_KEY = 'meal-tracker-entries';
const GOALS_KEY = 'meal-tracker-goals';

export const storage = {
  // Entries
  getEntries: (): FoodEntry[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(ENTRIES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      console.error('Failed to load entries');
      return [];
    }
  },

  saveEntries: (entries: FoodEntry[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    } catch {
      console.error('Failed to save entries');
    }
  },

  addEntry: (entry: FoodEntry): void => {
    const entries = storage.getEntries();
    entries.push(entry);
    storage.saveEntries(entries);
  },

  updateEntry: (id: string, updates: Partial<FoodEntry>): void => {
    const entries = storage.getEntries();
    const idx = entries.findIndex((e) => e.id === id);
    if (idx >= 0) {
      entries[idx] = { ...entries[idx], ...updates };
      storage.saveEntries(entries);
    }
  },

  deleteEntry: (id: string): void => {
    const entries = storage.getEntries().filter((e) => e.id !== id);
    storage.saveEntries(entries);
  },

  getEntriesByDate: (date: string): FoodEntry[] => {
    return storage.getEntries().filter((e) => e.date === date);
  },

  // Goals
  getGoals: (): DailyGoals => {
    if (typeof window === 'undefined') return defaultGoals();
    try {
      const data = localStorage.getItem(GOALS_KEY);
      return data ? JSON.parse(data) : defaultGoals();
    } catch {
      console.error('Failed to load goals');
      return defaultGoals();
    }
  },

  saveGoals: (goals: DailyGoals): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    } catch {
      console.error('Failed to save goals');
    }
  },
};

function defaultGoals(): DailyGoals {
  return {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65,
  };
}
