import { DiaryHistoryClient } from '@/components/DiaryHistoryClient';
import { getAllEntries } from '@/lib/actions/entries';

function groupEntriesByDate(entries: Array<{ date: string }>) {
  return entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});
}

export default async function DiaryPage() {
  const entries = await getAllEntries();
  const serializedEntries = entries.map((entry) => ({
    ...entry,
    timestamp: entry.timestamp.toISOString(),
  }));
  const grouped = groupEntriesByDate(serializedEntries);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <DiaryHistoryClient entriesByDate={grouped} />
    </div>
  );
}
