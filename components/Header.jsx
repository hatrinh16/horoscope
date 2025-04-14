import { useContext, useState } from "react";
import { AppContext, AppDisptachContext } from "./AppContext";

const starSign = [
  { sign: "aries", image: "/aries.png", start: "03-21", end: "04-19" },
  { sign: "taurus", image: "/taurus.png", start: "04-20", end: "05-20" },
  { sign: "gemini", image: "/gemini.png", start: "05-21", end: "06-21" },
  { sign: "cancer", image: "/cancer.png", start: "06-22", end: "07-22" },
  { sign: "leo", image: "/leo.png", start: "07-23", end: "08-22" },
  { sign: "virgo", image: "/virgo.png", start: "08-23", end: "09-22" },
  { sign: "libra", image: "/libra.png", start: "09-23", end: "10-23" },
  { sign: "scorpio", image: "/scorpio.png", start: "10-24", end: "11-22" },
  { sign: "sagittarius", image: "/sagittarus.png", start: "11-23", end: "12-21" },
  { sign: "capricorn", image: "/capricorn.png", start: "12-22", end: "01-19" },
  { sign: "aquarius", image: "/aquarius.png", start: "01-20", end: "02-18" },
  { sign: "pisces", image: "/pisces.png", start: "02-19", end: "03-20" },
];

function Header() {
  const setDate = useContext(AppDisptachContext);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedSign, setSelectedSign] = useState(null);

  function findSign(date) {
    if (!date) return null;
    const month = date.getMonth() + 1;
    const day = date.getDate();

    for (const item of starSign) {
      const [startMonth, startDay] = item.start.split("-").map(Number);
      const [endMonth, endDay] = item.end.split("-").map(Number);

      const isStartMatch = month === startMonth && day >= startDay;
      const isEndMatch = month === endMonth && day <= endDay;
      const isCapricorn =
        item.sign === "capricorn" &&
        ((month === 12 && day >= 22) || (month === 1 && day <= 19));

      if (isStartMatch || isEndMatch || isCapricorn) {
        return item;
      }
    }

    return null;
  }

  function handleFindSign() {
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    if (!dayInt || !monthInt || !yearInt) return;

    const userDate = new Date(`${yearInt}-${monthInt}-${dayInt}`);
    setDate(userDate);
    const sign = findSign(userDate);
    setSelectedSign(sign);
  }

  return (
    <div className="bg-white bg-opacity-10 p-10 mx-6 rounded-xl shadow-lg">
      <div className=" flex flex-col items-center gap-4">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-center">Find Your Sign</h2>

        <div className="flex gap-2">
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="Day"
            className="w-20 md:w-40 p-2 rounded text-black border-transparent"
            min="1"
            max="31"
          />
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Month"
            className="w-20 md:w-40 p-2 rounded text-black border-transparent"
            min="1"
            max="12"
          />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="w-32 md:w-40 p-2 rounded text-black border-transparent"
            min="1900"
            max="2100"
          />
        </div>

        <button
          onClick={handleFindSign}
          className="hover:bg-[#f58a3e] bg-[#FF9100] text-white px-4 py-2 rounded-full mt-2 border-transparent"
        >
          Find My Sign
        </button>

        {selectedSign && (
          <div className="mt-4 flex items-center gap-2 text-white">
            <span>Your Zodiac Sign:</span>
            <img src={selectedSign.image} alt={selectedSign.sign} className="w-10" />
            <span className="text-xl capitalize">{selectedSign.sign}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
