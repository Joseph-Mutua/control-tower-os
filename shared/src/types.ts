export type ShipmentMode = "ocean" | "air" | "trucking" | "parcel";

export type ShipmentStatus =
  | "planned"
  | "in_transit"
  | "at_risk"
  | "delayed"
  | "exception"
  | "delivered";

export type MilestoneStatus = "planned" | "completed" | "late" | "predicted";

export type EventSource =
  | "project44"
  | "samsara"
  | "inttra"
  | "cargosmart"
  | "ups"
  | "dhl"
  | "fedex"
  | "aes"
  | "manual";

export type ExceptionCode =
  | "customs_hold"
  | "missed_connection"
  | "late_pickup"
  | "detention_risk"
  | "failed_delivery"
  | "driver_inactivity"
  | "weather_disruption";

export type RecommendationAction =
  | "reroute"
  | "notify_consignee"
  | "rebook_carrier"
  | "escalate_customs_hold"
  | "dispatch_backup_driver"
  | "request_missing_documents";

export type UserRole =
  | "ops_admin"
  | "ops_analyst"
  | "customer"
  | "partner"
  | "finance";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Milestone {
  code: string;
  label: string;
  plannedAt: string;
  actualAt?: string;
  location: string;
  status: MilestoneStatus;
}

export interface ShipmentEvent {
  id: string;
  shipmentId: string;
  mode: ShipmentMode;
  source: EventSource;
  code: string;
  description: string;
  occurredAt: string;
  location: string;
  coordinates?: Coordinates;
  severity: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface ExceptionAlert {
  id: string;
  shipmentId: string;
  code: ExceptionCode;
  title: string;
  summary: string;
  severity: number;
  owner: string;
  detectedAt: string;
  status: "open" | "monitoring" | "mitigated";
}

export interface Recommendation {
  id: string;
  shipmentId: string;
  action: RecommendationAction;
  title: string;
  reason: string;
  confidence: number;
  automationEligible: boolean;
}

export interface ProfitabilitySnapshot {
  revenueUsd: number;
  costUsd: number;
  marginUsd: number;
  marginPct: number;
}

export interface Shipment {
  id: string;
  reference: string;
  mode: ShipmentMode;
  customer: string;
  partner: string;
  origin: string;
  destination: string;
  carrier: string;
  lane: string;
  routeName: string;
  status: ShipmentStatus;
  eta: string;
  predictedEta: string;
  delayHours: number;
  riskScore: number;
  slaState: "healthy" | "watch" | "breach";
  profitability: ProfitabilitySnapshot;
  mapPosition: Coordinates;
  milestones: Milestone[];
}

export interface ShipmentDetail extends Shipment {
  events: ShipmentEvent[];
  exceptions: ExceptionAlert[];
  recommendations: Recommendation[];
  attachments: Array<{
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
  }>;
}

export interface HeatmapBucket {
  key: string;
  label: string;
  riskScore: number;
  impactedShipments: number;
  openExceptions: number;
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
  tone: "positive" | "neutral" | "warning" | "critical";
}

export interface SlaWidget {
  customer: string;
  activeShipments: number;
  slaBreaches: number;
  avgDelayHours: number;
  marginAtRiskUsd: number;
}

export interface RolePermission {
  role: UserRole;
  canViewFinancials: boolean;
  canTriggerWorkflows: boolean;
  canUploadDocuments: boolean;
  canViewPartnerPortal: boolean;
  canUseCopilot: boolean;
}

export interface PartnerPortalAction {
  id: string;
  label: string;
  description: string;
  permission: keyof RolePermission;
}

export interface PublicWorkflowDefinition {
  slug: string;
  method: "GET" | "POST";
  path: string;
  authMode: "oauth2" | "api_key";
  rateLimitPerMinute: number;
  summary: string;
}
