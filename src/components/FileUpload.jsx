import { useState } from "react";
import * as togeojson from "@tmcw/togeojson";

const FileUpload = ({ onKmlParsed }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleParse = () => {
    if (!file) return alert("Please upload a KML file.");

    const reader = new FileReader();
    reader.onload = (e) => {
      const parser = new DOMParser();
      const kml = parser.parseFromString(e.target.result, "text/xml");
      const geoJson = togeojson.kml(kml);
      onKmlParsed(geoJson);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center space-y-4 border border-gray-200">
      <label className="relative cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg border border-gray-300 transition duration-200">
        Select KML File
        <input
          type="file"
          accept=".kml"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}

      <button
        onClick={handleParse}
        className={`px-6 py-2 rounded-lg text-white font-medium transition duration-200 ${
          file
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!file}
      >
        Parse KML
      </button>
    </div>
  );
};

export default FileUpload;
