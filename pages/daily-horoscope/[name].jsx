/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";
import { Tabs, Tab, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { HeaderMenu } from "../../components/HeaderMenu";
import { FooterLinks } from "../../components/FooterLinks";
import { format, startOfWeek, endOfWeek } from "date-fns";
import PlanetPosition from "../../components/PlanetPosition";
import Energy from "../../components/Energy";
import SeeOtherSigns from "../../components/SeeOtherSigns";

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
});

// Helper functions
const getDateRange = (sign) => {
  const ranges = {
    aries: "Mar 21 – Apr 19",
    taurus: "Apr 20 – May 20",
    gemini: "May 21 – Jun 20",
    cancer: "Jun 21 – Jul 22",
    leo: "Jul 23 – Aug 22",
    virgo: "Aug 23 – Sep 22",
    libra: "Sep 23 – Oct 22",
    scorpio: "Oct 23 – Nov 21",
    sagittarius: "Nov 22 – Dec 21",
    capricorn: "Dec 22 – Jan 19",
    aquarius: "Jan 20 – Feb 18",
    pisces: "Feb 19 – Mar 20"
  };
  return ranges[sign.toLowerCase()] || "";
};

const getElement = (sign) => {
  const elements = {
    aries: "Fire", taurus: "Earth", gemini: "Air", cancer: "Water",
    leo: "Fire", virgo: "Earth", libra: "Air", scorpio: "Water",
    sagittarius: "Fire", capricorn: "Earth", aquarius: "Air", pisces: "Water"
  };
  return elements[sign.toLowerCase()] || "";
};

const getRuler = (sign) => {
  const rulers = {
    aries: "Mars", taurus: "Venus", gemini: "Mercury", cancer: "Moon",
    leo: "Sun", virgo: "Mercury", libra: "Venus", scorpio: "Pluto",
    sagittarius: "Jupiter", capricorn: "Saturn", aquarius: "Uranus", pisces: "Neptune"
  };
  return rulers[sign.toLowerCase()] || "";
};

const getSymbol = (sign) => {
  const symbols = {
    aries: "Ram", taurus: "Bull", gemini: "Twins", cancer: "Crab",
    leo: "Lion", virgo: "Virgin", libra: "Scales", scorpio: "Scorpion",
    sagittarius: "Archer", capricorn: "Goat", aquarius: "Water Bearer", pisces: "Fish"
  };
  return symbols[sign.toLowerCase()] || "";
};

