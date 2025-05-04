/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";
import { Tabs, Tab, Box } from "@mui/material";
import React, { useState, useEffect  } from "react";
import { HeaderMenu } from "../../components/HeaderMenu";
import { FooterLinks } from "../../components/FooterLinks";
import { format, startOfWeek, endOfWeek } from "date-fns";
import PlanetPosition from "../../components/PlanetPosition";
import Energy from "../../components/Energy";
import SeeOtherSigns from "../../components/SeeOtherSigns";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getStaticPaths() {
  const names = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
  ];

  const paths = names.map((name) => ({
    params: { name },
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      name: params.name,
    },
  };
}

export default function SignDetails({ name }) {
  const router = useRouter();
  
  const [isMounted, setIsMounted] = useState(false);

  // Using useEffect to ensure this code only runs on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: todayData, error: todayError, isLoading: todayLoading } = useSWR(
    router.isReady ? `${process.env.NEXT_PUBLIC_API_URL}/daily/${name}/today` : null,
    fetcher
  );
  const { data: yesterdayData, error: yesterdayError, isLoading: yesterdayLoading } = useSWR(
    router.isReady ? `${process.env.NEXT_PUBLIC_API_URL}/daily/${name}/yesterday` : null,
    fetcher
  );
  const { data: tomorrowData, error: tomorrowError, isLoading: tomorrowLoading } = useSWR(
    router.isReady ? `${process.env.NEXT_PUBLIC_API_URL}/daily/${name}/tomorrow` : null,
    fetcher
  );

  const [tabIndex, setTabIndex] = useState(1);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const navigateToHomePage = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const renderContent = () => {
    if (todayLoading || yesterdayLoading || tomorrowLoading) {
      return <LoadingOverlay visible={true} />;
    }
    if (todayError || yesterdayError || tomorrowError) {
      return <div>Error loading data.</div>;
    }
   
    const cleanText = (text) => {
      return text ? text.replace(/Astroyogi/gi, "") : "";
    };

    const todayLuckyColor = todayData?.data?.luckyColor;
    const yesterdayLuckyColor = yesterdayData?.data?.luckyColor;
    const tomorrowLuckyColor = tomorrowData?.data?.luckyColor;

    switch (tabIndex) {
      case 0:
        return (
          <div>
            <div>{yesterdayData ? cleanText(yesterdayData.data.horoscope) : "No data for yesterday."}</div>
            {yesterdayLuckyColor && (
              <div>
                <strong>Lucky Color for Yesterday:</strong> {yesterdayLuckyColor}
              </div>
            )}
            <Energy sign={name} tabIndex={tabIndex} />
          </div>
        );
        
      case 1:
        return (
          <div>
            <div>{todayData ? cleanText(todayData.data.horoscope) : "No data for today."}</div>
            {todayLuckyColor && (
              <div>
                <strong>Lucky Color for Today:</strong> {todayLuckyColor}
              </div>
            )}
            <Energy sign={name} tabIndex={tabIndex} />
          </div>
        );
        
      case 2:
        return (
          <div>
            <div>{tomorrowData ? cleanText(tomorrowData.data.horoscope) : "No data for tomorrow."}</div>
            {tomorrowLuckyColor && (
              <div>
                <strong>Lucky Color for Tomorrow:</strong> {tomorrowLuckyColor}
              </div>
            )}
            <Energy sign={name} tabIndex={tabIndex} />
          </div>
        );
        
      default:
        return null;
    }
  };

  const capitalizedSign = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  const thisMonth = format(new Date(), "MMMM");
  const thisYear = format(new Date(), "yyyy");
  const today = format(new Date(), "MMMM d, yyyy");
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekRange = `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`;

  // Only render the content after the component has mounted to avoid hydration errors
  if (!isMounted) {
    return null; // This ensures the component doesn't render until mounted
  }

  return (
    <main className="flex flex-col w-full items-center">
      <div className="flex flex-col items-center z-10">
        <img
          src="/logo.png"
          alt="logo"
          className="mt-12 w-[60%] mb-4 cursor-pointer"
          onClick={navigateToHomePage} // Navigate to homepage on click
        />
      </div>
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="stars"></div>
        <div className="sun"></div>
        <div className="moon"></div>
        <div className="star"></div>
        <div className="bolide"></div>
      </div>
      <HeaderMenu />
      <div>
        <span className="sign-name text-lg md:text-xl lg:text-2xl font-normal">
          🌟 {capitalizedSign} Horoscope 🌟
        </span>
      </div>
  
      <div className="flex w-full items-start justify-center p-6">
          <div className="flex flex-col w-full md:w-3/5 items-start justify-center text-justify">
            <h2 className="text-lg md:text-2xl lg:text-3xl">
              Daily Horoscope
            </h2>
            <div className="text-md italic">Today - {today}</div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Tabs value={tabIndex} onChange={handleChange} started>
                <Tab label="Yesterday" sx={{ color: "#e1e1e1" }} />
                <Tab label="Today" sx={{ color: "#e1e1e1" }} />
                <Tab label="Tomorrow" sx={{ color: "#e1e1e1" }} />
              </Tabs>
            </Box>
            {renderContent()}
          </div>
        </div>
    
          <div className="flex flex-col items-start justify-center w-full lg:w-3/5 p-6">
            <h2 className="text-lg md:text-2xl lg:text-3xl">
              More Horoscopes for {capitalizedSign}
            </h2>
            
            <div className="mt-8 w-full bg-white bg-opacity-5 rounded p-8">

            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded cursor-pointer border-solid border border-[#6c757d] p-4  hover:bg-white hover:bg-opacity-5 transition-all"
                onClick={() => router.push(`/weekly-horoscope/${name}`)}
              >
                <div className="font-semibold">Weekly</div>
                <div className="text-sm">{weekRange}</div>
              </div>

              <div
                className="rounded cursor-pointer border-solid border border-[#6c757d] p-4  hover:bg-white hover:bg-opacity-5 transition-all"
                onClick={() => router.push(`/monthly-horoscope/${name}`)}
              >
                <div className="font-semibold">Monthly</div>
                <div className="text-sm">{thisMonth}</div>
              </div>

              <div
                className="rounded cursor-pointer border-solid border border-[#6c757d] p-4  hover:bg-white hover:bg-opacity-5 transition-all"
                onClick={() => router.push(`/yearly-overview/${name}`)}
              >
                <div className="font-semibold">Yearly</div>
                <div className="text-sm">{thisYear}</div>
              </div>

              <div
                className="rounded cursor-pointer border-solid border border-[#6c757d] p-4  hover:bg-white hover:bg-opacity-5 transition-all"
                onClick={() => router.push(`/love/${name}`)}
              >
                <div className="font-semibold">{capitalizedSign} Love</div>
                <div className="text-sm">{thisMonth}</div>
              </div>

              <div
                className="rounded cursor-pointer border-solid border border-[#6c757d] p-4 hover:bg-white hover:bg-opacity-5 transition-all"
                onClick={() => router.push(`/career/${name}`)}
              >
                <div className="font-semibold">{capitalizedSign} Career</div>
                <div className="text-sm">Horoscope</div>
              </div>
            </div>
          </div>

          </div>
          <div className="w-full lg:w-3/5 items-center p-6">
          <SeeOtherSigns name={name}/>
          </div>
      <FooterLinks />
    </main>
  );
}
