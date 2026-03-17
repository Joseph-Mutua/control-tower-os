# Architecture Notes

The project is intentionally split into:

- `web`: control tower user experience for operations, customers, and partners
- `api`: ingestion, normalization, prediction, rules, notifications, and public workflows
- `shared`: a common logistics language shared across both surfaces

Later commits will fill in the multi-modal domain model, APIs, UI modules, and CXTMS-native configuration assets.
