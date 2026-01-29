import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity, Camera, Search, ShieldCheck, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/70 bg-card/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-foreground shadow-sm">
              M
            </span>
            MyFitnessPal
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth/signin" className="inline-flex">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/signup" className="inline-flex">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl border bg-card/85 p-8 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
                <Sparkles className="size-4" />
                Make progress feel simple
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Build better habits, one meal at a time.
              </h1>
              <p className="max-w-xl text-base text-muted-foreground">
                Track calories and macros with a clean, calm dashboard that helps you stay
                consistent without the overwhelm.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/auth/signup" className="inline-flex">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Create your account
                  </Button>
                </Link>
                <Link href="/auth/signin" className="inline-flex">
                  <Button variant="outline">I already have an account</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border bg-muted/30 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent/60 text-foreground">
                    <Activity className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Today&apos;s Snapshot</p>
                    <p className="text-xs text-muted-foreground">A quick look at your day.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border bg-card/90 p-4">
                    <div className="text-xs text-muted-foreground">Calories</div>
                    <div className="text-2xl font-semibold">1,420 / 2,000</div>
                    <div className="mt-2 h-2 rounded-full bg-muted/70">
                      <div className="h-2 w-[71%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-2xl border bg-card/90 p-3 text-sm">
                      <div className="text-xs text-muted-foreground">Protein</div>
                      <div className="font-semibold">78g</div>
                    </div>
                    <div className="flex-1 rounded-2xl border bg-card/90 p-3 text-sm">
                      <div className="text-xs text-muted-foreground">Carbs</div>
                      <div className="font-semibold">165g</div>
                    </div>
                    <div className="flex-1 rounded-2xl border bg-card/90 p-3 text-sm">
                      <div className="text-xs text-muted-foreground">Fat</div>
                      <div className="font-semibold">52g</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-card/85 p-6 shadow-sm">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-full bg-accent/60 text-foreground">
              <Sparkles className="size-5" />
            </div>
            <h2 className="text-lg font-semibold">Clear daily focus</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              See what matters today with clean progress and calm visuals.
            </p>
          </div>
          <div className="rounded-3xl border bg-card/85 p-6 shadow-sm">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-full bg-accent/60 text-foreground">
              <Activity className="size-5" />
            </div>
            <h2 className="text-lg font-semibold">Easy logging</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add meals quickly and keep your momentum going.
            </p>
          </div>
          <div className="rounded-3xl border bg-card/85 p-6 shadow-sm">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-full bg-accent/60 text-foreground">
              <ShieldCheck className="size-5" />
            </div>
            <h2 className="text-lg font-semibold">Privacy first</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your data stays yours, always.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border bg-card/85 p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
            <Sparkles className="size-4" />
            Smart logging
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Auto-detect calories fast</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Two easy paths to log food. Both check calories, carbs, protein, and fat.
          </p>

          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border bg-muted/30 p-6">
              <h3 className="text-lg font-semibold">Type the food name</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get instant nutrition for calories, carbs, protein, and fat.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Search className="size-4" />
                Search by name
              </div>
              <div className="mt-5 space-y-4 text-sm">
                <div className="rounded-2xl border bg-card/90 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-900">
                      1
                    </span>
                    Type
                  </div>
                  <div className="mt-2 flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                    <Search className="size-4" />
                    <span>Grilled chicken breast</span>
                  </div>
                </div>
                <div className="rounded-2xl border bg-card/90 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-900">
                      2
                    </span>
                    Match
                  </div>
                  <div className="mt-2 space-y-2 text-xs">
                    <div className="rounded-xl bg-muted/50 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Chicken breast, grilled</span>
                        <span className="text-muted-foreground">100g</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          190 cal
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          0g carbs
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          31g protein
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          4g fat
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-muted/50 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Chicken breast, roasted</span>
                        <span className="text-muted-foreground">100g</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          165 cal
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          0g carbs
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          29g protein
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          3g fat
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border bg-card/90 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-900">
                      3
                    </span>
                    Confirm
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-200 px-2 py-1 text-[11px] font-semibold text-amber-950">
                      1 serving
                    </span>
                    <span className="rounded-full bg-amber-200 px-2 py-1 text-[11px] font-semibold text-amber-950">
                      Add
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border bg-muted/30 p-6">
              <h3 className="text-lg font-semibold">Upload a photo</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Snap a meal and we detect calories, carbs, protein, and fat.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Camera className="size-4" />
                Photo scan
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-xs text-muted-foreground">
                <span>Drop photo here</span>
                <span className="rounded-full bg-accent/60 px-2 py-1 text-[11px] font-semibold text-foreground">
                  Upload
                </span>
              </div>
              <div className="mt-5 space-y-4 text-sm">
                <div className="rounded-2xl border bg-card/90 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-900">
                      1
                    </span>
                    Capture
                  </div>
                  <div className="mt-2 flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                    <Camera className="size-4" />
                    <span>Snap or upload meal photo</span>
                  </div>
                </div>
                <div className="rounded-2xl border bg-card/90 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-900">
                      2
                    </span>
                    Analyze
                  </div>
                  <div className="mt-2 flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                    <Activity className="size-4" />
                    <span>We find the closest matches</span>
                  </div>
                </div>
                <div className="rounded-2xl border bg-card/90 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-900">
                      3
                    </span>
                    Choose
                  </div>
                  <div className="mt-2 space-y-2 text-xs">
                    <div className="rounded-xl bg-muted/50 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Garden salad</span>
                        <span className="text-muted-foreground">1 bowl</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          320 cal
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          32g carbs
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          18g protein
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          14g fat
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-muted/50 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Chicken salad</span>
                        <span className="text-muted-foreground">1 bowl</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          410 cal
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          24g carbs
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          32g protein
                        </span>
                        <span className="rounded-full bg-amber-200 px-2 py-1 font-semibold text-amber-950">
                          18g fat
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border bg-card/90 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-900">
                      4
                    </span>
                    Track
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-200 px-2 py-1 text-[11px] font-semibold text-amber-950">
                      1 serving
                    </span>
                    <span className="rounded-full bg-amber-200 px-2 py-1 text-[11px] font-semibold text-amber-950">
                      Add
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/auth/signup" className="inline-flex">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start tracking free
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
