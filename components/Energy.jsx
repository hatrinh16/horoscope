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
    <div className="w-full items-center mt-4">
        <div className="flex flex-col w-full items-start justify-start rounded  bg-white bg-opacity-5 p-8">
            <div className="flex w-full items-center justify-center">
              <ul className="w-full lg:w-[80%] p-0">
                {energyIndex.map((energyData, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <label className="flex-shrink-0 w-1/3 lg:w-1/4">
                      {energyData.label}
                    </label>
                    <div className="flex-grow h-4">
                      <span
                        className={`block h-full ${getColorForLabel(energyData.label)}`}
                        style={{ width: `${energyData.spans[2]}%` }}
                      ></span>
                    </div>
                    <span className="flex-shrink-0 w-1/4 ml-1 text-center">
                      {energyData.spans[2]}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
    </div>
  );
}

export default Energy;
