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

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SignDetails() {
  const router = useRouter();
  const { name } = router.query;
  console.log(router.query.name);
  const { data, error, isLoading } = useSWR(
    name ? `${process.env.NEXT_PUBLIC_API_URL}/daily/${name}` : null,
    fetcher
  );

  const [tabIndex, setTabIndex] = useState(0);
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
    if (!data) {
      return null;
    }
    const cleanText = (text) => {
      return text ? text.replace(/Astroyogi/gi, "") : "";
    };

    const firstData = cleanText(data.data[0]);
    const secondData = cleanText(data.data[1]);
    const thirdData = cleanText(data.data[2]);

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
    <main className="flex flex-col w-full bg-white items-center">
      <div className="flex flex-col items-center z-10">
        <img
          src="/logo.png"
          alt="logo"
          className="mt-12 w-[60%] mb-4 cursor-pointer"
          onClick={navigateToHomePage} // Navigate to homepage on click
        />
      </div>
      <HeaderMenu />
      <div>
        <span className="sign-name text-lg md:text-xl lg:text-2xl font-normal">
          🌟 {capitalizedSign} Horoscope 🌟
        </span>
      </div>
      <div className="w-4/5 items-start">
        <div className="flex flex-row gap-32 w-full items-start justify-start  text-[#212121]">
          <div className="flex flex-col w-full lg:w-[50%] items-start justify-start text-justify">
            <h2 className="text-lg md:text-2xl lg:text-[32px]">
              Daily Horoscope
            </h2>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <Tabs value={tabIndex} onChange={handleChange} started>
                <Tab label="Yesterday" />
                <Tab label="Today" />
                <Tab label="Tomorrow" />
              </Tabs>
            </Box>
            {renderContent()}
          </div>
          <div className="flex flex-col items-start justify-start text-justify">
            <h2 className="text-lg md:text-2xl lg:text-[32px] whitespace-nowrap">
              Planet Positions
            </h2>
            <PlanetPosition />
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-4/5 items-start justify-start text-[#212121]">
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-lg md:text-2xl lg:text-[32px]">
              More Horoscopes for {capitalizedSign}
            </h2>
            <div className="flex gap-4 flex-wrap">
              <div
                className="card cursor-pointer btn"
                onClick={() => router.push(`/weekly-horoscope/${name}`)}
              >
                <div className="weekly">Weekly</div>
                <div className="text-sm">{weekRange}</div>
              </div>

              <div className="card btn">
                <div className="monthly">Monthly</div>
                <div className="text-sm">{thisMonth}</div>
              </div>

              <div className="card btn">
                <div className="yearly">Yearly</div>
                <div className="text-sm">{thisYear}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </main>
  );
}
