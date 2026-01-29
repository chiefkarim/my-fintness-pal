import { GoalsForm } from '@/components/GoalsForm';

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your nutrition goals</p>
        </div>

        <GoalsForm />

        <div className="mt-8">
          <a href="/dashboard" className="text-primary hover:underline">
            ← Back to dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
