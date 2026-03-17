interface AppHeaderProps {
  activeView: "ops" | "partner";
  onViewChange: (view: "ops" | "partner") => void;
}

export function AppHeader({ activeView, onViewChange }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">CXTMS Control Tower OS</p>
        <h1>Predictive visibility, exception orchestration, and self-service.</h1>
      </div>
      <div className="header-actions">
        <button
          className={activeView === "ops" ? "view-toggle active" : "view-toggle"}
          onClick={() => onViewChange("ops")}
          type="button"
        >
          Operations View
        </button>
        <button
          className={activeView === "partner" ? "view-toggle active" : "view-toggle"}
          onClick={() => onViewChange("partner")}
          type="button"
        >
          Partner Portal
        </button>
      </div>
    </header>
  );
}
