import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { MetricCard } from "./components/MetricCard";
import { Panel } from "./components/Panel";
import { controlTowerSeed } from "./data/controlTowerData";

export function App() {
  const [activeView, setActiveView] = useState<"ops" | "partner">("ops");

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

        <section className="three-up">
          <Panel
            title={activeView === "ops" ? "Operations Surfaces" : "Portal Capabilities"}
            eyebrow="Experience"
          >
            <ul className="signal-list">
              <li>Global shipment board with role-aware filtering</li>
              <li>Exception-first action center with workflow triggers</li>
              <li>Partner-facing status views and issue intake</li>
            </ul>
          </Panel>
          <Panel title="Signals" eyebrow="Coverage">
            <ul className="signal-list">
              {controlTowerSeed.heatmap.map((item) => (
                <li key={item.key}>
                  <strong>{item.label}</strong>
                  <span>{item.impactedShipments} impacted shipments</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Service Levels" eyebrow="Customers">
            <ul className="signal-list compact">
              {controlTowerSeed.slaWidgets.map((widget) => (
                <li key={widget.customer}>
                  <strong>{widget.customer}</strong>
                  <span>{widget.slaBreaches} breaches, ${widget.marginAtRiskUsd.toLocaleString()} at risk</span>
                </li>
              ))}
            </ul>
          </Panel>
        </section>
      </div>
    </main>
  );
}
