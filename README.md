# CXTMS Control Tower OS

Predictive multi-modal visibility, exception orchestration, and partner self-service built as a demo product on top of CXTMS-style primitives.

Live demo: https://control-tower-os-control-tower-web.vercel.app/

## Overview

CXTMS Control Tower OS is a concept project designed to sit above a configurable TMS platform and turn raw operational visibility into action-ready orchestration.

The demo combines ocean, air, trucking, and parcel shipment signals into a single control-tower experience with:

- cross-modal shipment visibility
- predictive ETA and delay-risk context
- exception heatmaps and SLA exposure
- recommended mitigation actions
- customer and partner self-service flows
- public workflow-backed APIs
- an audited operations copilot

## Why This Project Fits CXTMS

The project is intentionally shaped around the public CXTMS product and platform story:

- low-code application composition through YAML app modules
- workflow-backed public APIs
- GraphQL-first internal data access
- role-based permissions at route, component, and action level
- audit-friendly automation and notifications
- AI-assisted operational decision support

Rather than behaving like a generic dashboard, the repo tries to demonstrate how a control tower could be productized as a CXTMS-native module.

## Core Product Capabilities

### Operations Control Tower

- Global shipment board across ocean, air, trucking, and parcel
- Exception-first queue with risk, ETA, SLA, and margin context
- Heatmap views by carrier, lane, route, and customer
- Shipment timeline, event feed, and map-style tracking card
- Recommended actions such as notifying consignees, rebooking, or escalating customs blockers

### Partner and Customer Experience

- Branded portal view for tracking by shipment reference
- Role-aware access for customer, partner, ops analyst, and finance personas
- Self-service actions for requesting updates, reporting issues, and uploading documents
- External collaboration context through exceptions and attachments

### API and Orchestration Layer

- Event ingestion endpoint for webhook-style updates
- Normalized shipment event model
- Prediction and rules services for ETA, delay probability, and action queueing
- Notification orchestration for Slack, Teams, and email
- Audit log trail for automated and partner-triggered actions
- Public workflow surfaces for shipment tracking and issue intake

### Optional AI Copilot

- Operations prompts such as:
  - Why is this shipment red?
  - Show loads at risk in the next 24 hours.
  - Which customers have the most SLA breach exposure today?
- Audited prompt handling on the API side
- UI panel that demonstrates how MCP-style operational assistance could fit into the control tower

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, TypeScript
- Shared domain package: workspace-local TypeScript package
- Config assets: YAML app modules and workflow definitions
- API contracts: GraphQL schema sketch and OpenAPI file

## Workspace Structure

- `apps/control-tower-web`
  Frontend for the control tower and partner portal.
- `services/control-tower-api`
  API service for dashboard data, event ingestion, workflows, notifications, audit logs, and copilot prompts.
- `shared`
  Shared domain types and seeded logistics demo data.
- `config`
  CXTMS-style YAML app modules and public workflow definitions.
- `docs`
  Architecture notes, demo walkthrough, OpenAPI, GraphQL schema, and copilot notes.
- `tests`
  Acceptance checklist and demo validation notes.

## Getting Started

### Prerequisites

- Node.js 20+
- npm 11+

### Install Dependencies

From the repo root:

```powershell
npm install
```

### Start the App Locally

Run the API in one terminal:

```powershell
npm run dev:api
```

Run the frontend in a second terminal:

```powershell
npm run dev:web
```

Local endpoints:

- Web UI: `http://localhost:5173`
- API: `http://localhost:4010`
- API health check: `http://localhost:4010/health`

## Build and Validation

Build everything:

```powershell
npm run build
```

Type-check everything:

```powershell
npm run typecheck
```

The root build runs workspaces in dependency order so the shared package compiles before the web app and API.

## Key API Routes

### Internal Ops Routes

- `GET /health`
- `GET /api/dashboard`
- `GET /api/shipments`
- `GET /api/shipments/:id`
- `GET /api/exceptions`
- `GET /api/audit`
- `POST /api/events`
- `POST /api/actions/automate`
- `POST /api/copilot/query`

### Public and Partner Routes

- `GET /api/public/workflows`
- `GET /public/shipments/:reference`
- `POST /public/issues`

## CXTMS-Native Assets Included

### App Modules

- `config/app-modules/control-tower-ops.yaml`
- `config/app-modules/partner-portal.yaml`

### Workflow Definitions

- `config/workflows/public-track-shipment.yaml`
- `config/workflows/partner-report-issue.yaml`

### API and Schema Artifacts

- `docs/openapi.yaml`
- `docs/graphql/control-tower.graphql`
- `docs/mcp-copilot.md`

## Demo Data Model

The repo includes seeded logistics data so the UI and API can demonstrate realistic behavior without requiring live integrations.

The shared package includes:

- shipments and shipment detail records
- milestones and events
- exceptions and recommendations
- dashboard metrics and SLA widgets
- role permissions and portal actions
- public workflow metadata

## Suggested Demo Flow

A strong walkthrough order is:

1. Open the operations view and frame the KPI row as a control tower, not a passive tracker.
2. Use the global shipment board to show multi-modal visibility.
3. Select a risky shipment and walk through timeline, events, map, and recommended actions.
4. Show the exception heatmap and SLA widgets to highlight service and profitability impact.
5. Use the copilot panel to explain a red shipment and identify the next 24-hour risk set.
6. Switch to the partner portal to demonstrate role-aware self-service and external visibility.
7. Close in the YAML and API docs to connect the experience back to CXTMS platform primitives.

## Deployment

The current live frontend deployment is hosted on Vercel:

- https://control-tower-os-control-tower-web.vercel.app/

## Notes

- The frontend is intentionally data-seeded for demo clarity rather than wired to a live integration backend.
- The API service is designed as a lightweight demo microservice, not a production-hardened logistics runtime.
- The YAML, GraphQL, and OpenAPI artifacts are there to show platform fit and extension strategy, not just UI polish.
