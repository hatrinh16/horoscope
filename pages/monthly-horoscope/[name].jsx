/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";
import React, { useState } from "react";
import { HeaderMenu } from "../../components/HeaderMenu";
import { FooterLinks } from "../../components/FooterLinks";
import { format, startOfWeek, endOfWeek, isThisWeek } from "date-fns";
import SeeOtherSigns from "../../components/SeeOtherSigns";
import ZodiacCalendar from "../../components/Calendar";
import { TrendingUp, CalendarDaysIcon, MoonIcon, SunIcon, StarIcon } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());
export async function getStaticPaths() {
  // List all valid `name` values here
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

export default function SignDetails({name}) {
  const router = useRouter();
  // const { name } = router.query;

  // console.log(router.query.name);
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

   // Split the string into paragraphs based on newlines
  const paragraphs = data.data
    .split("\n")
    .map((p) => p.trim())
    .filter(
      (p) =>
        p.length > 0 &&
        !p.toLowerCase().startsWith("overview for this month")
    );

  return paragraphs.map((paragraph, index) => (
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
  const thisMonth = format(new Date(), "MMMM");
  const thisYear = format(new Date(), "yyyy");

  return (
    <main className="flex flex-col w-full items-center  bg-[#14082b]">
      
      <HeaderMenu />
      
      {/* Hero Section */}
<div className="w-full max-w-4xl mx-auto px-4 md:px-6 mt-24 space-y-6">
    {/* Header Box */}
  <div className=" bg-white bg-opacity-5 rounded-3xl px-6 py-8 text-center text-white shadow-inner backdrop-blur relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-logo-yellow opacity-20 blur-2xl" />
    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-cosmic-accent-1 opacity-20 blur-2xl" />

    <div className="flex justify-center items-center gap-2 text-xl md:text-2xl font-bold text-logo-yellow">
      <MoonIcon className="w-5 h-5" />
      <h1 className="text-3xl font-bold text-[#FFBF3D]">{capitalizedSign} Monthly Horoscope</h1>
      <SunIcon className="w-5 h-5" />
    </div>

    <div className="flex justify-center items-center gap-2 text-base mt-3 font-medium text-white">
      <CalendarDaysIcon className="w-5 h-5" />
      {thisMonth} {thisYear}
    </div>
  </div>

  {/* Tabs */}
  <div className="bg-[#1b1033] border border-white/10 rounded-3xl px-4 py-4 shadow-inner backdrop-blur">
    <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 text-white text-sm font-medium">
      <button className="flex items-center gap-2 bg-[#FFBF3D] text-black rounded-full px-4 py-2">
        <StarIcon className="w-4 h-4" /> Monthly Overview
      </button>
      <button className="flex items-center gap-2 hover:opacity-90 rounded-full px-4 py-2">
        <MoonIcon className="w-4 h-4" /> Moon Phases
      </button>
      <button className="flex items-center gap-2 hover:opacity-90 rounded-full px-4 py-2">
        <TrendingUp className="w-4 h-4" /> Life Themes
      </button>
      <button className="flex items-center gap-2 hover:opacity-90 rounded-full px-4 py-2">
        <StarIcon className="w-4 h-4" /> Cosmic Guidance
      </button>
    </div>
  </div>
</div>

      <div className="w-full md:w-3/5 justify-center items-start p-6">
        <div className="flex flex-row w-full items-start justify-between">
          <div className="flex flex-col items-start justify-start text-justify">
            {renderMonthlyContent()}
          </div>
        </div>
        <div className="flex flex-col w-full items-center justify-between mt-10">
            <h2 className="text-lg md:text-2xl lg:text-3xl">
              Explore Future Readings for {capitalizedSign}
            </h2>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-white">

              <div
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center hover:bg-white/10 transition-all"
                onClick={() => router.push(`/daily-horoscope/${name}`)}
              >
                <div className="text-base font-semibold">Daily</div>
                <div className="text-sm text-gray-300">{today}</div>
              </div>

              <div
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center hover:bg-white/10 transition-all"
                onClick={() => router.push(`/weekly-horoscope/${name}`)}
              >
                <div className="text-base font-semibold">Weekly</div>
                <div className="text-sm text-gray-300">{weekRange}</div>
              </div>

              <div
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center hover:bg-white/10 transition-all"
                onClick={() => router.push(`/yearly-overview/${name}`)}
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
        
      </div>
      <div className="w-full lg:w-3/5 items-center p-6">
          <SeeOtherSigns name={name}/>
          </div>
      <FooterLinks />
    </main>
  );
}
