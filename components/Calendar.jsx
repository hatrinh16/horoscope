import { useEffect, useState } from "react";
import {
  FaHeart,
  FaBolt,
  FaDollarSign,
  FaExclamationTriangle,
} from "react-icons/fa";

const icons = {
  love: <FaHeart className="text-pink-500" />,
  energy: <FaBolt className="text-yellow-400" />,
  money: <FaDollarSign className="text-green-500" />,
  stress: <FaExclamationTriangle className="text-red-500" />,
};

export default function ZodiacCalendar({ sign, month, year }) {
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sampleCalendarData = {
    "2": { energy: 4, love: 3 },
    "5": { money: 5, stress: 2 },
    "8": { love: 2 },
    "13": { energy: 3, money: 2 },
    "16": { stress: 4 },
    "21": { energy: 5, love: 4, money: 3 },
    "24": { money: 1 },
    "27": { love: 5, stress: 1 }
  };
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCalendarData(sampleCalendarData);
      setLoading(false);
    }, 500); // simulate API delay
  }, []);
  

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `http://localhost:8080/calendar?sign=${sign}&month=${month}&year=${year}`
//         );
//         const json = await res.json();
//         setCalendarData(json);
//       } catch (err) {
//         console.error("Failed to fetch calendar data", err);
//       }
//       setLoading(false);
//     }

//     fetchData();
//   }, [sign, month, year]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (!calendarData || Object.keys(calendarData).length === 0)
    return <div className="text-white">No data available.</div>;

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg text-white w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 capitalize">
        {sign} - {month}/{year} Calendar
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(calendarData).map(([day, aspects]) => (
          <div
            key={day}
            className="bg-black bg-opacity-30 p-4 rounded-lg shadow text-sm"
          >
            <div className="text-lg font-semibold mb-2">{month}/{day}</div>
            <ul className="space-y-1">
              {Object.entries(aspects).map(([aspect, value]) => (
                <li key={aspect} className="flex items-center gap-2">
                  {icons[aspect]} <span className="capitalize">{aspect}</span>: {value}/5
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
