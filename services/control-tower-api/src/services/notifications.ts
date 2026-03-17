import { appendAuditEntry } from "./audit.js";

export interface NotificationMessage {
  id: string;
  channel: "slack" | "teams" | "email";
  audience: string;
  subject: string;
  body: string;
}

export function buildNotifications(shipmentReference: string, actionTitle: string): NotificationMessage[] {
  return [
    {
      id: `${shipmentReference}-slack`,
      channel: "slack",
      audience: "#ops-control-tower",
      subject: `${shipmentReference} action ready`,
      body: `${actionTitle} has been queued by the control tower.`
    },
    {
      id: `${shipmentReference}-teams`,
      channel: "teams",
      audience: "Operations Command Center",
      subject: `${shipmentReference} workflow update`,
      body: `${actionTitle} has been escalated to the owning operations pod.`
    },
    {
      id: `${shipmentReference}-email`,
      channel: "email",
      audience: "customer-success@cxtms.demo",
      subject: `${shipmentReference} ETA update`,
      body: `The shipment has a new mitigation path: ${actionTitle}.`
    }
  ];
}

export function dispatchNotifications(shipmentId: string, shipmentReference: string, actionTitle: string) {
  const notifications = buildNotifications(shipmentReference, actionTitle);

  notifications.forEach((notification) => {
    appendAuditEntry({
      shipmentId,
      actor: "notification-broker",
      action: "notification_dispatched",
      channel: notification.channel,
      detail: `${notification.subject} -> ${notification.audience}`
    });
  });

  return notifications;
}
