type Status = "green" | "yellow" | "red";

interface HealthMetric {
  label: string;
  value: string;
  status: Status;
  description: string;
}

const metrics: HealthMetric[] = [
  {
    label: "Platform Uptime",
    value: "99.8%",
    status: "green",
    description: "Platform availability this week",
  },
  {
    label: "Search Success Rate",
    value: "84%",
    status: "yellow",
    description: "Searches that returned a result click",
  },
  {
    label: "Data Pipeline Health",
    value: "97%",
    status: "green",
    description: "Instrumentation events received without error",
  },
];

const statusConfig: Record<Status, { dot: string; bg: string; text: string; label: string }> = {
  green: { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", label: "Healthy" },
  yellow: { dot: "bg-amber-400", bg: "bg-amber-50", text: "text-amber-700", label: "Watch" },
  red: { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700", label: "Alert" },
};

export function HealthMetrics() {
  return (
    <section>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Platform Health</p>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m) => {
          const s = statusConfig[m.status];
          return (
            <div key={m.label} className={`rounded-2xl border border-gray-100 shadow-sm px-6 py-5 ${s.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                <p className={`text-xs font-medium uppercase tracking-wide ${s.text}`}>{s.label}</p>
              </div>
              <p className="text-xs text-gray-500 mb-1">{m.label}</p>
              <p className="text-3xl font-bold text-gray-900">{m.value}</p>
              <p className="text-xs text-gray-400 mt-2">{m.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
