import type { Recommendation, ShipmentDetail } from "@cxtms/shared";
import { predictShipment } from "./predictions.js";

export interface RuleOutcome {
  shipmentId: string;
  automationRecommended: boolean;
  triggers: string[];
  recommendations: Recommendation[];
}

export function evaluateShipmentRules(shipment: ShipmentDetail): RuleOutcome {
  const prediction = predictShipment(shipment);
  const triggers: string[] = [];

  if (prediction.delayProbability >= 0.65) {
    triggers.push("delay_probability_high");
  }

  if (prediction.exceptionProbability >= 0.45) {
    triggers.push("exception_probability_high");
  }

  if (shipment.slaState === "breach") {
    triggers.push("sla_breach_risk");
  }

  return {
    shipmentId: shipment.id,
    automationRecommended: shipment.recommendations.some((recommendation) => recommendation.automationEligible),
    triggers,
    recommendations: shipment.recommendations
  };
}

export function buildActionQueue(shipments: ShipmentDetail[]) {
  return shipments
    .map(evaluateShipmentRules)
    .filter((outcome) => outcome.triggers.length > 0)
    .sort((left, right) => right.recommendations.length - left.recommendations.length);
}
