import { DiaryHistoryClient } from '@/components/DiaryHistoryClient';
import type { DiaryEntry } from '@/components/DiaryList';
import { getAllEntries } from '@/lib/actions/entries';

function groupEntriesByDate(entries: DiaryEntry[]): Record<string, DiaryEntry[]> {
  return entries.reduce<Record<string, DiaryEntry[]>>((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});
}

type RawEntry = Awaited<ReturnType<typeof getAllEntries>>[number];

function serializeEntry(entry: RawEntry): DiaryEntry {
  return {
    ...entry,
    timestamp: entry.timestamp.toISOString(),
  };
}

export default async function DiaryPage() {
  const entries = await getAllEntries();
  const serializedEntries = entries.map(serializeEntry);
  const grouped = groupEntriesByDate(serializedEntries);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <DiaryHistoryClient entriesByDate={grouped} />
    </div>
  );
}
