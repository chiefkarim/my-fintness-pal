# Meal Tracker App - Implementation Spec

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Storage**: LocalStorage (MVP), IndexedDB (future)
- **ML**: TensorFlow.js + MobileNet v2
- **APIs**: USDA FoodData Central (free), Open Food Facts (future)

## Data Models

```typescript
// Core entry
interface FoodEntry {
  id: string;
  date: string; // ISO date
  timestamp: number;
  name: string;
  calories: number;
  protein: number; // grams
  carbs: number;
  fat: number;
  serving: string;
}

// User goals
interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Computed totals
interface DailyTotals {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
```

## Responsibility Boundaries

### Data Layer (`/lib/data/`)
- LocalStorage abstraction with typed interface
- CRUD operations for FoodEntry
- Goals persistence and retrieval
- Computed totals by date

### API Layer (`/lib/api/`)
- USDA client (Foundation dataset)
- Response transformers (USDA → FoodEntry schema)
- Search caching (session storage)

### ML Layer (`/lib/ml/`)
- Lazy-load MobileNet (~13MB)
- Image preprocessing (resize to 224x224)
- Return top 3 predictions

### UI Components (`/components/`)
- `DashboardSummary`: totals + remaining vs goals
- `GoalsForm`: set/edit daily targets
- `FoodSearchBar`: USDA query
- `FoodResults`: selectable results
- `FoodEntryForm`: confirm serving size
- `DiaryList`: grouped entries, edit/delete
- `MealScanner`: camera + upload UI
- `SuggestionsList`: ML labels → USDA matches

