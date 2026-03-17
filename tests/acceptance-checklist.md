# Acceptance Checklist

## UI

- Operations view shows KPI cards, shipment board, exception heatmap, SLA widgets, shipment drill-down, and copilot panel.
- Partner portal shows branded tracking details, role switching, and permission-aware self-service actions.
- Layout remains readable on desktop and narrow mobile widths.

## API

- Dashboard, shipment, exceptions, public workflow catalog, audit, event ingestion, automation, and copilot endpoints are defined in the router.
- Public endpoints match the workflow definitions and OpenAPI documentation.
- Automated actions write audit entries and fan out notifications.

## Platform alignment

- App modules and workflows exist in YAML under `config/`.
- GraphQL schema sketch exists under `docs/graphql/`.
- MCP copilot expectations are documented in `docs/mcp-copilot.md`.
