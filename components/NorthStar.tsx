const data = {
  value: "18.4%",
  label: "Platform Conversion Rate",
  description: "% of active platform users who completed a sample order or project",
  change: "+2.1%",
  direction: "up" as const,
  target: "20%",
  targetLabel: "Launch target",
};

export function NorthStar() {
  return (
    <section className="mb-10">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Key Metric — Conversion Rate</p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-7">
        <div className="grid grid-cols-2 gap-8 items-center">
          {/* Left — big number */}
          <div>
            <p className="text-xs text-gray-400 mb-1">{data.label}</p>
            <p className="text-7xl font-bold text-gray-900 tracking-tight">{data.value}</p>
            <p className="text-xs text-gray-400 mt-3 whitespace-nowrap">{data.description}</p>
          </div>

          {/* Right — target + progress + vs. last week */}
          <div className="border-l border-gray-100 pl-8 space-y-5">
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-xs text-gray-400">vs. last week</p>
                <p className={`text-2xl font-semibold ${data.direction === "up" ? "text-emerald-600" : "text-red-500"}`}>
                  {data.direction === "up" ? "↑" : "↓"} {data.change}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-900">{data.targetLabel}</p>
                <p className="text-2xl font-semibold text-gray-400">{data.target}</p>
              </div>
            </div>
            <div>
              <div className="bg-gray-100 rounded-full h-2">
                <div className="bg-gray-900 h-2 rounded-full" style={{ width: "92%" }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <p className="text-xs text-gray-400">0%</p>
                <p className="text-xs text-gray-500 font-medium">92% to target</p>
                <p className="text-xs text-gray-400">{data.target}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
