'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getDailyGoals, setDailyGoals } from '@/lib/actions/goals';

export function GoalsForm() {
  const [goals, setGoals] = useState({ calories: 2000, protein: 150, carbs: 200, fat: 65 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getDailyGoals();
        setGoals(data);
      } catch (err) {
        console.error('Failed to load goals:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await setDailyGoals(goals);
      setMessage('Goals saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save goals');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Daily Goals</CardTitle>
        <CardDescription>Set your nutrition targets</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Calories</label>
            <Input
              type="number"
              min="0"
              value={goals.calories}
              onChange={(e) => setGoals({ ...goals, calories: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Protein (g)</label>
            <Input
              type="number"
              min="0"
              value={goals.protein}
              onChange={(e) => setGoals({ ...goals, protein: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Carbs (g)</label>
            <Input
              type="number"
              min="0"
              value={goals.carbs}
              onChange={(e) => setGoals({ ...goals, carbs: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Fat (g)</label>
            <Input
              type="number"
              min="0"
              value={goals.fat}
              onChange={(e) => setGoals({ ...goals, fat: Number(e.target.value) })}
            />
          </div>

          {message && (
            <div className="text-sm text-green-600">{message}</div>
          )}

          <Button type="submit" disabled={saving} className="w-full">
            {saving ? 'Saving...' : 'Save Goals'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
