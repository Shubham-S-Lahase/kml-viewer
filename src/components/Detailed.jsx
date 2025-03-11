const Detailed = ({ geoJson }) => {
    if (!geoJson) return null;
  
    const details = geoJson.features.flatMap((feature) => {
      const { type, geometries } = feature.geometry;
  
      const geometriesList = type === "GeometryCollection" ? geometries : [feature.geometry];
  
      return geometriesList.map((geometry) => {
        if (!geometry.coordinates) return { type: geometry.type, value: "N/A" };
  
        const { type, coordinates } = geometry;
  
        if (type.includes("LineString")) {
          let length = 0;
          coordinates.forEach((line) => {
            for (let i = 1; i < line.length; i++) {
              const [x1, y1] = line[i - 1];
              const [x2, y2] = line[i];
              length += Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            }
          });
          return { type, value: `${length.toFixed(2)} units` };
        }
  
        if (type.includes("Polygon")) {
          let totalArea = 0;
  
          const computeArea = (coords) => {
            let area = 0;
            for (let i = 0; i < coords.length; i++) {
              const ring = coords[i];
              let ringArea = 0;
  
              for (let j = 0; j < ring.length - 1; j++) {
                const [x1, y1] = ring[j];
                const [x2, y2] = ring[j + 1];
                ringArea += x1 * y2 - x2 * y1;
              }
              area += Math.abs(ringArea) / 2;
            }
            return area;
          };
  
          if (type === "Polygon") {
            totalArea = computeArea(coordinates);
          } else if (type === "MultiPolygon") {
            coordinates.forEach((polygon) => {
              totalArea += computeArea(polygon);
            });
          }
  
          return { type, value: `${totalArea.toFixed(2)} sq. units` };
        }
  
        return { type, value: "N/A" };
      });
    });
  
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-bold">Detailed View</h3>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Element Type</th>
              <th className="border px-4 py-2">Measurement</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{detail.type}</td>
                <td className="border px-4 py-2">{detail.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Detailed;
  