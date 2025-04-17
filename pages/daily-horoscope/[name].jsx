/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";
import { Tabs, Tab, Box } from "@mui/material";
import React, { useState } from "react";
import { HeaderMenu } from "../../components/HeaderMenu";
import { FooterLinks } from "../../components/FooterLinks";
import { format, startOfWeek, endOfWeek } from "date-fns";
import PlanetPosition from "../../components/PlanetPosition";
import Energy from "../../components/Energy";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SignDetails() {
  const router = useRouter();
  const { name } = router.query;
  console.log(router.query.name);
  const { data, error, isLoading } = useSWR(
    name ? `${process.env.NEXT_PUBLIC_API_URL}/daily/${name}` : null,
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
    if (isLoading) {
      return <LoadingOverlay visible={isLoading} />;
    }
    if (error) {
      return <div>Error loading data.</div>;
    }
    // if (!data) {
    //   return null;
    // }
    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      return null;
    }
    const cleanText = (text) => {
      return text ? text.replace(/Astroyogi/gi, "") : "";
    };

    const firstData = cleanText(data.data[0] || "");
    const secondData = cleanText(data.data[1] || "");
    const thirdData = cleanText(data.data[2] || "");

    switch (tabIndex) {
      case 0:
        return <div>{firstData}</div>;
      case 1:
        return <div>{secondData}</div>;
      case 2:
        return <div>{thirdData}</div>;
      default:
        return null;
    }
  };
  // const secondData = data?.data?.[1];
  const capitalizedSign = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  const thisMonth = format(new Date(), "MMMM");
  const thisYear = format(new Date(), "yyyy");

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekRange = `${format(startDate, "MMM d")} - ${format(
    endDate,
    "MMM d"
  )}`;

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
  
      <div className="flex w-full md:w3/5 items-start justify-center p-6">
          <div className="flex flex-col w-full md:w-3/5 items-start justify-center text-justify">
            <h2 className="text-lg md:text-2xl lg:text-3xl">
              Daily Horoscope
            </h2>
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
        <div className="w-full lg:w-3/5 items-center mt-8 lg:mt-24 p-6">
          <div className="flex flex-col w-full items-start justify-start rounded  bg-white bg-opacity-10 p-8">
            <Energy />
          </div>
        </div>
    
          <div className="flex flex-col items-start justify-center w-full lg:w-3/5 p-6">
            <h2 className="text-lg md:text-2xl lg:text-3xl">
              More Horoscopes for {capitalizedSign}
            </h2>
            <div className="flex gap-4 flex-wrap justify-start mt-4">
              <div
                className="card cursor-pointer btn"
                onClick={() => router.push(`/weekly-horoscope/${name}`)}
              >
                <div className="weekly">Weekly</div>
                <div className="text-sm">{weekRange}</div>
              </div>

              <div
                className="card btn"
                onClick={() => router.push(`/monthly-horoscope/${name}`)}
              >
                <div className="monthly">Monthly</div>
                <div className="text-sm">{thisMonth}</div>
              </div>

              <div
                className="card btn"
                onClick={() => router.push(`/yearly-overview/${name}`)}
              >
                <div className="yearly">Yearly</div>
                <div className="text-sm">{thisYear}</div>
              </div>
            </div>
          </div>
      <FooterLinks />
    </main>
  );
}
