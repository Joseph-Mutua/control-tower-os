import type { ShipmentDetail } from "@cxtms/shared";

export interface PredictionResult {
  shipmentId: string;
  predictedEta: string;
  etaConfidence: number;
  delayProbability: number;
  exceptionProbability: number;
}

function hoursBetween(startIso: string, endIso: string) {
  return (new Date(endIso).getTime() - new Date(startIso).getTime()) / 3_600_000;
}

export function predictShipment(shipment: ShipmentDetail): PredictionResult {
  const eventSignal = shipment.events.reduce((accumulator, event) => accumulator + event.severity, 0);
  const exceptionSignal = shipment.exceptions.reduce(
    (accumulator, exception) => accumulator + exception.severity,
    0,
  );
  const milestonePenalty = shipment.milestones.filter((milestone) => milestone.status === "late").length * 9;
  const baseRisk = shipment.riskScore + milestonePenalty + eventSignal * 0.05 + exceptionSignal * 0.08;
  const delayHours = Math.max(0, hoursBetween(shipment.eta, shipment.predictedEta));
  const delayProbability = Math.min(0.98, Number(((baseRisk + delayHours * 6) / 120).toFixed(2)));
  const exceptionProbability = Math.min(
    0.99,
    Number(((shipment.exceptions.length * 0.21 + shipment.events.length * 0.08 + shipment.riskScore / 150)).toFixed(2)),
  );
  const etaConfidence = Math.max(0.42, Number((1 - delayProbability * 0.45).toFixed(2)));

  return {
    shipmentId: shipment.id,
    predictedEta: shipment.predictedEta,
    etaConfidence,
    delayProbability,
    exceptionProbability
  };
}

export function predictAll(shipments: ShipmentDetail[]) {
  return shipments.map(predictShipment);
}
