import type {
  DashboardMetric,
  ExceptionAlert,
  HeatmapBucket,
  PartnerPortalAction,
  PublicWorkflowDefinition,
  RolePermission,
  ShipmentDetail,
  SlaWidget
} from "./types";

export const rolePermissions: RolePermission[] = [
  {
    role: "ops_admin",
    canViewFinancials: true,
    canTriggerWorkflows: true,
    canUploadDocuments: true,
    canViewPartnerPortal: true,
    canUseCopilot: true
  },
  {
    role: "ops_analyst",
    canViewFinancials: false,
    canTriggerWorkflows: true,
    canUploadDocuments: true,
    canViewPartnerPortal: true,
    canUseCopilot: true
  },
  {
    role: "customer",
    canViewFinancials: false,
    canTriggerWorkflows: false,
    canUploadDocuments: true,
    canViewPartnerPortal: true,
    canUseCopilot: false
  },
  {
    role: "partner",
    canViewFinancials: false,
    canTriggerWorkflows: false,
    canUploadDocuments: true,
    canViewPartnerPortal: true,
    canUseCopilot: false
  },
  {
    role: "finance",
    canViewFinancials: true,
    canTriggerWorkflows: false,
    canUploadDocuments: false,
    canViewPartnerPortal: false,
    canUseCopilot: false
  }
];

export const portalActions: PartnerPortalAction[] = [
  {
    id: "request-update",
    label: "Request Update",
    description: "Ask the operations desk for a manual shipment review.",
    permission: "canViewPartnerPortal"
  },
  {
    id: "report-issue",
    label: "Report Issue",
    description: "Raise a delivery issue or customs blocker directly from the portal.",
    permission: "canViewPartnerPortal"
  },
  {
    id: "upload-document",
    label: "Upload Document",
    description: "Provide the invoice, packing list, or customs paperwork needed to unblock the load.",
    permission: "canUploadDocuments"
  }
];

export const publicWorkflows: PublicWorkflowDefinition[] = [
  {
    slug: "partner-track-shipment",
    method: "GET",
    path: "/public/shipments/:reference",
    authMode: "oauth2",
    rateLimitPerMinute: 60,
    summary: "Partner-facing tracking endpoint with milestones, ETA, and open exceptions."
  },
  {
    slug: "partner-report-issue",
    method: "POST",
    path: "/public/issues",
    authMode: "oauth2",
    rateLimitPerMinute: 20,
    summary: "Workflow-backed endpoint for issue reporting, triage, and audit logging."
  }
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Shipments At Risk",
    value: "28",
    delta: "+6 in 24h",
    tone: "critical"
  },
  {
    label: "Predicted On-Time",
    value: "91.4%",
    delta: "+2.1% vs last week",
    tone: "positive"
  },
  {
    label: "Margin At Risk",
    value: "$182k",
    delta: "$31k recovered",
    tone: "warning"
  },
  {
    label: "Automation Coverage",
    value: "67%",
    delta: "+11 workflows",
    tone: "neutral"
  }
];

export const heatmap: HeatmapBucket[] = [
  {
    key: "carrier-cxma",
    label: "CargoSmart / TPAC-1",
    riskScore: 84,
    impactedShipments: 6,
    openExceptions: 4
  },
  {
    key: "lane-uske-nlrtm",
    label: "Ningbo -> Rotterdam",
    riskScore: 78,
    impactedShipments: 8,
    openExceptions: 5
  },
  {
    key: "route-atl-last-mile",
    label: "Atlanta Last Mile East",
    riskScore: 66,
    impactedShipments: 13,
    openExceptions: 3
  },
  {
    key: "customer-apex-retail",
    label: "Apex Retail",
    riskScore: 58,
    impactedShipments: 9,
    openExceptions: 2
  }
];

