export type ShipmentMode = "ocean" | "air" | "trucking" | "parcel";

export type ShipmentStatus =
  | "in_transit"
  | "at_risk"
  | "delayed"
  | "exception"
  | "delivered";

export interface Milestone {
  code: string;
  label: string;
  plannedAt: string;
  actualAt?: string;
  location: string;
  status: "planned" | "completed" | "late" | "predicted";
}

export interface Shipment {
  id: string;
  reference: string;
  mode: ShipmentMode;
  customer: string;
  origin: string;
  destination: string;
  carrier: string;
  status: ShipmentStatus;
  eta: string;
  riskScore: number;
  slaState: "healthy" | "watch" | "breach";
  marginUsd: number;
  milestones: Milestone[];
}
