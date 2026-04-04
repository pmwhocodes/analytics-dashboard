type Direction = "up" | "down";
type Status = "green" | "yellow" | "red";

interface Metric {
  label: string;
  value: string;
  change: string;
  direction: Direction;
  description: string;
  trend: number[];
  status: Status;
  statusReason: string;
}

const metrics: Metric[] = [
  {
    label: "Platform Adoption",
    value: "63%",
    change: "+5%",
    direction: "up",
    description: "Users logged into the platform at least once",
    trend: [40, 45, 48, 52, 55, 60, 63],
    status: "green",
    statusReason: "On track — strong week-over-week growth",
  },
  {
    label: "Migration Rate",
    value: "41%",
    change: "+8%",
    direction: "up",
    description: "Active legacy users migrated to the new platform this week",
    trend: [10, 16, 22, 28, 33, 38, 41],
    status: "yellow",
    statusReason: "Growing but below 50% midpoint target",
  },
  {
    label: "Feature Engagement",
    value: "54%",
    change: "+3%",
    direction: "up",
    description: "Platform users who interacted with a core feature",
    trend: [38, 42, 44, 46, 50, 52, 54],
    status: "yellow",
    statusReason: "Improving but nearly half of users still passive",
  },
  {
    label: "Attribution Coverage",
    value: "72%",
    change: "-2%",
    direction: "down",
    description: "Conversions with a known source (digital or physical)",
    trend: [78, 77, 75, 74, 74, 73, 72],
    status: "red",
    statusReason: "Declining — 28% of conversions have no known source",
  },
];

const statusConfig: Record<Status, { dot: string; text: string; label: string }> = {
  green: { dot: "bg-emerald-500", text: "text-emerald-700", label: "On Track" },
  yellow: { dot: "bg-amber-400", text: "text-amber-700", label: "Watch" },
  red: { dot: "bg-red-500", text: "text-red-600", label: "Needs Attention" },
};

const START_DATE = new Date("2026-02-01");

function getWeekLabel(weekIndex: number): string {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + weekIndex * 7);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const vbWidth = 200;
  const vbHeight = 40;
  const labelHeight = 16;
  const totalVbHeight = vbHeight + labelHeight;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * vbWidth;
      const y = vbHeight - ((v - min) / range) * (vbHeight - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  const tickIndices = [0, data.length - 1];

  return (
    <svg
      viewBox={`0 0 ${vbWidth} ${totalVbHeight}`}
      preserveAspectRatio="none"
      className="w-full overflow-visible"
      style={{ height: "56px" }}
    >
      {data.map((_, i) => {
        const x = (i / (data.length - 1)) * vbWidth;
        return (
          <g key={i}>
            <line x1={x} y1={vbHeight} x2={x} y2={vbHeight + 4} stroke="#d1d5db" strokeWidth="1" />
            {tickIndices.includes(i) && (
              <text
                x={x}
                y={totalVbHeight}
                textAnchor={i === 0 ? "start" : "end"}
                fontSize="9"
                fill="#9ca3af"
              >
                {getWeekLabel(i)}
              </text>
            )}
          </g>
        );
      })}
      <line x1={0} y1={vbHeight} x2={vbWidth} y2={vbHeight} stroke="#e5e7eb" strokeWidth="1" />
      <polyline
        points={points}
        fill="none"
        stroke="#111827"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InputMetrics() {
  return (
    <section className="mb-10">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Input Metrics — Conversion Drivers</p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => {
          const s = statusConfig[m.status];
          return (
            <div key={m.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-400">{m.label}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                  <span className={`text-xs font-medium ${s.text}`}>{s.label}</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{m.value}</p>
              <p className={`text-sm font-medium mt-1 ${m.direction === "up" ? "text-emerald-600" : "text-red-500"}`}>
                {m.direction === "up" ? "↑" : "↓"} {m.change} vs. last week
              </p>
              <div className="mt-3 w-full">
                <Sparkline data={m.trend} />
              </div>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">{m.statusReason}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