export async function getStaticPaths() {
  const names = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];
  const paths = names.map((name) => ({ params: { name } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { name: params.name } };
}

export default function SignDetails({ name }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => { setIsMounted(true); }, []);

  const { data: todayData, error: todayError, isLoading: todayLoading } = useSWR(
    router.isReady ? `${process.env.NEXT_PUBLIC_API_URL}/daily/${name}/today` : null, fetcher
  );
  const { data: yesterdayData, error: yesterdayError, isLoading: yesterdayLoading } = useSWR(
    router.isReady ? `${process.env.NEXT_PUBLIC_API_URL}/daily/${name}/yesterday` : null, fetcher
  );
  const { data: tomorrowData, error: tomorrowError, isLoading: tomorrowLoading } = useSWR(
    router.isReady ? `${process.env.NEXT_PUBLIC_API_URL}/daily/${name}/tomorrow` : null, fetcher
  );

  const handleChange = (event, newValue) => setTabIndex(newValue);
  const navigateToHomePage = (e) => { e.preventDefault(); router.push("/"); };
  const today = format(new Date(), "MMMM d, yyyy");

  const cleanText = (text) => text?.replace(/Astroyogi/gi, "") || "";

  const renderContent = () => {
    if (todayLoading || yesterdayLoading || tomorrowLoading) return <LoadingOverlay visible={true} />;
    if (todayError || yesterdayError || tomorrowError) return <p className="text-red-500">Error loading data.</p>;

    const entries = [
      yesterdayData?.data, todayData?.data, tomorrowData?.data
    ];
    const labels = [ -86400000, 0, 86400000 ];

    const current = entries[tabIndex];
    if (!current) return <p>No data for this day.</p>;

    return (
      <div className="mt-4 w-full bg-white bg-opacity-5 rounded-xl p-6 text-white">
        <div className="text-sm text-gray-300 mb-3">
          {format(new Date(Date.now() + labels[tabIndex]), "MMMM d, yyyy")}
        </div>
        <p className="mb-6 text-base leading-relaxed">{cleanText(current.horoscope)}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {current.luckyColor && (
            <div className="bg-[#1f103f] border border-white/10 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Lucky Color</div>
              <div className="text-lg font-semibold">{current.luckyColor}</div>
            </div>
          )}
          {current.luckyNumber && (
            <div className="bg-[#1f103f] border border-white/10 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Lucky Number</div>
              <div className="text-lg font-semibold">{current.luckyNumber}</div>
            </div>
          )}
          {current.compatible && (
            <div className="bg-[#1f103f] border border-white/10 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Compatible With</div>
              <div className="text-lg font-semibold">{current.compatible}</div>
            </div>
          )}
        </div>
        <div className="mt-6">
          <Energy sign={name} tabIndex={tabIndex} />
        </div>
      </div>
    );
  };

  const capitalizedSign = name.charAt(0).toUpperCase() + name.slice(1);
  const thisMonth = format(new Date(), "MMMM");
  const thisYear = format(new Date(), "yyyy");
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekRange = `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`;

  if (!isMounted) return null;

  return (
    <main className="flex flex-col w-full items-center">
      

      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="stars"></div>
        <div className="sun"></div>
        <div className="moon"></div>
        <div className="star"></div>
        <div className="bolide"></div>
      </div>

      <HeaderMenu />

      {/* Header Section */}
      <div className="w-full flex justify-center px-4 mt-24">
        <div className="w-full md:w-3/5 bg-white bg-opacity-5 p-6 rounded-xl flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center text-white text-sm font-semibold border-4 border-white/20">
            {name.toLowerCase()}
          </div>
          <div className="flex flex-col text-white">
            <h2 className="text-2xl md:text-3xl font-bold">{capitalizedSign} Horoscope</h2>
            <div className="text-sm md:text-base text-gray-300">
              {getDateRange(name)}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-[#1f103f] border border-white/10 text-sm px-3 py-1 rounded-full">
                <span className="text-gray-400">Element: </span><span className="text-white font-semibold">{getElement(name)}</span>
              </div>
              <div className="bg-[#1f103f] border border-white/10 text-sm px-3 py-1 rounded-full">
                <span className="text-gray-400">Ruler: </span><span className="text-white font-semibold">{getRuler(name)}</span>
              </div>
              <div className="bg-[#1f103f] border border-white/10 text-sm px-3 py-1 rounded-full">
                <span className="text-gray-400">Symbol: </span><span className="text-white font-semibold">{getSymbol(name)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Daily Content */}
      <div className="flex w-full items-start justify-center p-6">
        <div className="flex flex-col w-full md:w-3/5 items-start justify-center text-justify">
          <Box sx={{ width: "100%" }}>
            <Tabs value={tabIndex} onChange={handleChange} centered>
              <Tab label="Yesterday" sx={{ color: "#e1e1e1" }} />
              <Tab label="Today" sx={{ color: "#e1e1e1" }} />
              <Tab label="Tomorrow" sx={{ color: "#e1e1e1" }} />
            </Tabs>
          </Box>
          {renderContent()}
        </div>
      </div>

      {/* Additional Horoscopes */}
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5 p-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-6">
          Explore Future Readings
        </h2>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-white">
          <div
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center hover:bg-white/10 transition-all"
            onClick={() => router.push(`/weekly-horoscope/${name}`)}
          >
            <div className="text-base font-semibold">Weekly</div>
            <div className="text-sm text-gray-300">{weekRange}</div>
          </div>

          <div
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center hover:bg-white/10 transition-all"
            onClick={() => router.push(`/monthly-horoscope/${name}`)}
          >
            <div className="text-base font-semibold">Monthly</div>
            <div className="text-sm text-gray-300">{thisMonth}</div>
          </div>

          <div
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center hover:bg-white/10 transition-all"
            // onClick={() => router.push(`/yearly-overview/${name}`)}
          >
            <div className="text-base font-semibold">Yearly</div>
            <div className="text-sm text-gray-300">{thisYear}</div>
          </div>

          <div
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center hover:bg-white/10 transition-all"
            onClick={() => router.push(`/love/${name}`)}
          >
            <div className="text-base font-semibold">Love</div>
            <div className="text-sm text-gray-300">{thisMonth}</div>
          </div>

          <div
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center hover:bg-white/10 transition-all"
            onClick={() => router.push(`/career/${name}`)}
          >
            <div className="text-base font-semibold">Career</div>
            <div className="text-sm text-gray-300">Horoscope</div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-3/5 items-center p-6">
        <SeeOtherSigns name={name} />
      </div>
      <FooterLinks />
    </main>
  );
}
