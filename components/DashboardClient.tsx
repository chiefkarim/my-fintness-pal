'use client';

import { useRouter } from 'next/navigation';
import { FoodEntryForm } from '@/components/FoodEntryForm';
import Link from 'next/link';
import { DashboardSummary } from '@/components/DashboardSummary';
import { DiaryList, DiaryEntry } from '@/components/DiaryList';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">{dateLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/add" className="inline-flex">
            <Button variant="outline">Add from USDA</Button>
          </Link>
          <FoodEntryForm onSuccess={handleChange} />
        </div>
      </div>

      <DashboardSummary totals={totals} goals={goals} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Today&apos;s Entries</h2>
          <Button variant="outline" size="sm" onClick={handleChange}>
            Refresh
          </Button>
        </div>
        <DiaryList entries={entries} onChange={handleChange} />
      </section>
    </div>
  );
}
