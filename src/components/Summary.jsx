const Summary = ({ geoJson }) => {
    if (!geoJson) return null;
  
    const counts = geoJson.features.reduce((acc, feature) => {
      const type = feature.geometry.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
  
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-bold">Summary</h3>
        <table className="w-full border">
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
      </div>
    );
  };
  
  export default Summary;
  