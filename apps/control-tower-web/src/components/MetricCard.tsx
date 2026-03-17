import type { DashboardMetric } from "@cxtms/shared";

export function MetricCard({ label, value, delta, tone }: DashboardMetric) {
  return (
    <article className={`metric-card ${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{delta}</span>
    </article>
  );
}
