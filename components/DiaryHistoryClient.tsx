'use client';

import { useRouter } from 'next/navigation';
import { DiaryList, DiaryEntry } from '@/components/DiaryList';
import { Button } from '@/components/ui/button';

interface DiaryHistoryClientProps {
  entriesByDate: Record<string, DiaryEntry[]>;
}

function formatDateLabel(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function DiaryHistoryClient({ entriesByDate }: DiaryHistoryClientProps) {
  const router = useRouter();
  const dates = Object.keys(entriesByDate);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Diary</h1>
          <p className="text-sm text-muted-foreground">All logged entries by day.</p>
        </div>
        <Button variant="outline" onClick={() => router.refresh()}>
          Refresh
        </Button>
      </div>

      {dates.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No entries yet. Start by adding a meal.
        </div>
      ) : (
        <div className="space-y-10">
          {dates.map((date) => (
            <section key={date} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{formatDateLabel(date)}</h2>
                <span className="text-sm text-muted-foreground">
                  {entriesByDate[date].length} entries
                </span>
              </div>
              <DiaryList entries={entriesByDate[date]} onChange={() => router.refresh()} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
