import { AppContext } from "../components/AppContext";
import { useContext } from "react";
import AstrologyCard from "../components/AstrologyCard";
// import Header from "../components/Header";
import Head from "next/head";
import {
  IconZodiacAquarius,
  IconZodiacAries,
  IconZodiacCancer,
  IconZodiacCapricorn,
  IconZodiacGemini,
  IconZodiacLeo,
  IconZodiacLibra,
  IconZodiacSagittarius,
  IconZodiacScorpio,
  IconZodiacTaurus,
  IconZodiacVirgo,
} from "@tabler/icons-react";
// import { HeaderMenu } from "../components/HeaderMenu";

const starSign = [
  {
    sign: "aries",
    icon: <IconZodiacAries />,
    start: "03-21",
    end: "04-19",
  },
  {
    sign: "taurus",
    icon: <IconZodiacTaurus />,
    start: "04-20",
    end: "05-20",
  },
  {
    sign: "gemini",
    icon: <IconZodiacGemini />,
    start: "05-21",
    end: "06-21",
  },
  {
    sign: "cancer",
    icon: <IconZodiacCancer />,
    start: "06-22",
    end: "07-22",
  },
  {
    sign: "leo",
    icon: <IconZodiacLeo />,
    start: "07-23",
    end: "08-22",
  },
  {
    sign: "virgo",
    icon: <IconZodiacVirgo />,
    start: "08-23",
    end: "09-22",
  },
  {
    sign: "libra",
    icon: <IconZodiacLibra />,
    start: "09-23",
    end: "10-23",
  },
  {
    sign: "scorpio",
    icon: <IconZodiacScorpio />,
    start: "10-24",
    end: "11-22",
  },
  {
    sign: "sagittarius",
    icon: <IconZodiacSagittarius />,
    start: "11-23",
    end: "12-21",
  },
  {
    sign: "capricorn",
    icon: <IconZodiacCapricorn />,
    start: "12-22",
    end: "01-19",
  },
  {
    sign: "aquarius",
    icon: <IconZodiacAquarius />,
    start: "01-20",
    end: "02-18",
  },
  {
    sign: "pisces",
    icon: <IconZodiacAries />,
    start: "02-19",
    end: "03-20",
  },
];

export default function IndexPage() {
  const date = useContext(AppContext);

  function renderAstrologyCard() {
    if (date) {
      const sign = getSign();
      return <AstrologyCard sign={sign.sign} icon={sign.icon} />;
    }
    let list = [];
    starSign.forEach((item, index) => {
      list.push(
        <AstrologyCard
          key={index}
          sign={item.sign}
          icon={item.icon}
          horoscope={item.data}
        />
      );
    });
    return list;
  }

  function getSign() {
    let sign;
    if (!date) return "Please enter your birthday";

    starSign.forEach((item) => {
      if (
        date.getMonth() + 1 == item.start.split("-")[0] &&
        date.getDate() >= item.start.split("-")[1]
      ) {
        sign = item;
      }
      if (
        date.getMonth() + 1 == item.end.split("-")[0] &&
        date.getDate() <= item.end.split("-")[1]
      ) {
        sign = item;
      }
    });
    return sign;
  }

  return (
    <main className="flex flex-col w-full h-screen bg-white items-center">
      <div className="flex flex-col items-center">
        <h1>DailyAstro</h1>
        <span className="intro">🌟 Your Celestial Guide to the Stars! 🌟</span>
        <div className="w-3/5 text-center">
          <span className="intro">
            Tap into the cosmic energy and draw inspiration from the celestial
            wisdom that molds your destiny.
          </span>
        </div>
      </div>
      <div className="flex flex-row w-4/5 mt-20 items-start text-[#28164C] justify-center">
        <div className="w-3/5 p-4">
          <h2>Daily Horoscopes</h2>
          <div className="flex items-center mt-6 justify-items-start gap-4 h-auto flex-wrap">
            {renderAstrologyCard()}
          </div>
        </div>
        <div className="w-2/5 p-4">
          <div>
            <h2>Planet Positions</h2>
            <div className="planet">
              <div className="flex flex-col text-gray-200">
                <span>dd/mm/yyyy, at 00:00:00 PM</span>
                <span>Coordinated Universal Time</span>
              </div>
              <span>Sun 02° Aries</span>
              <span>Moon 04° Virgo</span>
              <span>Mercury 20° Aries</span>
              <span>Venus 13° Pisces </span>
              <span>Mars 29° Aquarius </span>
              <span>Jupiter 15° Taurus </span>
              <span>Saturn 12° Pisces </span>
              <span>Uranus 20° Taurus </span>
              <span>Neptune 27° Pisces </span>
              <span>Pluto 01° Aquarius </span>
            </div>
          </div>

          <div>
            <h2>Card of the Day</h2>
            <div className="tarot">
              <p className="text-[#EEA5A6]">THE CHARIOT</p>
              <div className="flex items-start self-stretch">
                <p>
                  Are you ready to move forward? If the Chariot shows up in your
                  reading, it is no time to start slacking. Congratulate
                  yourself for your hard work, but also continue riding the
                  wave...
                </p>
                {/* <img src="" alt="" /> */}
              </div>
              <div className="btn">Read more</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
