'use client';

import { useRouter } from 'next/navigation';
import { FoodEntryForm } from '@/components/FoodEntryForm';
import Link from 'next/link';
import { DashboardSummary } from '@/components/DashboardSummary';
import { DiaryList, DiaryEntry } from '@/components/DiaryList';
import { Button } from '@/components/ui/button';
import { Activity, List, Sparkles } from 'lucide-react';

interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DashboardClientProps {
  entries: DiaryEntry[];
  totals: MacroTotals;
  goals: MacroTotals;
  dateLabel: string;
}

export function DashboardClient({ entries, totals, goals, dateLabel }: DashboardClientProps) {
  const router = useRouter();

  const handleChange = () => {
    router.refresh();
  };

  const calorieProgress = goals.calories
    ? Math.min(100, Math.max(0, (totals.calories / goals.calories) * 100))
    : 0;

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border bg-card/85 p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent/70 text-foreground">
                <Activity className="size-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Today • {dateLabel}
              </p>
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">Build a better day, one meal at a time.</h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Log what you eat and watch your goals get closer. Small steps, consistent progress.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <FoodEntryForm onSuccess={handleChange} />
            <Link href="/add" className="inline-flex">
              <Button variant="outline">Add from USDA</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border bg-card/85 p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-foreground/70" />
            Today&apos;s Summary
          </div>
          <div className="flex min-w-[180px] flex-1 items-center gap-2">
            <span className="text-xs text-muted-foreground">Calories</span>
            <div className="h-2 flex-1 rounded-full bg-muted/70">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${calorieProgress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.round(calorieProgress)}%
            </span>
          </div>
        </div>
        <DashboardSummary totals={totals} goals={goals} />
      </section>

      <section className="rounded-3xl border bg-card/85 p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List className="size-5 text-foreground/70" />
            <h2 className="text-xl font-semibold">Today&apos;s Entries</h2>
          </div>
          <Button variant="outline" size="sm" onClick={handleChange}>
            Refresh
          </Button>
        </div>
        <DiaryList entries={entries} onChange={handleChange} />
      </section>
    </div>
  );
}
