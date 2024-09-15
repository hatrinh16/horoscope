import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

// Fetcher function to retrieve JSON data
const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json(); // Parse the response as JSON
  });

function Energy({ sign }) {
  // Dynamically update the URL based on the provided `sign`
  const router = useRouter();
  const { name } = router.query;
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/energy/${name}`, // Using the `sign` prop dynamically
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
  const energyIndex = Array.isArray(data) ? data : [];

  const getColorForLabel = (label) => {
    switch (label) {
      case "Wellness:":
        return "bg-blue-300"; // Pastel Blue
      case "Energy:":
        return "bg-green-300"; // Pastel Green
      case "Money:":
        return "bg-yellow-300"; // Pastel Yellow
      case "Love:":
        return "bg-red-300"; // Pastel Red
      case "Emotions:":
        return "bg-purple-300"; // Pastel Purple
      case "Intuition:":
        return "bg-indigo-300"; // Pastel Indigo
      case "Intellect:":
        return "bg-pink-300"; // Pastel Pink
      case "Work:":
        return "bg-orange-300"; // Pastel Orange
      case "Creativity:":
        return "bg-teal-300"; // Pastel Teal
      default:
        return "bg-gray-300"; // Default pastel color if no match
    }
  };

  return (
    <div className="flex w-full">
      <ul className="w-full lg:w-[80%] p-0">
        {energyIndex.map((energyData, index) => (
          <li key={index} className="flex items-center mb-2">
            <label className="flex-shrink-0 w-1/3 lg:w-1/6">
              {energyData.label}
            </label>
            <div className="flex-grow h-4">
              <span
                className={`block h-full ${getColorForLabel(energyData.label)}`}
                style={{ width: `${energyData.spans[2]}%` }}
              ></span>
            </div>
            <span className="flex-shrink-0 w-1/4 ml-1 text-left">
              {energyData.spans[2]}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Energy;
