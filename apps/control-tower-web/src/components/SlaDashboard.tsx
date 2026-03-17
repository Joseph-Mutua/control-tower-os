import type { SlaWidget } from "@cxtms/shared";

interface SlaDashboardProps {
  widgets: SlaWidget[];
}

export function SlaDashboard({ widgets }: SlaDashboardProps) {
  return (
    <section className="panel">
      <div className="panel-head">
        <p>SLA + Profitability</p>
        <h2>Customer health and margin exposure in one place.</h2>
      </div>
      <div className="sla-grid">
        {widgets.map((widget) => (
          <article key={widget.customer} className="sla-card">
            <strong>{widget.customer}</strong>
            <span>{widget.activeShipments} active shipments</span>
            <span>{widget.slaBreaches} SLA breaches</span>
            <span>{widget.avgDelayHours}h average delay</span>
            <span>${widget.marginAtRiskUsd.toLocaleString()} margin at risk</span>
          </article>
        ))}
      </div>
    </section>
  );
}
