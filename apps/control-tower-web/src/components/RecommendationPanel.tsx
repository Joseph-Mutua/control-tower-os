import type { ShipmentDetail } from "@cxtms/shared";

interface RecommendationPanelProps {
  shipment: ShipmentDetail;
}

export function RecommendationPanel({ shipment }: RecommendationPanelProps) {
  return (
    <section className="panel">
      <div className="panel-head">
        <p>Ops Command Center</p>
        <h2>Recommended next steps for {shipment.reference}.</h2>
      </div>
      <div className="recommendation-stack">
        {shipment.recommendations.map((recommendation) => (
          <article key={recommendation.id} className="recommendation-card">
            <div>
              <strong>{recommendation.title}</strong>
              <span>{recommendation.reason}</span>
            </div>
            <div className="recommendation-meta">
              <span>{Math.round(recommendation.confidence * 100)}% confidence</span>
              <span>{recommendation.automationEligible ? "workflow-ready" : "manual review"}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
