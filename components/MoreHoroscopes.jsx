'use client';

import { useRouter } from 'next/navigation';
import { HeartIcon, BriefcaseIcon } from 'lucide-react';

const zodiacSigns = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

const HoroscopeLinks = () => {
  const router = useRouter();

  const handleHoroscopeClick = (type, sign) => {
    const name = sign.toLowerCase();
    router.push(`/${type}/${name}`);
  };

  return (
    <div className="container mx-auto px-4 relative z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-logo-yellow mb-4">
          More Horoscope Readings
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore personalized Love and Career guidance for every zodiac sign
        </p>
      </div>

      {/* Zodiac Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {zodiacSigns.map((sign) => (
            <div
              key={sign}
              className="cosmic-card rounded-xl p-6 space-y-4 hover:scale-105 transition-transform duration-300"
            >
              {/* Sign Name */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-logo-yellow">
                  {sign}
                </h3>
              </div>

              {/* Love Horoscope Button */}
              <button
                onClick={() => handleHoroscopeClick('love', sign)}
                className="w-full flex items-center gap-3 p-3 rounded-lg cosmic-glass hover:bg-pink-400 hover:bg-opacity-20 hover:border-pink-400 border border-transparent transition-all duration-300 group"
              >
                <HeartIcon
                  size={18}
                  className="text-pink-400 group-hover:text-pink-300 transition-colors"
                />
                <span className="text-gray-200 group-hover:text-pink-300 transition-colors">
                  {sign} Love Horoscope
                </span>
              </button>

              {/* Career Horoscope Button */}
              <button
                onClick={() => handleHoroscopeClick('career', sign)}
                className="w-full flex items-center gap-3 p-3 rounded-lg cosmic-glass hover:bg-green-400 hover:bg-opacity-20 hover:border-green-400 border border-transparent transition-all duration-300 group"
              >
                <BriefcaseIcon
                  size={18}
                  className="text-green-400 group-hover:text-green-300 transition-colors"
                />
                <span className="text-gray-200 group-hover:text-green-300 transition-colors">
                  {sign} Career Horoscope
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Call to Action */}
      {/* <div className="text-center mt-16">
        <div className="cosmic-card-highlight rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-logo-yellow mb-4">
            Discover Your Cosmic Path
          </h3>
          <p className="text-gray-300 mb-6">
            Whether you're seeking love guidance or career insights, the stars
            have wisdom to share for your journey ahead.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => handleHoroscopeClick('love', 'Aries')}
              className="px-6 py-3 bg-pink-400 bg-opacity-20 text-pink-400 rounded-full font-medium hover:bg-pink-400 hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              <HeartIcon size={18} />
              Explore Love Readings
            </button>
            <button
              onClick={() => handleHoroscopeClick('career', 'Aries')}
              className="px-6 py-3 bg-green-400 bg-opacity-20 text-green-400 rounded-full font-medium hover:bg-green-400 hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              <BriefcaseIcon size={18} />
              Discover Career Insights
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HoroscopeLinks;
