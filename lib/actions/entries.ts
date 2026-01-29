'use server';

import { getPrisma } from '@/lib/db';
import { auth } from '@/auth';

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

  const prisma = getPrisma();
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD

  return prisma.foodEntry.create({
    data: {
      userId: session.user.id,
      date,
      timestamp: now,
      name: data.name,
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
      serving: data.serving,
    },
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

  const prisma = getPrisma();

  return prisma.foodEntry.updateMany({
    where: {
      id,
      userId: session.user.id,
    },
    data,
  });
}

export async function deleteFoodEntry(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const prisma = getPrisma();

  return prisma.foodEntry.deleteMany({
    where: {
      id,
      userId: session.user.id,
    },
  });
}

export async function getTodayEntries() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const prisma = getPrisma();
  const now = new Date();
  const date = now.toISOString().split('T')[0];

  return prisma.foodEntry.findMany({
    where: {
      userId: session.user.id,
      date,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
}

export async function getDailyTotals() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const entries = await getTodayEntries();
  return {
    calories: entries.reduce((sum: number, e: any) => sum + e.calories, 0),
    protein: entries.reduce((sum: number, e: any) => sum + e.protein, 0),
    carbs: entries.reduce((sum: number, e: any) => sum + e.carbs, 0),
    fat: entries.reduce((sum: number, e: any) => sum + e.fat, 0),
  };
}
