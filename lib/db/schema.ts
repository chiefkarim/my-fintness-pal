import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  image: text('image'),
  password: text('password'), // hashed, for credentials provider
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const foodEntries = sqliteTable('food_entries', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  date: text('date').notNull(), // YYYY-MM-DD
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
  name: text('name').notNull(),
  calories: real('calories').notNull(),
  protein: real('protein').notNull(), // grams
  carbs: real('carbs').notNull(), // grams
  fat: real('fat').notNull(), // grams
  serving: text('serving').notNull(),
});

export const dailyGoals = sqliteTable('daily_goals', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  calories: real('calories').notNull(),
  protein: real('protein').notNull(), // grams
  carbs: real('carbs').notNull(), // grams
  fat: real('fat').notNull(), // grams
});

// Relations for ORM joins
export const usersRelations = relations(users, ({ many, one }) => ({
  foodEntries: many(foodEntries),
  dailyGoals: one(dailyGoals),
}));

export const foodEntriesRelations = relations(foodEntries, ({ one }) => ({
  user: one(users, {
    fields: [foodEntries.userId],
    references: [users.id],
  }),
}));

export const dailyGoalsRelations = relations(dailyGoals, ({ one }) => ({
  user: one(users, {
    fields: [dailyGoals.userId],
    references: [users.id],
  }),
}));

// Inferred types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type FoodEntry = typeof foodEntries.$inferSelect;
export type NewFoodEntry = typeof foodEntries.$inferInsert;

export type DailyGoals = typeof dailyGoals.$inferSelect;
export type NewDailyGoals = typeof dailyGoals.$inferInsert;
