export function WeekHeader() {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Platform Analytics Dashboard</p>
      <h1 className="text-2xl font-semibold text-gray-900">
        Leadership Weekly Review: <span className="text-gray-500 font-normal">Week of {fmt(weekStart)} – {fmt(weekEnd)}</span>
      </h1>
      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-3 inline-block">
        ⚠ This dashboard uses placeholder data for illustrative purposes only.
      </p>
      <div className="mt-4 border-b border-gray-200" />
    </div>
  );
}
