/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";
import React, { useState } from "react";
import { HeaderMenu } from "../../components/HeaderMenu";
import { FooterLinks } from "../../components/FooterLinks";
import { format, startOfWeek, endOfWeek, isThisWeek } from "date-fns";
import SeeOtherSigns from "../../components/SeeOtherSigns";
import { CalendarDaysIcon, MoonIcon, SunIcon, StarIcon } from "lucide-react";



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
    name ? `${process.env.NEXT_PUBLIC_API_URL}/weekly/${name}` : null,
    fetcher
  );

  const navigateToHomePage = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const renderWeeklyContent = () => {
    if (isLoading) {
      return <LoadingOverlay visible={isLoading} />;
    }
    if (error) {
      return <div>Error loading data.</div>;
    }
    if (!data || !data.data) {
      return null;
    }

    // Render the weekly horoscope content in a more readable format
    return <p>{data.data}</p>;
  };
  const capitalizedSign = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  const today = format(new Date(), "MMMM d, yyyy");
  const thisMonth = format(new Date(), "MMMM");
  const thisYear = format(new Date(), "yyyy");
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekRange = `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`;


  return (
    <main className="flex flex-col w-full items-center bg-[#14082b]">
      
      <HeaderMenu />
      
      {/*Hero Section*/}
      <div className="w-full max-w-4xl mx-auto mb-8">
              <div className="cosmic-card rounded-2xl mt-24 p-8 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-logo-yellow opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-cosmic-accent-1 opacity-20 blur-2xl"></div>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <StarIcon className="text-logo-yellow animate-sparkle" />
                  <h1 className="text-3xl font-bold text-[#FFBF3D]">{capitalizedSign} Weekly Horoscope</h1>
                  <StarIcon className="text-logo-yellow animate-sparkle" />
                </div>
                
                <p className="text-gray-400 mb-2">{capitalizedSign.dates}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CalendarDaysIcon className="w-5 h-5 text-cosmic-accent-2" />
                  <p className="text-cosmic-accent-2 font-medium">{weekRange}</p>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <MoonIcon className="w-8 h-8 text-blue-300 animate-pulse" />
                  <SunIcon className="w-10 h-10 text-logo-yellow animate-glow" />
                  <MoonIcon className="w-8 h-8 text-blue-300 animate-pulse" />
                </div>
              </div>
      </div>
          
      <div className="flex flex-col w-full md:w-3/5 items-start justify-center p-6">
          {renderWeeklyContent()}
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
            <div className="text-base font-semibold">Daily</div>
            <div className="text-sm text-gray-300">{today}</div>
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
          <SeeOtherSigns name={name}/>
        </div>
      <FooterLinks />
    </main>
  );
}
