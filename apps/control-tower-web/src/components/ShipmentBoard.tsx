import type { ShipmentDetail } from "@cxtms/shared";

interface ShipmentBoardProps {
  shipments: ShipmentDetail[];
  selectedMode: "all" | ShipmentDetail["mode"];
  selectedShipmentId: string;
  onModeChange: (mode: "all" | ShipmentDetail["mode"]) => void;
  onSelectShipment: (shipmentId: string) => void;
}

const modes = ["all", "ocean", "air", "trucking", "parcel"] as const;

export function ShipmentBoard({
  shipments,
  selectedMode,
  selectedShipmentId,
  onModeChange,
  onSelectShipment,
}: ShipmentBoardProps) {
  return (
    <section className="panel board-panel span-2">
      <div className="panel-head board-head">
        <div>
          <p>Global Shipment Board</p>
          <h2>All active modes in one exception-first queue.</h2>
        </div>
        <div className="chip-row">
          {modes.map((mode) => (
            <button
              key={mode}
              className={selectedMode === mode ? "chip active" : "chip"}
              type="button"
              onClick={() => onModeChange(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="board-table">
        <div className="board-row board-row-head">
          <span>Reference</span>
          <span>Mode</span>
          <span>Lane</span>
          <span>Carrier</span>
          <span>ETA</span>
          <span>Risk</span>
          <span>SLA</span>
          <span>Margin</span>
        </div>
        {shipments.map((shipment) => (
          <button
            className={selectedShipmentId === shipment.id ? "board-row selected" : "board-row"}
            key={shipment.id}
            type="button"
            onClick={() => onSelectShipment(shipment.id)}
          >
            <div>
              <strong>{shipment.reference}</strong>
              <small>{shipment.customer}</small>
            </div>
            <span className="capsule subtle">{shipment.mode}</span>
            <div>
              <strong>{shipment.origin}</strong>
              <small>{shipment.destination}</small>
            </div>
            <div>
              <strong>{shipment.carrier}</strong>
              <small>{shipment.routeName}</small>
            </div>
            <div>
              <strong>{new Date(shipment.predictedEta).toLocaleString()}</strong>
              <small>{shipment.delayHours > 0 ? `+${shipment.delayHours}h vs plan` : "Ahead of plan"}</small>
            </div>
            <div>
              <strong>{shipment.riskScore}</strong>
              <small>{shipment.exceptions.length} open exceptions</small>
            </div>
            <span className={`capsule ${shipment.slaState}`}>{shipment.slaState}</span>
            <div>
              <strong>${shipment.profitability.marginUsd.toLocaleString()}</strong>
              <small>{shipment.profitability.marginPct}% margin</small>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
