'use server';

import { getPrisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function registerUser(email: string, password: string, name?: string) {
  const prisma = getPrisma();

  // Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error('Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  return prisma.user.create({
    data: {
      email,
      name: name || undefined,
      password: hashedPassword,
    },
  });
}
