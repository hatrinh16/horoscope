/* eslint-disable @next/next/no-img-element */
import { AppContext } from "../components/AppContext";
import { useContext } from "react";
import AstrologyCard from "../components/AstrologyCard";
import { GoogleAnalytics } from "@next/third-parties/google";

// import Header from "../components/Header";
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
import { HeaderMenu } from "../components/HeaderMenu";
import { FooterLinks } from "../components/FooterLinks";
import Header from "../components/Header";

const starSign = [
  {
    sign: "aries",
    image: "/aries.png",
    start: "03-21",
    end: "04-19",
  },
  {
    sign: "taurus",
    image: "/taurus.png",
    start: "04-20",
    end: "05-20",
  },
  {
    sign: "gemini",
    image: "/gemini.png",
    start: "05-21",
    end: "06-21",
  },
  {
    sign: "cancer",
    image: "/cancer.png",
    start: "06-22",
    end: "07-22",
  },
  {
    sign: "leo",
    image: "/leo.png",
    start: "07-23",
    end: "08-22",
  },
  {
    sign: "virgo",
    image: "/virgo.png",
    start: "08-23",
    end: "09-22",
  },
  {
    sign: "libra",
    image: "/libra.png",
    start: "09-23",
    end: "10-23",
  },
  {
    sign: "scorpio",
    image: "/scorpio.png",
    start: "10-24",
    end: "11-22",
  },
  {
    sign: "sagittarius",
    image: "/sagittarus.png",
    start: "11-23",
    end: "12-21",
  },
  {
    sign: "capricorn",
    image: "/capricorn.png",
    start: "12-22",
    end: "01-19",
  },
  {
    sign: "aquarius",
    image: "/aquarius.png",
    start: "01-20",
    end: "02-18",
  },
  {
    sign: "pisces",
    image: "/pisces.png",
    start: "02-19",
    end: "03-20",
  },
];

export default function IndexPage() {
  const date = useContext(AppContext);

  function renderAstrologyCard() {
    if (date) {
      const sign = getSign();
      return <AstrologyCard sign={sign.sign} img={sign.image} />;
    }
    let list = [];
    starSign.forEach((item, index) => {
      list.push(
        <AstrologyCard
          key={index}
          sign={item.sign}
          img={item.image}
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
    <main className="flex flex-col w-full bg-white items-center">
      <GoogleAnalytics gaId="G-CJL0S39WM9" />

      {/* logo */}
      <div className="flex flex-col items-center z-10">
        <img
          src="/logo.png"
          alt="logo"
          className="mt-12 w-[60%] mb-4 cursor-pointer"
        />
      </div>

      <HeaderMenu />

      {/* Choose sign */}
      {/* <Header /> */}

      {/* Daily horoscope */}
      <div className="flex flex-row w-full lg:w-4/5 mt-4 items-start text-[#212121] justify-center z-10">
        <div className="w-full lg:w-[75%] p-4">
          <h2 className="text-lg md:text-2xl lg:text-[32px] text-center">
            Daily Horoscopes.
          </h2>
          <div className="flex items-center mt-6 justify-center gap-4 h-auto flex-wrap">
            {renderAstrologyCard()}
          </div>
        </div>
      </div>

      {/* More horoscope */}
      <div className="flex flex-row w-4/5 items-start justify-center text-[#212121] mb-8">
        <div className="w-full p-4">
          <h2 className="text-lg md:text-2xl lg:text-[32px] text-center">
            More Horoscopes
          </h2>
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="card btn">
              <div className="monthly">Monthly Horoscope</div>
            </div>

            <div className="card btn">
              <div className="yearly">2024 Horoscope</div>
            </div>

            <div className="card btn">
              <div className="work">Work Horoscope</div>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </main>
  );
}
