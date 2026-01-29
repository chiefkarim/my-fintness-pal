'use client';

import { FoodEntryForm } from '@/components/FoodEntryForm';

export interface DiaryEntry {
  id: string;
  date: string;
  timestamp: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

interface DiaryListProps {
  entries: DiaryEntry[];
  onChange?: () => void;
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function formatMacro(value: number) {
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
}

export function DiaryList({ entries, onChange }: DiaryListProps) {
  if (!entries.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No entries yet. Add your first meal to get started.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex flex-col gap-3 rounded-lg border bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">{entry.name}</h3>
              <span className="text-xs text-muted-foreground">{formatTime(entry.timestamp)}</span>
            </div>
            <p className="text-sm text-muted-foreground">{entry.serving}</p>
            <div className="text-sm">
              <span className="font-medium">{Math.round(entry.calories)} cal</span>
              <span className="text-muted-foreground"> · P {formatMacro(entry.protein)}g</span>
              <span className="text-muted-foreground"> · C {formatMacro(entry.carbs)}g</span>
              <span className="text-muted-foreground"> · F {formatMacro(entry.fat)}g</span>
            </div>
          </div>

          <div className="flex gap-2">
            <FoodEntryForm entry={entry} onSuccess={onChange} />
          </div>
        </div>
      ))}
    </div>
  );
}
