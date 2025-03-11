import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const MapView = ({ geoJson }) => {
  const mapRef = useRef(null);
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && geoJson) {
      if (geoJsonLayerRef.current) {
        mapRef.current.removeLayer(geoJsonLayerRef.current);
      }
      geoJsonLayerRef.current = new GeoJSON({ data: geoJson }).addTo(mapRef.current);
      
      mapRef.current.fitBounds(geoJsonLayerRef.current.getBounds());
    }
  }, [geoJson]);

  return (
    <MapContainer
      center={[20, 78]}
      zoom={1}
      className="h-96 w-full border rounded-lg"
      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJson && (
        <GeoJSON
          data={geoJson}
          key={JSON.stringify(geoJson)}
          ref={geoJsonLayerRef}
        />
      )}
    </MapContainer>
  );
};

export default MapView;
