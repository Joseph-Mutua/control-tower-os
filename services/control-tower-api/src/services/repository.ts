import { shipments } from "@cxtms/shared";
import type { ShipmentDetail } from "@cxtms/shared";

export function listShipments() {
  return shipments;
}

export function listActiveShipments() {
  return shipments.filter((shipment) => shipment.status !== "delivered");
}

export function getShipmentById(id: string) {
  return shipments.find((shipment) => shipment.id === id);
}

export function getShipmentByReference(reference: string) {
  return shipments.find((shipment) => shipment.reference === reference);
}

export function upsertShipmentEvent(
  shipmentId: string,
  event: ShipmentDetail["events"][number],
) {
  const shipment = getShipmentById(shipmentId);

  if (!shipment) {
    return undefined;
  }

  shipment.events = [event, ...shipment.events];
  return shipment;
}
