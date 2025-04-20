'use client'

import { useRouter } from 'next/navigation'

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
]

const HoroscopeLinks = () => {
  const router = useRouter()

  const handleClick = (sign, type) => {
    const name = sign.toLowerCase()
    router.push(`/${type}/${name}`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 p-4">
      {zodiacSigns.map((sign) => (
        <>
          <p
            key={`${sign}-love`}
            onClick={() => handleClick(sign, 'love')}
            className="cursor-pointer hover:underline"
          >
            {sign} Love Horoscope
          </p>

          <p
            key={`${sign}-career`}
            onClick={() => handleClick(sign, 'career')}
            className="cursor-pointer hover:underline"
          >
            {sign} Career Horoscope
          </p>
        </>
      ))}
    </div>
  )
}

export default HoroscopeLinks
