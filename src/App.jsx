import { useState } from "react";
import FileUpload from "./components/FileUpload";
import MapView from "./components/MapView";

function App() {
  const [geoJson, setGeoJson] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">KML Viewer</h1>
      <FileUpload onKmlParsed={setGeoJson} />
      <MapView geoJson={geoJson} />
      <div className="flex gap-4 mt-4">
      </div>
    </div>
  );
}

export default App;
