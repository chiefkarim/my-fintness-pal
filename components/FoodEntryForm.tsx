'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createFoodEntry, updateFoodEntry, deleteFoodEntry } from '@/lib/actions/entries';

interface FoodEntry {
  id: string;
  userId: string;
  date: string;
  timestamp: Date;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

interface FoodEntryFormProps {
  entry?: FoodEntry;
  onSuccess?: () => void;
}

export function FoodEntryForm({ entry, onSuccess }: FoodEntryFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: entry?.name || '',
    calories: entry?.calories || 0,
    protein: entry?.protein || 0,
    carbs: entry?.carbs || 0,
    fat: entry?.fat || 0,
    serving: entry?.serving || '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (entry) {
        await updateFoodEntry(entry.id, formData);
      } else {
        await createFoodEntry(formData);
      }
      setOpen(false);
      setFormData({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0, serving: '' });
      onSuccess?.();
    } catch (err) {
      console.error('Failed to save entry:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!entry) return;
    if (!confirm('Delete this entry?')) return;

    setLoading(true);
    try {
      await deleteFoodEntry(entry.id);
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error('Failed to delete entry:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={entry ? 'outline' : 'default'}>
          {entry ? 'Edit' : 'Add Food'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entry ? 'Edit Food Entry' : 'Add Food'}</DialogTitle>
          <DialogDescription>
            {entry ? 'Update the food entry details.' : 'Enter the food name and nutrition info.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Food Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Chicken breast"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Calories</label>
              <Input
                type="number"
                min="0"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Protein (g)</label>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Carbs (g)</label>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Fat (g)</label>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={formData.fat}
                onChange={(e) => setFormData({ ...formData, fat: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Serving</label>
            <Input
              value={formData.serving}
              onChange={(e) => setFormData({ ...formData, serving: e.target.value })}
              placeholder="e.g. 200g, 1 cup"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : entry ? 'Update' : 'Add'}
            </Button>

            {entry && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
