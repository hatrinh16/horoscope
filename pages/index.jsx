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
    <main className="flex flex-col w-full bg-white items-center">
      <GoogleAnalytics gaId="G-CJL0S39WM9" />

      <img
        src="/Frame 11.png"
        alt="background"
        className="z-[0] w-full absolute top-[-1%] left-[0] md:top-0 lg:top-[-10%] "
      />
      <img
        src="/Frame 10.png"
        alt="background"
        className="w-[50%] h-[40%] absolute left-[0] top-[60%] lg:top-[50%] "
      />
      <img
        src="/Frame 12.png"
        alt="background"
        className="w-[50%] h-[40%] absolute right-[0] top-[50%] lg:top-[60%] "
      />
      {/* logo */}
      <div className="flex flex-col items-center z-10">
        <img
          src="/logo.png"
          alt="logo"
          className="mt-12 w-[60%] mb-4 cursor-pointer"
        />
        <div className="flex gap-4 mb-4">
          <a href="https://www.threads.net/@dailyastro.info">
            <img
              src="/arcticons_instagram-threads.svg"
              alt="threads"
              className="w-8"
            />
          </a>
          <a href="https://www.instagram.com/dailyastro.info/">
            <img src="/instagram icon.svg" alt="instagram" className="w-8" />
          </a>
          <a href="https://x.com/dailyastroinfo">
            <img src="/arcticons_x-twitter.svg" alt="twitter" className="w-8" />
          </a>
        </div>
      </div>

      <HeaderMenu />
      <div className="flex flex-col justify-center items-center">
        <span className="text-lg md:text-xl lg:text-2xl text-[#E493B3] font-normal">
          🌟 Your Celestial Guide to the Stars! 🌟
        </span>
        <div className="w-3/5 text-center">
          <span className="text-lg md:text-xl lg:text-2xl text-[#E493B3] font-normal">
            Tap into the cosmic energy and draw inspiration from the celestial
            wisdom that molds your destiny.
          </span>
        </div>
      </div>

      {/* Daily horoscope */}
      <div className="flex flex-row w-4/5 mt-20 items-start text-[#28164C] justify-center z-10">
        <div className="w-full lg:w-[75%] p-4">
          <h2 className="text-lg md:text-2xl lg:text-[32px] text-center">
            Daily Horoscopes
          </h2>
          <div className="flex items-center mt-6 justify-center gap-4 h-auto flex-wrap">
            {renderAstrologyCard()}
          </div>
        </div>
      </div>

      {/* More horoscope */}
      <div className="flex flex-row w-4/5 items-start justify-center text-[#28164C] mb-8">
        <div className="w-full p-4">
          <h2 className="text-lg md:text-2xl lg:text-[32px] text-center">
            More Horoscopes
          </h2>
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="card">
              <div className="monthly">Monthly Horoscope</div>
            </div>

            <div className="card">
              <div className="yearly">2024 Horoscope</div>
            </div>

            <div className="card">
              <div className="work">Work Horoscope</div>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </main>
  );
}
