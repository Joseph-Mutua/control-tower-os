import { publicWorkflows } from "@cxtms/shared";
import type { IncomingMessage, ServerResponse } from "node:http";
import { notFound, readJson, sendJson } from "../lib/http.js";
import { buildDashboardSnapshot, buildExceptionCenter, buildPublicWorkflowCatalog, buildShipmentBoard, buildShipmentDetail } from "../services/controlTower.js";
import { getShipmentByReference, upsertShipmentEvent } from "../services/repository.js";

function matchPath(pathname: string, pattern: RegExp) {
  return pathname.match(pattern);
}

export async function routeRequest(request: IncomingMessage, response: ServerResponse) {
  const url = new URL(request.url ?? "/", "http://localhost");
  const { pathname } = url;

  if (request.method === "GET" && pathname === "/health") {
    sendJson(response, 200, {
      status: "ok",
      service: "cxtms-control-tower-api",
      workflows: publicWorkflows.length
    });
    return;
  }

  if (request.method === "GET" && pathname === "/api/dashboard") {
    sendJson(response, 200, buildDashboardSnapshot());
    return;
  }

  if (request.method === "GET" && pathname === "/api/shipments") {
    sendJson(response, 200, buildShipmentBoard());
    return;
  }

  const shipmentMatch = matchPath(pathname, /^\/api\/shipments\/([^/]+)$/);
  if (request.method === "GET" && shipmentMatch) {
    const shipment = buildShipmentDetail(shipmentMatch[1]);
    if (!shipment) {
      notFound(response, "Shipment not found");
      return;
    }
    sendJson(response, 200, shipment);
    return;
  }

  if (request.method === "GET" && pathname === "/api/exceptions") {
    sendJson(response, 200, buildExceptionCenter());
    return;
  }

  if (request.method === "GET" && pathname === "/api/public/workflows") {
    sendJson(response, 200, buildPublicWorkflowCatalog());
    return;
  }

  const partnerShipmentMatch = matchPath(pathname, /^\/public\/shipments\/([^/]+)$/);
  if (request.method === "GET" && partnerShipmentMatch) {
    const shipment = getShipmentByReference(partnerShipmentMatch[1]);
    if (!shipment) {
      notFound(response, "Partner shipment not found");
      return;
    }

    sendJson(response, 200, {
      reference: shipment.reference,
      customer: shipment.customer,
      partner: shipment.partner,
      eta: shipment.predictedEta,
      status: shipment.status,
      milestones: shipment.milestones,
      exceptions: shipment.exceptions,
      recommendations: shipment.recommendations.filter((recommendation) => recommendation.action === "notify_consignee")
    });
    return;
  }

  if (request.method === "POST" && pathname === "/api/events") {
    const payload = await readJson<{
      shipmentId: string;
      event: Parameters<typeof upsertShipmentEvent>[1];
    }>(request);

    if (!payload) {
      sendJson(response, 400, { error: "Missing payload" });
      return;
    }

    const shipment = upsertShipmentEvent(payload.shipmentId, payload.event);
    if (!shipment) {
      notFound(response, "Cannot append event to unknown shipment");
      return;
    }

    sendJson(response, 202, {
      accepted: true,
      shipmentId: shipment.id,
      eventCount: shipment.events.length
    });
    return;
  }

  notFound(response);
}
