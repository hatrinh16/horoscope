import AstrologyCard from "./AstrologyCard";
import { useState } from "react";
import { useRouter } from "next/router";
import { SparklesIcon, MoonIcon, SunIcon } from "lucide-react";

export default function ZodiacWheel({ starSign }) {
  const [activeSign, setActiveSign] = useState(null);
  const router = useRouter();

  return (
    <div className="m-6 lg:m-24 text-left">
     {/* Hero Section */}
     <div className="w-full max-w-4xl rounded-xl shadow-lg mt-24 relative overflow-hidden">
        <div className="cosmic-card rounded-2xl p-4 md:p-8 relative overflow-hidden">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text ">
            Discover Your Cosmic Journey
          </h1>
          <p className="text-lg mb-8 text-gray-300">
            Explore the stars, understand your path, and unlock the mysteries of the universe through daily horoscopes, tarot readings, and astrological insights.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button 
              className="bg-logo-yellow text-black px-6 py-3 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              onClick={() => router.push("/daily-horoscope/capricorn")}
            >
              <SparklesIcon className="mr-2" />
              Daily Horoscope
            </button>
            <button 
              className="cosmic-glass rounded-full px-6 py-3 flex text-white items-center justify-center hover:scale-105 transition-transform"
              onClick={() => router.push("/tarot")}
            >
              <MoonIcon className="mr-2" />
              Tarot Reading
            </button>
          </div>
        </div>
      </div>

        {/* Zodiac Wheel Title */}  
      <div className="mb-20 text-center">  
      <h2 className="inline-block text-2xl md:text-3xl font-semibold mb-10 bg-gradient-to-r from-logo-yellow to-amber-300 bg-clip-text text-transparent relative">
        Explore Your Zodiac Sign
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-logo-yellow rounded-full"></div>
      </h2>
      </div>   
      
      <div className="relative">
        {/* Desktop Zodiac Circle */}
        <div className="hidden md:block relative w-[600px] h-[600px] mx-auto">
          {starSign.map((sign, index) => {
            const angle = (index * 30) * (Math.PI / 180);
            const x = 250 * Math.cos(angle) + 300;
            const y = 250 * Math.sin(angle) + 300;

            return (
              <div
                key={sign.sign}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  activeSign === sign.sign ? "scale-110 z-10" : activeSign ? "opacity-70" : ""
                }`}
                style={{ left: `${x}px`, top: `${y}px` }}
                onMouseEnter={() => setActiveSign(sign.sign)}
                onMouseLeave={() => setActiveSign(null)}
              >
                <AstrologyCard sign={sign.sign.toLowerCase()} img={sign.image} />
              </div>
            );
          })}
        </div>

         {/* Mobile Zodiac Grid */}
        <div className="md:hidden grid grid-cols-3 gap-6">
          {starSign.map((sign) => (
            <div
              key={sign.name}
              className={`flex flex-col items-center cursor-pointer transition-transform duration-200 ${
                activeSign === sign.sign ? 'scale-105 z-10' : ''
              }`}
              onClick={() => setActiveSign(sign.sign)}
            >
              <div className="relative rounded-full overflow-hidden border-2 border-logo-yellow mb-2">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${sign.color} opacity-30`}
                ></div>
                <AstrologyCard sign={sign.sign.toLowerCase()} img={sign.image} />
              </div>
              <p className="font-medium text-white text-sm">{sign.name}</p>
              <p className="text-xs text-gray-400">{sign.dates}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
