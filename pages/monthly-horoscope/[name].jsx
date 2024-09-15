/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";
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
    name ? `${process.env.NEXT_PUBLIC_API_URL}/monthly/${name}` : null,
    fetcher
  );

  const navigateToHomePage = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const renderMonthlyContent = () => {
    if (isLoading) {
      return <LoadingOverlay visible={isLoading} />;
    }
    if (error) {
      return <div>Error loading data.</div>;
    }
    if (!data || !data.data) {
      return null;
    }

    return data.data.map((paragraph, index) => (
      <p key={index} className="mb-1">
        {paragraph}
      </p>
    ));
  };
  const capitalizedSign = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  const today = format(new Date(), "MMMM d, yyyy");
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekRange = `${format(startDate, "MMM d")} - ${format(
    endDate,
    "MMM d"
  )}`;
  const thisYear = format(new Date(), "yyyy");

  return (
    <main className="flex flex-col w-full bg-white items-center">
      <div className="flex flex-col items-center z-10">
        <img
          src="/logo.png"
          alt="logo"
          className="mt-12 w-[60%] mb-4 cursor-pointer"
          onClick={navigateToHomePage}
        />
      </div>
      <HeaderMenu />
      <div>
        <span className="sign-name text-lg md:text-xl lg:text-2xl font-normal">
          🌟 {capitalizedSign} Horoscope 🌟
        </span>
      </div>
      <div className="w-4/5 items-start  text-[#212121]">
        <div className="flex flex-row w-full items-start justify-between">
          <div className="flex flex-col lg:w-[60%] items-start justify-start text-justify">
            <h2 className="text-lg md:text-2xl lg:text-[32px]">
              Monthly Horoscope
            </h2>
            {renderMonthlyContent()}
          </div>
          <div className="flex flex-col items-start justify-start text-justify">
            <h2 className="text-lg md:text-2xl lg:text-[32px] whitespace-nowrap">
              Planet Positions
            </h2>
            <PlanetPosition />
          </div>
        </div>
        <div className="flex flex-col w-full items-start justify-between text-[#212121] mt-10">
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-lg md:text-2xl lg:text-[32px]">
              More Horoscopes for {capitalizedSign}
            </h2>
            <div className="flex gap-4 flex-wrap">
              <div
                className="card cursor-pointer btn"
                onClick={() => router.push(`/daily-horoscope/${name}`)}
              >
                <div className="daily">Daily</div>
                <div className="text-sm">{today}</div>
              </div>
              <div
                className="card btn"
                onClick={() => router.push(`/weekly-horoscope/${name}`)}
              >
                <div className="monthly">Weekly</div>
                <div className="text-sm">{weekRange}</div>
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
        </div>
      </div>
      <FooterLinks />
    </main>
  );
}