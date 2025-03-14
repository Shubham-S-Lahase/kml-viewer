import { useState } from "react";
import FileUpload from "./components/FileUpload";
import MapView from "./components/MapView";
import Summary from "./components/Summary";
import Detailed from "./components/Detailed";

function App() {
  const [geoJson, setGeoJson] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">KML Viewer</h1>
      <FileUpload onKmlParsed={setGeoJson} />
      <MapView geoJson={geoJson} />

      {geoJson && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showSummary ? "Hide Summary" : "Show Summary"}
          </button>
          <button
            onClick={() => setShowDetailed(!showDetailed)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {showDetailed ? "Hide Detailed" : "Show Detailed"}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {showSummary && <Summary geoJson={geoJson} />}
        {showDetailed && <Detailed geoJson={geoJson} />}
      </div>
    </div>
  );
}

export default App;
