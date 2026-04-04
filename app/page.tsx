import { NorthStar } from "@/components/NorthStar";
import { InputMetrics } from "@/components/InputMetrics";
import { HealthMetrics } from "@/components/HealthMetrics";
import { WeekHeader } from "@/components/WeekHeader";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 px-8 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <WeekHeader />
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm px-8 py-8 mb-6">
          <NorthStar />
        </div>
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm px-8 py-8 mb-6">
          <InputMetrics />
        </div>
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm px-8 py-8">
          <HealthMetrics />
        </div>
      </div>
    </main>
  );
}
