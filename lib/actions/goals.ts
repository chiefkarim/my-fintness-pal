'use server';

import { getPrisma } from '@/lib/db';
import { auth } from '@/auth';

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

  const prisma = getPrisma();

  // Check if goals exist
  const existing = await prisma.dailyGoals.findUnique({
    where: { userId: session.user.id },
  });

  if (existing) {
    return prisma.dailyGoals.update({
      where: { userId: session.user.id },
      data,
    });
  } else {
    return prisma.dailyGoals.create({
      data: {
        userId: session.user.id,
        ...data,
      },
    });
  }
}

export async function getDailyGoals() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const prisma = getPrisma();
  const goals = await prisma.dailyGoals.findUnique({
    where: { userId: session.user.id },
  });

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
