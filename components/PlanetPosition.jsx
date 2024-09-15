import React from "react";
import useSWR from "swr";

// Fetcher function to retrieve JSON data
const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json(); // Parse the response as JSON
  });

const PlanetPosition = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/planet`,
    fetcher
  );

  // Debugging: Log the fetched data to inspect its structure
  console.log("Fetched Data:", data);

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p className="text-red-500">Error fetching data: {error.message}</p>;
  }

  // Ensure data is an array; if not, handle it as an empty array
  const planetPositions = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-col items-start justify-start text-justify">
      {planetPositions.length > 0 ? (
        <div className="p-4 rounded-lg border-solid border-[#FFE09C]">
          <table className="mt-2 table-auto border-collapse w-full ">
            <tbody>
              {planetPositions.map((planetData, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4">{planetData.planet}</td>
                  <td className="px-4">{planetData.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No planet data available.</p>
      )}
    </div>
  );
};

export default PlanetPosition;
