import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const MapView = ({ geoJson }) => {
  return (
    <MapContainer
      center={[20, 78]}
      zoom={1}
      className="h-96 w-full border rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJson && <GeoJSON data={geoJson} />}
    </MapContainer>
  );
};

export default MapView;
