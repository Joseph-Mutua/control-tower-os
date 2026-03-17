import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { ExceptionHeatmap } from "./components/ExceptionHeatmap";
import { MetricCard } from "./components/MetricCard";
import { Panel } from "./components/Panel";
import { ShipmentBoard } from "./components/ShipmentBoard";
import { SlaDashboard } from "./components/SlaDashboard";
import { controlTowerSeed } from "./data/controlTowerData";

export function App() {
  const [activeView, setActiveView] = useState<"ops" | "partner">("ops");
  const [selectedMode, setSelectedMode] = useState<"all" | "ocean" | "air" | "trucking" | "parcel">("all");

  const filteredShipments =
    selectedMode === "all"
      ? controlTowerSeed.shipments
      : controlTowerSeed.shipments.filter((shipment) => shipment.mode === selectedMode);

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="content-grid">
        <AppHeader activeView={activeView} onViewChange={setActiveView} />

        <section className="metric-grid">
          {controlTowerSeed.dashboardMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="hero-band">
          <div>
            <p className="eyebrow">Command Intent</p>
            <h2>
              Move from tracking updates to action-ready logistics decisioning.
            </h2>
          </div>
          <p>
            The control tower fuses ocean, air, trucking, and parcel data into a
            shared operating picture with prediction, orchestration, and partner
            self-service layered on top.
          </p>
        </section>

        {activeView === "ops" ? (
          <>
            <section className="ops-grid">
              <ShipmentBoard
                shipments={filteredShipments}
                selectedMode={selectedMode}
                onModeChange={setSelectedMode}
              />
              <ExceptionHeatmap buckets={controlTowerSeed.heatmap} />
            </section>
            <section className="ops-grid secondary">
              <SlaDashboard widgets={controlTowerSeed.slaWidgets} />
              <Panel title="Action Themes" eyebrow="Recommended automation">
                <ul className="signal-list compact">
                  <li>
                    <strong>Customs holds</strong>
                    <span>Auto-request documents and notify trade compliance.</span>
                  </li>
                  <li>
                    <strong>Missed connections</strong>
                    <span>Rebook carrier and push consignee update from one workflow.</span>
                  </li>
                  <li>
                    <strong>Driver inactivity</strong>
                    <span>Escalate to truck ops when dwell crosses modeled thresholds.</span>
                  </li>
                </ul>
              </Panel>
            </section>
          </>
        ) : (
          <section className="three-up">
            <Panel title="Portal Summary" eyebrow="Experience">
              <ul className="signal-list">
                <li>Shipment tracking by customer-safe reference</li>
                <li>Exception updates with narrow ETA windows</li>
                <li>Issue reporting and document upload actions</li>
              </ul>
            </Panel>
            <Panel title="Self-Service Actions" eyebrow="Permissions">
              <ul className="signal-list compact">
                {controlTowerSeed.portalActions.map((action) => (
                  <li key={action.id}>
                    <strong>{action.label}</strong>
                    <span>{action.description}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Role Matrix" eyebrow="Access control">
              <ul className="signal-list compact">
                {controlTowerSeed.rolePermissions.map((permission) => (
                  <li key={permission.role}>
                    <strong>{permission.role}</strong>
                    <span>
                      Workflow actions: {permission.canTriggerWorkflows ? "enabled" : "restricted"}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </section>
        )}
      </div>
    </main>
  );
}