### Pages (`/app/`)
- `/`: Dashboard (today's totals + quick add)
- `/add`: Food search + manual entry
- `/scan`: Meal photo scan
- `/diary`: Full history (all days)
- `/goals`: Set daily targets

## Implementation Phases

### Phase 1: Core Diary (Manual Entry)
**Milestone**: Track meals without API/ML

Files:
- `app/layout.tsx`: Tailwind + global providers
- `lib/data/storage.ts`: LocalStorage abstraction
- `lib/data/models.ts`: TypeScript interfaces
- `lib/hooks/useLocalStorage.ts`: React hook
- `lib/hooks/useDailyTotal.ts`: Computed totals
- `components/DashboardSummary.tsx`: Totals display
- `components/FoodEntryForm.tsx`: Manual add form
- `components/DiaryList.tsx`: Entry list with actions
- `components/GoalsForm.tsx`: Set daily targets
- `app/page.tsx`: Dashboard page
- `app/goals/page.tsx`: Goals management

Features:
- Add entry with manual nutrition input
- Edit/delete entries
- View today's totals
- Set daily goals (calories, protein, carbs, fat)
- Show remaining vs goals

### Phase 2: USDA Search
**Milestone**: Search real foods, auto-populate nutrition

New files:
- `lib/api/usda.ts`: API client
- `components/FoodSearchBar.tsx`: Search UI
- `components/FoodResults.tsx`: Result selection
- `app/add/page.tsx`: Search page
- `.env.local`: USDA API key

Features:
- Search USDA Foundation dataset
- Display nutrition per 100g
- User selects serving size (0.5x, 1x, 2x, or custom grams)
- Transform to FoodEntry and save

API Setup:
- Get free key from https://fdc.nal.usda.gov/api-key-signup.html
- Rate limit: 1000 req/hour
- Use Next.js API route `/app/api/usda/route.ts` to proxy requests (hide key)

### Phase 3: Image Classification
**Milestone**: Photo → food labels

New files:
- `lib/ml/mobilenet.ts`: TFJS loader + inference
- `components/MealScanner.tsx`: Camera/upload UI
- `app/scan/page.tsx`: Scan page

Features:
- Upload image or use device camera
- Lazy-load MobileNet on first use
- Preprocess: resize to 224x224, normalize
- Return top 3 predictions with confidence scores

Dependencies:
```json
{
  "@tensorflow/tfjs": "^4.x",
  "@tensorflow-models/mobilenet": "^2.x"
}
```

### Phase 4: ML → USDA Pipeline
**Milestone**: Photo → suggestions → add entry

Integration:
- For each MobileNet label, auto-search USDA
- Display suggestions sorted by confidence × USDA relevance
- User selects best match(es)
- Confirm serving size
- Add to diary

Flow:
```
Photo → MobileNet (top 3) →
  Label 1 → USDA search → top 2 results
  Label 2 → USDA search → top 2 results
  Label 3 → USDA search → top 2 results
→ Display 6 suggestions → User picks → Confirm → Save
```

## File Structure

```
my-fitness-pal/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (dashboard)
│   ├── add/page.tsx (search)
│   ├── scan/page.tsx (ML scan)
│   ├── diary/page.tsx (history)
│   ├── goals/page.tsx (settings)
│   └── api/usda/route.ts (proxy)
├── components/
│   ├── DashboardSummary.tsx
│   ├── GoalsForm.tsx
│   ├── FoodSearchBar.tsx
│   ├── FoodResults.tsx
│   ├── FoodEntryForm.tsx
│   ├── DiaryList.tsx
│   ├── MealScanner.tsx
│   └── SuggestionsList.tsx
├── lib/
│   ├── data/
│   │   ├── models.ts
│   │   └── storage.ts
│   ├── api/
│   │   └── usda.ts
│   ├── ml/
│   │   └── mobilenet.ts
│   └── hooks/
│       ├── useLocalStorage.ts
│       └── useDailyTotal.ts
├── .env.local (USDA_API_KEY)
├── package.json
└── tsconfig.json (strict: true)
```

## Critical Decisions

✓ **TypeScript strict**: Type safety for data models
✓ **App Router**: Modern Next.js, RSC support
✓ **Tailwind CSS**: Fast prototyping
✓ **Daily goals**: Track remaining calories/macros
✓ **LocalStorage first**: Simple MVP, <10MB sufficient
✓ **USDA Foundation dataset**: More reliable than Survey
✓ **Top 3 ML labels**: User picks best match
✓ **Local timezone**: Simpler date handling
✓ **In-place edit**: Better UX than delete+re-add
✓ **Camera + upload**: Both sources for flexibility

## MVP Scope (Excluded for Now)

- Open Food Facts barcode scanning
- Multi-user/auth
- Backend database
- PWA/service worker
- Export data
- Meal categories (breakfast/lunch/dinner)
- Food favorites
- Recipe builder
- Weight tracking

## Verification Plan

After each phase:

**Phase 1:**
1. Set daily goals (2000 cal, 150g protein, 200g carbs, 65g fat)
2. Add manual entry: "Chicken breast, 200g, 330 cal, 62g protein, 0g carbs, 7g fat"
3. Verify dashboard shows totals + remaining
4. Edit serving to 150g, verify recalculation
5. Delete entry, verify totals reset
6. Refresh page, verify data persists

**Phase 2:**
1. Search "banana"
2. Select "Banana, raw"
3. Choose serving size (1x = 100g)
4. Add to diary
5. Verify nutrition auto-populated correctly

**Phase 3:**
1. Upload pizza.jpg
2. Verify MobileNet loads (~5sec first time)
3. See predictions: "pizza, cheese, dough" with confidence scores
4. Verify no errors in console

**Phase 4:**
1. Upload burger.jpg
2. See suggestions from USDA for "hamburger, beef, bun"
3. Select "Hamburger, plain, fast food"
4. Confirm serving (1 item)
5. Verify added to diary with correct nutrition

## Open Questions (for later)

- IndexedDB migration threshold? (>1000 entries?)
- Mixed meal handling? (pizza with 5+ labels)
- Portion estimation? (small/medium/large vs grams)
- Sync across devices? (requires backend)
