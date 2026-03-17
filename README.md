# CXTMS Control Tower OS

Predictive, multi-modal exception and orchestration layer built on top of CXTMS-style primitives.

## Workspace

- `apps/control-tower-web`: React + TypeScript control tower and partner portal UI
- `services/control-tower-api`: Node.js microservice API for event ingestion, predictions, rules, and public APIs
- `shared`: shared domain types used by both app and service
- `config`: YAML app modules and workflow definitions aligned to CXTMS platform patterns
- `docs`: architecture and product notes

## Product focus

This demo is designed to show how CXTMS could expose:

- A global multi-modal shipment board
- Exception-first operations workflows
- Predictive ETA and risk scoring
- Partner and customer self-service portals
- Public API workflows backed by documented endpoints

