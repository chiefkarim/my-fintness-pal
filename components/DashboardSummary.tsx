import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DashboardSummaryProps {
  totals: MacroTotals;
  goals: MacroTotals;
}

function formatNumber(value: number, isCalories = false) {
  if (isCalories) return Math.round(value).toString();
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
}

function getPercent(total: number, goal: number) {
  if (!goal) return 0;
  return Math.min(100, Math.max(0, (total / goal) * 100));
}

export function DashboardSummary({ totals, goals }: DashboardSummaryProps) {
  const remaining = {
    calories: Math.max(0, goals.calories - totals.calories),
    protein: Math.max(0, goals.protein - totals.protein),
    carbs: Math.max(0, goals.carbs - totals.carbs),
    fat: Math.max(0, goals.fat - totals.fat),
  };

  const cards = [
    {
      label: 'Calories',
      total: totals.calories,
      goal: goals.calories,
      remaining: remaining.calories,
      isCalories: true,
      accent: 'border-l-orange-500/70',
      bar: 'bg-orange-500',
    },
    {
      label: 'Protein (g)',
      total: totals.protein,
      goal: goals.protein,
      remaining: remaining.protein,
      accent: 'border-l-emerald-500/70',
      bar: 'bg-emerald-500',
    },
    {
      label: 'Carbs (g)',
      total: totals.carbs,
      goal: goals.carbs,
      remaining: remaining.carbs,
      accent: 'border-l-blue-500/70',
      bar: 'bg-blue-500',
    },
    {
      label: 'Fat (g)',
      total: totals.fat,
      goal: goals.fat,
      remaining: remaining.fat,
      accent: 'border-l-violet-500/70',
      bar: 'bg-violet-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className={`border-l-4 ${card.accent}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-semibold">
              {formatNumber(card.total, card.isCalories)}
              <span className="text-sm text-muted-foreground"> / {formatNumber(card.goal, card.isCalories)}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted/70">
              <div
                className={`h-2 rounded-full ${card.bar}`}
                style={{ width: `${getPercent(card.total, card.goal)}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Remaining: {formatNumber(card.remaining, card.isCalories)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
