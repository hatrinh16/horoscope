/* eslint-disable @next/next/no-img-element */
import { AppContext } from "../components/AppContext";
import { useContext } from "react";
import AstrologyCard from "../components/AstrologyCard"; // Fixed import path
import { GoogleAnalytics } from "@next/third-parties/google";
import { HeaderMenu } from "../components/HeaderMenu";
import { FooterLinks } from "../components/FooterLinks";
import Header from "../components/Header";
import { CardOfTheDay } from "../components/CardOfTheDay";
import HoroscopeLinks from "../components/MoreHoroscopes";
import { useState } from "react";
import ZodiacWheel from "../components/ZodiacWheel";

const starSign = [
  { sign: "aries", element: "Fire", image: "/aries.png", start: "03-21", end: "04-19" },
  { sign: "taurus", element: "Earth", image: "/taurus.png", start: "04-20", end: "05-20" },
  { sign: "gemini", element: "Air", image: "/gemini.png", start: "05-21", end: "06-21" },
  { sign: "cancer", element: "Water", image: "/cancer.png", start: "06-22", end: "07-22" },
  { sign: "leo", element: "Fire", image: "/leo.png", start: "07-23", end: "08-22" },
  { sign: "virgo", element: "Earth", image: "/virgo.png", start: "08-23", end: "09-22" },
  { sign: "libra", element: "Air", image: "/libra.png", start: "09-23", end: "10-23" },
  { sign: "scorpio", element: "Water", image: "/scorpio.png", start: "10-24", end: "11-22" },
  { sign: "sagittarius", element: "Fire", image: "/sagittarus.png", start: "11-23", end: "12-21" },
  { sign: "capricorn", element: "Earth", image: "/capricorn.png", start: "12-22", end: "01-19" },
  { sign: "aquarius", element: "Air", image: "/aquarius.png", start: "01-20", end: "02-18" },
  { sign: "pisces", element: "Water", image: "/pisces.png", start: "02-19", end: "03-20" },
];

export default function IndexPage() {
  const [activeSign, setActiveSign] = useState(null);
  const date = useContext(AppContext);
  const sign = getSign();

  function renderAstrologyCard() {
    return starSign.map((item, index) => (
      <AstrologyCard key={index} sign={item.sign} img={item.image} horoscope={item.data} />
    ));
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
    <main className="flex flex-col w-full items-center bg-[#14082b]">
       
      <HeaderMenu />

      {/* Zodiac Wheel Section */}
      <ZodiacWheel starSign={starSign} />

      {/* Choose sign */}
      <Header selectedSign={sign} />
      <CardOfTheDay />

      {/* More horoscope */}
      <div className="flex flex-col w-full lg:w-5/6 items-center justify-center mb-4">
        <div className="flex flex-col w-full lg:w-5/6 items-center p-4">
          <HoroscopeLinks />
        </div>
      </div>
      <FooterLinks />
    </main>
  );
}
