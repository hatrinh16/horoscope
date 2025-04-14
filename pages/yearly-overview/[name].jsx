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
    name ? `${process.env.NEXT_PUBLIC_API_URL}/annual/${name}` : null,
    fetcher
  );

  const navigateToHomePage = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const renderYearlyContent = () => {
    if (isLoading) {
      return <LoadingOverlay visible={isLoading} />;
    }
    if (error) {
      return <div>Error loading data.</div>;
    }
    if (!data || !data.data) {
      return null;
    }

    const paragraphs = data.data[0].split(
      /\r\n\r\n\r\n\n\n\r\n| \r\n\n\n\r\n|\r\n/
    );

    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-0">
        {paragraph.split(/(Love|Money|Business)/g).map((part, idx) => {
          if (["Love", "Money", "Business"].includes(part)) {
            return <strong key={idx}>{part}</strong>; // Make these specific words bold
          }
          return <span key={idx}>{part}</span>; // Leave the rest of the text unchanged
        })}
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
  const thisMonth = format(new Date(), "MMMM");
  const thisYear = format(new Date(), "yyyy");

  return (
    <main className="flex flex-col w-full items-center">
      <div className="flex flex-col items-center z-10">
        <img
          src="/logo.png"
          alt="logo"
          className="mt-12 w-[60%] mb-4 cursor-pointer"
          onClick={navigateToHomePage}
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
      <div className="w-full md:w-3/5 justify-center items-start ">
        <div className="flex flex-row w-full items-start justify-between">
          <div className="flex flex-col items-start justify-start text-justify p-6">
            <h2 className="text-lg md:text-2xl lg:text-3xl">
              2025 Horoscope
            </h2>
            {renderYearlyContent()}
          </div>
        </div>
        <div className="flex flex-col w-full items-start justify-between mt-10 p-6">
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-lg md:text-2xl lg:text-3xl">
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
                onClick={() => router.push(`/monthly-horoscope/${name}`)}
              >
                <div className="yearly">Monthly</div>
                <div className="text-sm">{thisMonth}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </main>
  );
}
