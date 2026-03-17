import type { PartnerPortalAction, RolePermission, ShipmentDetail, UserRole } from "@cxtms/shared";

interface PartnerPortalViewProps {
  shipment: ShipmentDetail;
  portalRole: UserRole;
  roles: RolePermission[];
  actions: PartnerPortalAction[];
  onRoleChange: (role: UserRole) => void;
}

const portalRoles: UserRole[] = ["customer", "partner", "ops_analyst", "finance"];

export function PartnerPortalView({
  shipment,
  portalRole,
  roles,
  actions,
  onRoleChange,
}: PartnerPortalViewProps) {
  const role = roles.find((candidate) => candidate.role === portalRole) ?? roles[0];

  return (
    <section className="portal-grid">
      <section className="panel span-2">
        <div className="panel-head portal-head">
          <div>
            <p>Partner Portal</p>
            <h2>{shipment.reference} branded visibility view.</h2>
          </div>
          <div className="chip-row">
            {portalRoles.map((item) => (
              <button
                key={item}
                className={portalRole === item ? "chip active" : "chip"}
                type="button"
                onClick={() => onRoleChange(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="portal-hero">
          <div>
            <strong>{shipment.customer}</strong>
            <span>{shipment.origin} -> {shipment.destination}</span>
            <span>Updated ETA {new Date(shipment.predictedEta).toLocaleString()}</span>
          </div>
          <div>
            <strong>{shipment.status.replace("_", " ")}</strong>
            <span>{shipment.carrier}</span>
            <span>{shipment.exceptions.length} open exceptions</span>
          </div>
        </div>

        <div className="portal-milestones">
          {shipment.milestones.map((milestone) => (
            <article key={milestone.code} className="portal-milestone">
              <strong>{milestone.label}</strong>
              <span>{milestone.location}</span>
              <span>{new Date(milestone.plannedAt).toLocaleString()}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <p>Role Policy</p>
          <h2>{portalRole} access rights.</h2>
        </div>
        <ul className="signal-list compact">
          <li>
            <strong>Financial visibility</strong>
            <span>{role.canViewFinancials ? "Enabled" : "Restricted"}</span>
          </li>
          <li>
            <strong>Workflow triggers</strong>
            <span>{role.canTriggerWorkflows ? "Enabled" : "Restricted"}</span>
          </li>
          <li>
            <strong>Document upload</strong>
            <span>{role.canUploadDocuments ? "Enabled" : "Restricted"}</span>
          </li>
          <li>
            <strong>Copilot access</strong>
            <span>{role.canUseCopilot ? "Enabled" : "Restricted"}</span>
          </li>
        </ul>
      </section>

      <section className="panel">
        <div className="panel-head">
          <p>Self-Service Actions</p>
          <h2>Portal workflow entry points.</h2>
        </div>
        <div className="portal-actions">
          {actions.map((action) => (
            <button
              key={action.id}
              className={role[action.permission] ? "portal-action enabled" : "portal-action disabled"}
              type="button"
            >
              <strong>{action.label}</strong>
              <span>{action.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel span-2">
        <div className="panel-head">
          <p>Partner-Facing Notes</p>
          <h2>Exception updates and attachments ready for external collaboration.</h2>
        </div>
        <div className="portal-feed">
          {shipment.exceptions.map((exception) => (
            <article key={exception.id} className="event-card">
              <strong>{exception.title}</strong>
              <span>{exception.summary}</span>
            </article>
          ))}
          {shipment.attachments.map((attachment) => (
            <article key={attachment.id} className="event-card">
              <strong>{attachment.name}</strong>
              <span>{attachment.type} uploaded {new Date(attachment.uploadedAt).toLocaleString()}</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
