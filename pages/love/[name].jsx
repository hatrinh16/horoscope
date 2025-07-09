/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";
import React, { useState } from "react";
import { HeaderMenu } from "../../components/HeaderMenu";
import { FooterLinks } from "../../components/FooterLinks";
import { format, startOfWeek, endOfWeek } from "date-fns";
import SeeOtherSigns from "../../components/SeeOtherSigns";
import ZodiacCalendar from "../../components/Calendar";

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
    name ? `${process.env.NEXT_PUBLIC_API_URL}/love/${name}` : null,
    fetcher
  );

  const navigateToHomePage = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const renderLoveContent = () => {
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
  const thisMonth = format(new Date(), "MMMM");
  const thisYear = format(new Date(), "yyyy");

  return (
    <main className="flex flex-col w-full items-center bg-[#14082b]">
      
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="stars"></div>
        <div className="sun"></div>
        <div className="moon"></div>
        <div className="star"></div>
        <div className="bolide"></div>
      </div>
      <HeaderMenu />
      <div className="mt-24">
        <span className="sign-name text-lg md:text-xl lg:text-2xl font-normal">
          🌟 {capitalizedSign} Horoscope 🌟
        </span>
      </div>
      <div className="w-full md:w-3/5 justify-center items-start p-6">
        <div className="flex flex-row w-full items-start justify-between">
          <div className="flex flex-col items-start justify-start text-justify">
            <h2 className="text-lg md:text-2xl lg:text-3xl">
            Monthly Love Horoscope
            </h2>
            {renderLoveContent()}
          </div>
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
                <div className="font-semibold">Daily</div>
                <div className="text-sm">{today}</div>
              </div>

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
                // onClick={() => router.push(`/yearly-overview/${name}`)}
              >
                <div className="font-semibold">Yearly</div>
                <div className="text-sm">{thisYear}</div>
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
