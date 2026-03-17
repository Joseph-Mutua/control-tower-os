import { dashboardMetrics, heatmap, publicWorkflows, shipments, slaWidgets } from "@cxtms/shared";
import { normalizeShipmentEvents } from "./normalization.js";
import { predictAll, predictShipment } from "./predictions.js";
import { buildActionQueue, evaluateShipmentRules } from "./rules.js";

export function buildDashboardSnapshot() {
  const activeShipments = shipments.filter((shipment) => shipment.status !== "delivered");
  const openExceptions = activeShipments.flatMap((shipment) => shipment.exceptions);

  return {
    metrics: dashboardMetrics,
    counts: {
      activeShipments: activeShipments.length,
      openExceptions: openExceptions.length,
      automationCandidates: activeShipments.filter((shipment) =>
        shipment.recommendations.some((recommendation) => recommendation.automationEligible),
      ).length
    },
    predictions: predictAll(activeShipments),
    actionQueue: buildActionQueue(activeShipments),
    heatmap,
    slaWidgets
  };
}

export function buildShipmentBoard() {
  return shipments.map((shipment) => ({
    ...shipment,
    normalizedEvents: normalizeShipmentEvents(shipment),
    prediction: predictShipment(shipment),
    rules: evaluateShipmentRules(shipment)
  }));
}

export function buildShipmentDetail(id: string) {
  const shipment = shipments.find((candidate) => candidate.id === id);

  if (!shipment) {
    return undefined;
  }

  return {
    ...shipment,
    normalizedEvents: normalizeShipmentEvents(shipment),
    prediction: predictShipment(shipment),
    rules: evaluateShipmentRules(shipment)
  };
}

export function buildExceptionCenter() {
  return shipments.flatMap((shipment) =>
    shipment.exceptions.map((exception) => ({
      ...exception,
      reference: shipment.reference,
      customer: shipment.customer,
      mode: shipment.mode,
      lane: shipment.lane,
      recommendations: shipment.recommendations
    })),
  );
}

export function buildPublicWorkflowCatalog() {
  return publicWorkflows;
}
