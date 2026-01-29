'use server';

import { db } from '@/lib/db';
import { dailyGoals } from '@/lib/db/schema';
import { auth } from '@/auth';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function setDailyGoals(data: {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  // Check if goals exist
  const existing = await db
    .select()
    .from(dailyGoals)
    .where(eq(dailyGoals.userId, session.user.id))
    .get();

  if (existing) {
    return db
      .update(dailyGoals)
      .set(data)
      .where(eq(dailyGoals.userId, session.user.id));
  } else {
    return db.insert(dailyGoals).values({
      id: nanoid(),
      userId: session.user.id,
      ...data,
    });
  }
}

export async function getDailyGoals() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const goals = await db
    .select()
    .from(dailyGoals)
    .where(eq(dailyGoals.userId, session.user.id))
    .get();

  // Default goals if none set
  return (
    goals || {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fat: 65,
    }
  );
}
