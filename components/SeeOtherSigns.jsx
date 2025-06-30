'use client'; // if you're using Next.js 13+ App Router

import Link from 'next/link';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SeeOtherSigns = ({ name }) => {
  const currentSign = name?.toLowerCase();

  const otherSigns = zodiacSigns.filter(sign => sign.toLowerCase() !== currentSign);

  return (
    <div className="mt-8 w-full flex flex-wrap items-center justify-center gap-4">
      <h2 className="w-full text-lg text-center md:text-2xl lg:text-3xl mb-6">See Other Signs</h2>
  
      {otherSigns.map(sign => (
        <Link
          key={sign}
          href={`/daily-horoscope/${sign.toLowerCase()}`}
          className="flex-1 min-w-[120px] max-w-[150px]"
        >
          <button className="w-full py-2 px-4 border border-gray-300 bg-white bg-opacity-5 rounded-full hover:bg-[#f58a3e] text-white transition hover:border-transparent">
            {sign}
          </button>
        </Link>
      ))}
    </div>
  );  
};

export default SeeOtherSigns;
