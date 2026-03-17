# MCP Operations Copilot

The optional copilot layer is designed as a read-mostly operational assistant with audited access.

## Example prompts

- Why is this shipment red?
- Show loads at risk in the next 24 hours.
- Which customers have the most SLA breach exposure today?
- Summarize the carrier lanes driving detention risk this week.

## Suggested tool access

- GraphQL query access to shipment board, shipment detail, exception center, and action queue
- Workflow invocation for approved mitigation flows only
- Audit logging for every prompt and any follow-on action
- OAuth 2.1 + PKCE for delegated partner access
