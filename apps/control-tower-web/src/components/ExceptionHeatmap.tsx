import type { HeatmapBucket } from "@cxtms/shared";

interface ExceptionHeatmapProps {
  buckets: HeatmapBucket[];
}

export function ExceptionHeatmap({ buckets }: ExceptionHeatmapProps) {
  return (
    <section className="panel">
      <div className="panel-head">
        <p>Exception Center</p>
        <h2>Risk concentration by carrier, lane, route, or customer.</h2>
      </div>
      <div className="heatmap-stack">
        {buckets.map((bucket) => (
          <article key={bucket.key} className="heatmap-card">
            <div className="heatmap-copy">
              <strong>{bucket.label}</strong>
              <span>
                {bucket.impactedShipments} impacted shipments, {bucket.openExceptions} open exceptions
              </span>
            </div>
            <div className="heatmap-bar-track">
              <div className="heatmap-bar-fill" style={{ width: `${bucket.riskScore}%` }} />
            </div>
            <strong className="heatmap-score">{bucket.riskScore}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
