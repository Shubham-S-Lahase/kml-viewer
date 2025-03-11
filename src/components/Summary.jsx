const Summary = ({ geoJson }) => {
  if (!geoJson) return null;

  const counts = geoJson.features.reduce((acc, feature) => {
    const geometry = feature.geometry;

    if (geometry.type === "GeometryCollection") {
      geometry.geometries.forEach((g) => {
        acc[g.type] = (acc[g.type] || 0) + 1;
      });
    } else {
      acc[geometry.type] = (acc[geometry.type] || 0) + 1;
    }

    return acc;
  }, {});

  const totalFeatures = geoJson.features.length;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold">Summary</h3>

      {totalFeatures === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <>
          <p className="text-sm text-gray-600">
            Total Features: {totalFeatures}
          </p>
          <table className="w-full border mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Element Type</th>
                <th className="border px-4 py-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(counts).map(([type, count]) => (
                <tr key={type}>
                  <td className="border px-4 py-2">{type}</td>
                  <td className="border px-4 py-2">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Summary;
