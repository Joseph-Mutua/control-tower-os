

Live demo: https://control-tower-os-control-tower-web.vercel.app/

## What is in the demo

- React + TypeScript control tower for operations and partner-facing views
- Node.js microservice API for event ingestion, prediction, exception routing, public workflows, and audited notifications
- Shared logistics domain model covering shipment board rows, milestones, events, recommendations, SLA widgets, and permissions
- CXTMS-native YAML app modules, public workflow definitions, GraphQL schema, OpenAPI spec, and MCP copilot notes

## Product slices

- Global shipment board across ocean, air, trucking, and parcel
- Exception heatmap by carrier, lane, route, and customer
- Shipment detail timeline, map-style tracking card, and recommended actions
- Partner portal with role-aware self-service actions
- Public tracking and issue-reporting workflow surfaces
- Audited operations copilot for “Why is this shipment red?” style questions

## Workspace

- `apps/control-tower-web`: React + TypeScript UI
- `services/control-tower-api`: Node.js API and orchestration services
- `shared`: shared types and seeded logistics data
- `config`: YAML app modules and workflow definitions
- `docs`: architecture, API, and demo notes
- `tests`: acceptance and demo checklist

## Quick start

1. Install dependencies from the workspace root: `npm install`
2. Start the API: `npm run dev:api`
3. Start the web app: `npm run dev:web`

## Representative API routes

- `GET /api/dashboard`
- `GET /api/shipments`
- `GET /api/shipments/:id`
- `GET /api/exceptions`
- `GET /api/audit`
- `POST /api/events`
- `POST /api/actions/automate`
- `POST /api/copilot/query`
- `GET /public/shipments/:reference`
- `POST /public/issues`

## Commit map

1. `chore: scaffold control tower workspace`
2. `feat: add shared control tower domain models`
3. `feat: implement normalization and prediction services`
4. `feat: expose control tower and partner api endpoints`
5. `feat: add orchestration notifications and audit trail`
6. `feat: add cxtms-native modules workflows and api specs`
7. `feat: build control tower frontend shell and shared UI`
8. `feat: add shipment board heatmap and sla dashboards`
9. `feat: add shipment timeline tracking and action center`
10. `feat: add partner portal and role-aware self-service views`
11. `feat: add audited ops copilot experience`
12. `docs: polish developer experience and demo guide`
