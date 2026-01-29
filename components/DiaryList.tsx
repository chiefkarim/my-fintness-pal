'use client';

import { FoodEntryForm } from '@/components/FoodEntryForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Utensils } from 'lucide-react';

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
      <div className="rounded-2xl border border-dashed bg-muted/40 p-8 text-center">
        <div className="mx-auto max-w-sm space-y-3">
          <div className="relative mx-auto flex size-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-accent/60" />
            <div className="absolute -right-2 -top-2 size-4 rounded-full bg-primary/20" />
            <div className="absolute -bottom-2 -left-2 size-3 rounded-full bg-primary/25" />
            <div className="relative flex size-10 items-center justify-center rounded-full bg-card shadow-sm">
              <Sparkles className="size-5 text-foreground/80" />
            </div>
          </div>
          <div className="text-sm font-medium text-foreground">No entries yet</div>
          <p className="text-sm text-muted-foreground">
            Add your first meal to start tracking today&apos;s nutrition.
          </p>
          <div className="flex justify-center gap-2">
            <Link href="/add" className="inline-flex">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Add food
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="group flex flex-col gap-3 rounded-2xl border border-emerald-100/80 bg-card/85 p-4 shadow-sm transition hover:border-emerald-200/80 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/80">
                <Utensils className="size-4" />
              </span>
              <h3 className="text-base font-semibold">{entry.name}</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {formatTime(entry.timestamp)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">{entry.serving}</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                {Math.round(entry.calories)} cal
              </span>
              <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                P {formatMacro(entry.protein)}g
              </span>
              <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                C {formatMacro(entry.carbs)}g
              </span>
              <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                F {formatMacro(entry.fat)}g
              </span>
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
