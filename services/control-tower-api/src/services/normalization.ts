import type { ShipmentDetail, ShipmentEvent } from "@cxtms/shared";

export interface NormalizedEvent {
  id: string;
  shipmentId: string;
  code: string;
  source: string;
  occurredAt: string;
  severity: number;
  summary: string;
}

export function normalizeEvent(event: ShipmentEvent): NormalizedEvent {
  return {
    id: event.id,
    shipmentId: event.shipmentId,
    code: event.code.toLowerCase(),
    source: event.source,
    occurredAt: event.occurredAt,
    severity: Math.max(0, Math.min(100, event.severity)),
    summary: `${event.source.toUpperCase()}: ${event.description}`
  };
}

export function normalizeShipmentEvents(shipment: ShipmentDetail) {
  return shipment.events.map(normalizeEvent);
}
