import type { UserRole } from "@cxtms/shared";
import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { ExceptionHeatmap } from "./components/ExceptionHeatmap";
import { MetricCard } from "./components/MetricCard";
import { Panel } from "./components/Panel";
import { PartnerPortalView } from "./components/PartnerPortalView";
import { RecommendationPanel } from "./components/RecommendationPanel";
import { ShipmentBoard } from "./components/ShipmentBoard";
import { ShipmentTimeline } from "./components/ShipmentTimeline";
import { SlaDashboard } from "./components/SlaDashboard";
import { TrackingMap } from "./components/TrackingMap";
import { controlTowerSeed } from "./data/controlTowerData";

export function App() {
  const [activeView, setActiveView] = useState<"ops" | "partner">("ops");
  const [selectedMode, setSelectedMode] = useState<"all" | "ocean" | "air" | "trucking" | "parcel">("all");
  const [selectedShipmentId, setSelectedShipmentId] = useState("shp-1001");
  const [portalRole, setPortalRole] = useState<UserRole>("customer");

  const filteredShipments =
    selectedMode === "all"
      ? controlTowerSeed.shipments
      : controlTowerSeed.shipments.filter((shipment) => shipment.mode === selectedMode);

  const selectedShipment =
    filteredShipments.find((shipment) => shipment.id === selectedShipmentId) ?? filteredShipments[0] ?? controlTowerSeed.shipments[0];
  const portalShipment = controlTowerSeed.shipments[0];

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
                selectedShipmentId={selectedShipment.id}
                onModeChange={setSelectedMode}
                onSelectShipment={setSelectedShipmentId}
              />
              <ExceptionHeatmap buckets={controlTowerSeed.heatmap} />
            </section>
            <section className="ops-grid secondary">
              <ShipmentTimeline shipment={selectedShipment} />
              <TrackingMap shipment={selectedShipment} />
            </section>
            <section className="ops-grid secondary">
              <SlaDashboard widgets={controlTowerSeed.slaWidgets} />
              <RecommendationPanel shipment={selectedShipment} />
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
          <PartnerPortalView
            shipment={portalShipment}
            portalRole={portalRole}
            roles={controlTowerSeed.rolePermissions}
            actions={controlTowerSeed.portalActions}
            onRoleChange={setPortalRole}
          />
        )}
      </div>
    </main>
  );
}
