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
    },
    {
      label: 'Protein (g)',
      total: totals.protein,
      goal: goals.protein,
      remaining: remaining.protein,
    },
    {
      label: 'Carbs (g)',
      total: totals.carbs,
      goal: goals.carbs,
      remaining: remaining.carbs,
    },
    {
      label: 'Fat (g)',
      total: totals.fat,
      goal: goals.fat,
      remaining: remaining.fat,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-semibold">
              {formatNumber(card.total, card.isCalories)}
              <span className="text-sm text-muted-foreground"> / {formatNumber(card.goal, card.isCalories)}</span>
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
