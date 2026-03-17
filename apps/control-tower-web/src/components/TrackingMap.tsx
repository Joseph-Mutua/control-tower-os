import type { ShipmentDetail } from "@cxtms/shared";

interface TrackingMapProps {
  shipment: ShipmentDetail;
}

export function TrackingMap({ shipment }: TrackingMapProps) {
  return (
    <section className="panel">
      <div className="panel-head">
        <p>Map + Tracking</p>
        <h2>{shipment.routeName}</h2>
      </div>
      <div className="map-card">
        <div className="map-stage">
          <div
            className="map-marker"
            style={{ left: `${shipment.mapPosition.lng + 180 > 0 ? ((shipment.mapPosition.lng + 180) / 360) * 100 : 50}%`, top: `${100 - ((shipment.mapPosition.lat + 90) / 180) * 100}%` }}
          />
        </div>
        <div className="map-details">
          <strong>{shipment.origin} -> {shipment.destination}</strong>
          <span>{shipment.carrier}</span>
          <span>Predicted ETA: {new Date(shipment.predictedEta).toLocaleString()}</span>
          <span>Current coordinates: {shipment.mapPosition.lat.toFixed(2)}, {shipment.mapPosition.lng.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
