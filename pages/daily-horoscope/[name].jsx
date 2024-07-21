/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoadingOverlay } from "@mantine/core";
import { Tabs, Tab, Box } from "@mui/material";
import React, { useState } from "react";
import { HeaderMenu } from "../../components/HeaderMenu";
import { FooterLinks } from "../../components/FooterLinks";

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
        return <div className="text-sm text-[#28164C]">{firstData}</div>;
      case 1:
        return <div className="text-sm text-[#28164C]">{secondData}</div>;
      case 2:
        return <div className="text-sm text-[#28164C]">{thirdData}</div>;
      default:
        return null;
    }
  };
  // const secondData = data?.data?.[1];
  const capitalizedSign = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  return (
    <main className="flex flex-col w-full bg-white items-center">
      <img
        src="/Frame 11.png"
        alt="background"
        className="z-[0] w-full absolute top-[-1%] left-[0] md:top-0 lg:top-[-10%] "
      />
      <img
        src="/Frame 10.png"
        alt="background"
        className="w-[50%] h-[40%] absolute left-[0] top-[60%] lg:top-[50%] "
      />
      <img
        src="/Frame 12.png"
        alt="background"
        className="w-[50%] h-[40%] absolute right-[0] top-[50%] lg:top-[60%] "
      />
      <div className="flex flex-col items-center z-10">
        <img
          src="/logo.png"
          alt="logo"
          className="mt-12 w-[60%] mb-4 cursor-pointer"
          onClick={navigateToHomePage} // Navigate to homepage on click
        />

        <div className="flex gap-4 mb-4">
          <a href="https://www.threads.net/@dailyastro.info">
            <img
              src="/arcticons_instagram-threads.svg"
              alt="threads"
              className="w-8"
            />
          </a>
          <a href="https://www.instagram.com/dailyastro.info/">
            <img src="/instagram icon.svg" alt="instagram" className="w-8" />
          </a>
          <a href="https://x.com/dailyastroinfo">
            <img src="/arcticons_x-twitter.svg" alt="twitter" className="w-8" />
          </a>
        </div>
      </div>
      <HeaderMenu />
      <div>
        <span className="sign-name text-lg md:text-xl lg:text-2xl font-normal">
          🌟 {capitalizedSign} Horoscope 🌟
        </span>
      </div>
      <div className="w-4/5 items-start">
        <div className="flex flex-col w-1/2 items-start justify-start">
          <div className="flex flex-col items-start justify-start">
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
        </div>
        <div className="flex flex-col w-4/5 items-start justify-start text-[#28164C]">
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-lg md:text-2xl lg:text-[32px]">
              More Horoscopes for {capitalizedSign}
            </h2>
            <div className="flex gap-4 flex-wrap">
              <div className="card">
                <div className="weekly">Weekly</div>
                <div className="text-sm mt-4">July 15-21</div>
              </div>

              <div className="card">
                <div className="monthly">Monthly</div>
                <div className="text-sm mt-4">July</div>
              </div>

              <div className="card">
                <div className="yearly">Yearly</div>
                <div className="text-sm mt-4">2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </main>
  );
}
