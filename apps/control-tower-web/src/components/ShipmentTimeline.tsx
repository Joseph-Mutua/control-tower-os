import type { ShipmentDetail } from "@cxtms/shared";

interface ShipmentTimelineProps {
  shipment: ShipmentDetail;
}

export function ShipmentTimeline({ shipment }: ShipmentTimelineProps) {
  return (
    <section className="panel span-2">
      <div className="panel-head">
        <p>Shipment Detail Timeline</p>
        <h2>{shipment.reference} milestone path and event flow.</h2>
      </div>
      <div className="timeline-grid">
        {shipment.milestones.map((milestone) => (
          <article key={milestone.code} className={`timeline-card ${milestone.status}`}>
            <span className="timeline-dot" />
            <div>
              <strong>{milestone.label}</strong>
              <small>{milestone.location}</small>
            </div>
            <div>
              <strong>{new Date(milestone.plannedAt).toLocaleString()}</strong>
              <small>{milestone.actualAt ? `Actual ${new Date(milestone.actualAt).toLocaleString()}` : milestone.status}</small>
            </div>
          </article>
        ))}
      </div>
      <div className="event-feed">
        {shipment.events.map((event) => (
          <article key={event.id} className="event-card">
            <strong>{event.description}</strong>
            <span>
              {event.source} · {event.location} · severity {event.severity}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
