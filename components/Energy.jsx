import React from "react";
import useSWR from "swr";

// Fetcher function to retrieve JSON data
const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });

function Energy({ sign, tabIndex }) {
  // Determine which endpoint to fetch based on the current tab
  let dayPath = "energy"; // Default is today
  if (tabIndex === 0) {
    dayPath = "energy-yesterday";
  } else if (tabIndex === 2) {
    dayPath = "energy-tomorrow";
  }

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/${dayPath}/${sign}`;

  const { data, error, isLoading } = useSWR(endpoint, fetcher);

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p className="text-red-500">Error fetching data: {error.message}</p>;
  }

  const energyIndex = Array.isArray(data) ? data : [];

  const getColorForLabel = (label) => {
    switch (label) {
      case "Wellness:":
        return "bg-blue-300";
      case "Energy:":
        return "bg-green-300";
      case "Money:":
        return "bg-yellow-300";
      case "Love:":
        return "bg-red-300";
      case "Emotions:":
        return "bg-purple-300";
      case "Intuition:":
        return "bg-indigo-300";
      case "Intellect:":
        return "bg-pink-300";
      case "Work:":
        return "bg-orange-300";
      case "Creativity:":
        return "bg-teal-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="w-full items-center mt-8">
      <div className="flex flex-col w-full items-center justify-center rounded bg-white bg-opacity-5 p-8">
        <h3 className="text-xl font-semibold text-white text-center mb-6">
          Cosmic Energies
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {energyIndex.map((energyData, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#25194b] p-4 text-white shadow-md border border-white/5 w-full"
            >
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>{energyData.label.replace(":", "")}</span>
                <span>{energyData.spans[2]}%</span>
              </div>
              <div className="w-full h-2 bg-[#3a2e5f] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getColorForLabel(energyData.label)} rounded-full`}
                  style={{ width: `${energyData.spans[2]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Energy;
