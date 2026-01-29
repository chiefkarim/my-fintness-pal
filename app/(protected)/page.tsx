import { DashboardClient } from '@/components/DashboardClient';
import type { DiaryEntry } from '@/components/DiaryList';
import { getTodayEntries, getDailyTotals } from '@/lib/actions/entries';
import { getDailyGoals } from '@/lib/actions/goals';

function formatDateLabel(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

type RawEntry = Awaited<ReturnType<typeof getTodayEntries>>[number];

function serializeEntry(entry: RawEntry): DiaryEntry {
  return {
    ...entry,
    timestamp: entry.timestamp.toISOString(),
  };
}

export default async function Home() {
  const [entries, totals, goals] = await Promise.all([
    getTodayEntries(),
    getDailyTotals(),
    getDailyGoals(),
  ]);

  const serializedEntries = entries.map(serializeEntry);

  return (
    <DashboardClient
      entries={serializedEntries}
      totals={totals}
      goals={goals}
      dateLabel={formatDateLabel(new Date())}
    />
  );
}
