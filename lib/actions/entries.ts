'use server';

import { db } from '@/lib/db';
import { foodEntries } from '@/lib/db/schema';
import { auth } from '@/auth';
import { eq, and, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function createFoodEntry(data: {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD

  return db.insert(foodEntries).values({
    id: nanoid(),
    userId: session.user.id,
    date,
    timestamp: now,
    name: data.name,
    calories: data.calories,
    protein: data.protein,
    carbs: data.carbs,
    fat: data.fat,
    serving: data.serving,
  });
}

export async function updateFoodEntry(
  id: string,
  data: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    serving: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  return db
    .update(foodEntries)
    .set(data)
    .where(
      and(eq(foodEntries.id, id), eq(foodEntries.userId, session.user.id))
    );
}

export async function deleteFoodEntry(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  return db
    .delete(foodEntries)
    .where(
      and(eq(foodEntries.id, id), eq(foodEntries.userId, session.user.id))
    );
}

export async function getTodayEntries() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const now = new Date();
  const date = now.toISOString().split('T')[0];

  return db
    .select()
    .from(foodEntries)
    .where(
      and(eq(foodEntries.userId, session.user.id), eq(foodEntries.date, date))
    )
    .orderBy(desc(foodEntries.timestamp));
}

export async function getDailyTotals() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const entries = await getTodayEntries();
  return {
    calories: entries.reduce((sum, e) => sum + e.calories, 0),
    protein: entries.reduce((sum, e) => sum + e.protein, 0),
    carbs: entries.reduce((sum, e) => sum + e.carbs, 0),
    fat: entries.reduce((sum, e) => sum + e.fat, 0),
  };
}