export const slaWidgets: SlaWidget[] = [
  {
    customer: "Apex Retail",
    activeShipments: 24,
    slaBreaches: 2,
    avgDelayHours: 7.4,
    marginAtRiskUsd: 48000
  },
  {
    customer: "Nova Industrial",
    activeShipments: 17,
    slaBreaches: 1,
    avgDelayHours: 4.2,
    marginAtRiskUsd: 27500
  },
  {
    customer: "BlueTrail Pharma",
    activeShipments: 11,
    slaBreaches: 3,
    avgDelayHours: 9.8,
    marginAtRiskUsd: 63200
  }
];

export const shipments: ShipmentDetail[] = [
  {
    id: "shp-1001",
    reference: "OCN-447219",
    mode: "ocean",
    customer: "Apex Retail",
    partner: "HarborBridge Forwarding",
    origin: "Ningbo, CN",
    destination: "Rotterdam, NL",
    carrier: "Oceanic Alliance",
    lane: "CN-NL",
    routeName: "TPAC-1",
    status: "at_risk",
    eta: "2026-03-23T12:00:00Z",
    predictedEta: "2026-03-24T20:00:00Z",
    delayHours: 32,
    riskScore: 86,
    slaState: "watch",
    profitability: {
      revenueUsd: 18200,
      costUsd: 13940,
      marginUsd: 4260,
      marginPct: 23.4
    },
    mapPosition: {
      lat: 29.8683,
      lng: 122.1069
    },
    milestones: [
      {
        code: "booking_confirmed",
        label: "Booking Confirmed",
        plannedAt: "2026-03-08T09:00:00Z",
        actualAt: "2026-03-08T09:12:00Z",
        location: "Ningbo",
        status: "completed"
      },
      {
        code: "port_departure",
        label: "Port Departure",
        plannedAt: "2026-03-10T14:00:00Z",
        actualAt: "2026-03-10T17:50:00Z",
        location: "Ningbo",
        status: "completed"
      },
      {
        code: "canal_window",
        label: "Suez Canal Window",
        plannedAt: "2026-03-18T06:00:00Z",
        location: "Suez",
        status: "late"
      },
      {
        code: "final_arrival",
        label: "Final Port Arrival",
        plannedAt: "2026-03-23T12:00:00Z",
        location: "Rotterdam",
        status: "predicted"
      }
    ],
    events: [
      {
        id: "evt-1001",
        shipmentId: "shp-1001",
        mode: "ocean",
        source: "cargosmart",
        code: "VESSEL_DELAY",
        description: "Feeder congestion is impacting canal slot timing.",
        occurredAt: "2026-03-17T05:24:00Z",
        location: "Red Sea",
        severity: 82,
        metadata: {
          voyage: "TPAC-1",
          delayHours: 18
        }
      },
      {
        id: "evt-1002",
        shipmentId: "shp-1001",
        mode: "ocean",
        source: "aes",
        code: "DOC_REVIEW",
        description: "Export filing flagged for manual customs review.",
        occurredAt: "2026-03-17T07:10:00Z",
        location: "Ningbo",
        severity: 65
      }
    ],
    exceptions: [
      {
        id: "exc-1001",
        shipmentId: "shp-1001",
        code: "customs_hold",
        title: "Customs review pending",
        summary: "AES flagged the filing and requires supplemental documentation.",
        severity: 76,
        owner: "Trade Compliance",
        detectedAt: "2026-03-17T07:12:00Z",
        status: "open"
      }
    ],
    recommendations: [
      {
        id: "rec-1001",
        shipmentId: "shp-1001",
        action: "escalate_customs_hold",
        title: "Escalate customs review",
        reason: "Open customs blocker and 32-hour predicted delay put the SLA at risk.",
        confidence: 0.91,
        automationEligible: true
      },
      {
        id: "rec-1002",
        shipmentId: "shp-1001",
        action: "notify_consignee",
        title: "Notify consignee of revised ETA",
        reason: "The consignee will miss the original receiving window.",
        confidence: 0.88,
        automationEligible: true
      }
    ],
    attachments: [
      {
        id: "att-1001",
        name: "commercial-invoice.pdf",
        type: "invoice",
        uploadedAt: "2026-03-17T07:16:00Z"
      }
    ]
  },
  {
    id: "shp-1002",
    reference: "AIR-803911",
    mode: "air",
    customer: "BlueTrail Pharma",
    partner: "SkyBridge Logistics",
    origin: "Frankfurt, DE",
    destination: "Chicago, US",
    carrier: "Lufthansa Cargo",
    lane: "DE-US",
    routeName: "MED-AIR-2",
    status: "exception",
    eta: "2026-03-18T18:00:00Z",
    predictedEta: "2026-03-19T05:00:00Z",
    delayHours: 11,
    riskScore: 79,
    slaState: "breach",
    profitability: {
      revenueUsd: 21950,
      costUsd: 18420,
      marginUsd: 3530,
      marginPct: 16.1
    },
    mapPosition: {
      lat: 50.0379,
      lng: 8.5622
    },
    milestones: [
      {
        code: "awb_created",
        label: "AWB Created",
        plannedAt: "2026-03-16T05:00:00Z",
        actualAt: "2026-03-16T05:12:00Z",
        location: "Frankfurt",
        status: "completed"
      },
      {
        code: "flight_departed",
        label: "Flight Departed",
        plannedAt: "2026-03-17T03:00:00Z",
        actualAt: "2026-03-17T04:25:00Z",
        location: "Frankfurt",
        status: "completed"
      },
      {
        code: "customs_release",
        label: "Customs Release",
        plannedAt: "2026-03-18T13:00:00Z",
        location: "Chicago",
        status: "late"
      },
      {
        code: "delivery_handoff",
        label: "Delivery Handoff",
        plannedAt: "2026-03-18T18:00:00Z",
        location: "Chicago",
        status: "predicted"
      }
    ],
    events: [
      {
        id: "evt-2001",
        shipmentId: "shp-1002",
        mode: "air",
        source: "manual",
        code: "TEMP_EXCURSION_ALERT",
        description: "Pharma temperature sensor triggered an excursion warning.",
        occurredAt: "2026-03-17T09:40:00Z",
        location: "Chicago O'Hare",
        severity: 74
      }
    ],
    exceptions: [
      {
        id: "exc-2001",
        shipmentId: "shp-1002",
        code: "missed_connection",
        title: "Downstream handoff missed",
        summary: "Late departure will miss the cold-chain bonded courier connection.",
        severity: 83,
        owner: "Air Ops Desk",
        detectedAt: "2026-03-17T09:50:00Z",
        status: "monitoring"
      }
    ],
    recommendations: [
      {
        id: "rec-2001",
        shipmentId: "shp-1002",
        action: "rebook_carrier",
        title: "Rebook bonded courier",
        reason: "Original handoff has a high probability of failure after the revised arrival.",
        confidence: 0.84,
        automationEligible: false
      }
    ],
    attachments: [
      {
        id: "att-2001",
        name: "temperature-certificate.pdf",
        type: "compliance",
        uploadedAt: "2026-03-17T10:04:00Z"
      }
    ]
  },
  {
    id: "shp-1003",
    reference: "TRK-114207",
    mode: "trucking",
    customer: "Nova Industrial",
    partner: "Midwest Dedicated",
    origin: "Dallas, US",
    destination: "Atlanta, US",
    carrier: "FleetSync",
    lane: "US-SOUTH",
    routeName: "I20 Corridor",
    status: "at_risk",
    eta: "2026-03-18T22:00:00Z",
    predictedEta: "2026-03-18T23:30:00Z",
    delayHours: 1.5,
    riskScore: 64,
    slaState: "watch",
    profitability: {
      revenueUsd: 6200,
      costUsd: 4340,
      marginUsd: 1860,
      marginPct: 30
    },
    mapPosition: {
      lat: 32.7767,
      lng: -96.797
    },
    milestones: [
      {
        code: "pickup_complete",
        label: "Pickup Complete",
        plannedAt: "2026-03-17T02:00:00Z",
        actualAt: "2026-03-17T02:08:00Z",
        location: "Dallas",
        status: "completed"
      },
      {
        code: "en_route",
        label: "In Route",
        plannedAt: "2026-03-17T04:00:00Z",
        actualAt: "2026-03-17T04:00:00Z",
        location: "Shreveport",
        status: "completed"
      },
      {
        code: "driver_break",
        label: "Driver Break Window",
        plannedAt: "2026-03-17T17:30:00Z",
        location: "Birmingham",
        status: "planned"
      },
      {
        code: "delivery_arrival",
        label: "Facility Arrival",
        plannedAt: "2026-03-18T22:00:00Z",
        location: "Atlanta",
        status: "predicted"
      }
    ],
    events: [
      {
        id: "evt-3001",
        shipmentId: "shp-1003",
        mode: "trucking",
        source: "samsara",
        code: "DRIVER_IDLE",
        description: "Driver inactivity exceeded the modeled fueling stop threshold.",
        occurredAt: "2026-03-17T11:20:00Z",
        location: "Monroe, LA",
        severity: 59,
        coordinates: {
          lat: 32.5093,
          lng: -92.1193
        }
      }
    ],
    exceptions: [
      {
        id: "exc-3001",
        shipmentId: "shp-1003",
        code: "driver_inactivity",
        title: "Extended driver idle time",
        summary: "Inactivity now threatens the promised delivery window.",
        severity: 57,
        owner: "Truck Ops",
        detectedAt: "2026-03-17T11:22:00Z",
        status: "open"
      }
    ],
    recommendations: [
      {
        id: "rec-3001",
        shipmentId: "shp-1003",
        action: "dispatch_backup_driver",
        title: "Prepare backup driver",
        reason: "Traffic plus idle time leaves limited buffer for the final mile slot.",
        confidence: 0.72,
        automationEligible: false
      }
    ],
    attachments: []
  },
  {
    id: "shp-1004",
    reference: "PAR-553118",
    mode: "parcel",
    customer: "Apex Retail",
    partner: "Prime Parcel Hub",
    origin: "Los Angeles, US",
    destination: "Phoenix, US",
    carrier: "DHL Express",
    lane: "US-WEST",
    routeName: "Desert Express",
    status: "in_transit",
    eta: "2026-03-18T16:30:00Z",
    predictedEta: "2026-03-18T16:10:00Z",
    delayHours: -0.3,
    riskScore: 21,
    slaState: "healthy",
    profitability: {
      revenueUsd: 860,
      costUsd: 540,
      marginUsd: 320,
      marginPct: 37.2
    },
    mapPosition: {
      lat: 34.0522,
      lng: -118.2437
    },
    milestones: [
      {
        code: "sort_complete",
        label: "Sort Complete",
        plannedAt: "2026-03-17T05:00:00Z",
        actualAt: "2026-03-17T04:50:00Z",
        location: "Los Angeles",
        status: "completed"
      },
      {
        code: "linehaul_departure",
        label: "Linehaul Departure",
        plannedAt: "2026-03-17T08:00:00Z",
        actualAt: "2026-03-17T07:58:00Z",
        location: "Los Angeles",
        status: "completed"
      },
      {
        code: "out_for_delivery",
        label: "Out For Delivery",
        plannedAt: "2026-03-18T13:00:00Z",
        location: "Phoenix",
        status: "planned"
      },
      {
        code: "proof_of_delivery",
        label: "Proof Of Delivery",
        plannedAt: "2026-03-18T16:30:00Z",
        location: "Phoenix",
        status: "predicted"
      }
    ],
    events: [
      {
        id: "evt-4001",
        shipmentId: "shp-1004",
        mode: "parcel",
        source: "dhl",
        code: "LINEHAUL_SCAN",
        description: "Parcel departed the origin terminal on schedule.",
        occurredAt: "2026-03-17T07:58:00Z",
        location: "Los Angeles",
        severity: 12
      }
    ],
    exceptions: [],
    recommendations: [
      {
        id: "rec-4001",
        shipmentId: "shp-1004",
        action: "notify_consignee",
        title: "Send proactive arrival window",
        reason: "High confidence ETA lets the portal provide a narrow delivery promise.",
        confidence: 0.94,
        automationEligible: true
      }
    ],
    attachments: []
  }
];
