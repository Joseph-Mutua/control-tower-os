import { shipments } from "@cxtms/shared";

export interface AuditEntry {
  id: string;
  shipmentId?: string;
  actor: string;
  action: string;
  channel: "workflow" | "slack" | "teams" | "email" | "portal";
  detail: string;
  occurredAt: string;
}

const auditLog: AuditEntry[] = [
  {
    id: "aud-1001",
    shipmentId: "shp-1001",
    actor: "rules-engine",
    action: "prediction_recomputed",
    channel: "workflow",
    detail: "Delay probability breached the automation threshold after customs review.",
    occurredAt: "2026-03-17T07:15:00Z"
  }
];

export function listAuditEntries() {
  return auditLog;
}

export function appendAuditEntry(entry: Omit<AuditEntry, "id" | "occurredAt">) {
  const auditEntry: AuditEntry = {
    id: `aud-${auditLog.length + 1002}`,
    occurredAt: new Date().toISOString(),
    ...entry
  };

  auditLog.unshift(auditEntry);
  return auditEntry;
}

export function recordAutomatedRecommendation(shipmentId: string, recommendationTitle: string) {
  const shipment = shipments.find((candidate) => candidate.id === shipmentId);

  if (!shipment) {
    return undefined;
  }

  return appendAuditEntry({
    shipmentId,
    actor: "orchestration-engine",
    action: "automated_recommendation_executed",
    channel: "workflow",
    detail: `${recommendationTitle} triggered for ${shipment.reference}.`
  });
}
