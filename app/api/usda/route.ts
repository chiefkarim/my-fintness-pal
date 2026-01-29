import { NextRequest, NextResponse } from 'next/server';

const USDA_API_KEY = process.env.USDA_API_KEY || '';
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

export interface USDASearchResult {
  fdcId: number;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  if (!USDA_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const params = new URLSearchParams({
      query,
      api_key: USDA_API_KEY,
      pageSize: '10',
      pageNumber: '1',
    });

    const response = await fetch(`${USDA_BASE_URL}?${params}`);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('USDA API error:', response.status, response.statusText, errorBody);
      return NextResponse.json({ error: 'USDA search failed' }, { status: 500 });
    }

    const data = await response.json();
    const results = (data.foods || [])
      .map((food: any) => transformUSDAFood(food))
      .filter((f: USDASearchResult | null) => f !== null);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Failed to search USDA:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

function transformUSDAFood(food: any): USDASearchResult | null {
  try {
    const nutrients = food.foodNutrients || [];
    const getNutrient = (id: number) => {
      const nut = nutrients.find((n: any) => n.nutrientId === id);
      return nut ? Math.round(nut.value * 10) / 10 : 0;
    };

    // USDA nutrient IDs:
    // 1008 = Energy (kcal)
    // 1003 = Protein (g)
    // 1005 = Carbs (g)
    // 1004 = Fat (g)
    const calories = getNutrient(1008);
    const protein = getNutrient(1003);
    const carbs = getNutrient(1005);
    const fat = getNutrient(1004);

    if (calories === 0) return null;

    return {
      fdcId: food.fdcId,
      description: food.description,
      calories,
      protein,
      carbs,
      fat,
      servingSize: food.servingSize ? `${food.servingSize} ${food.servingSizeUnit || 'g'}` : '100 g',
    };
  } catch (error) {
    console.error('Failed to transform USDA food:', error);
    return null;
  }
}
