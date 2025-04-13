import React, { useState } from 'react';
import { useRouter } from "next/router";
import { FooterLinks } from '../components/FooterLinks';
import { HeaderMenu } from '../components/HeaderMenu';
import ZodiacCalendar from '../components/Calendar';
import { FaCalendar } from 'react-icons/fa';

const TarotReader = () => {
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState([]);
  const [reading, setReading] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const navigateToHomePage = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleReading = async () => {
    if (!question.trim()) {
      setError("Please enter a question ✨");
      return;
    }

    setLoading(true);
    setError('');
    setCards([]);
    setReading('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tarot?question=${encodeURIComponent(question)}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setCards(data.cards);
      setReading(data.reading);
    } catch (err) {
      console.error(err);
      setError('Something went wrong connecting to the universe 🌌');
    } finally {
      setLoading(false);
    }
  };

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

    <HeaderMenu/>
    <div className="w-full min-h-screen py-10 px-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-2">Tarot Reading</h1>
      <p className="mb-6 text-gray-400">Ask a question and let the cards speak...</p>

      <div className="flex flex-col items-center gap-4 w-full md:w-3/5 mx-auto">
        <input
          type="text"
          className="w-3/5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Will I find love soon?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="bg-[#FF9100] hover:bg-[#f58a3e] text-white font-semibold py-2 px-6 rounded-full transition border-transparent"
          onClick={handleReading}
        >
          Draw Cards
        </button>
        {cards.length === 0 && !loading && (
        <div className="relative w-80 h-60 flex items-center justify-center mt-8">
          <img
            src="/tarot-2.png"
            alt="tarot-1"
            className="absolute w-32 h-auto rounded-md shadow-lg transform rotate-[-30deg] -translate-x-20 z-20"
          />
          <img
            src="/tarot-1.png"
            alt="tarot-2"
            className="absolute w-36 h-auto rounded-md shadow-lg z-30"
          />
          <img
            src="/tarot-3.png"
            alt="tarot-3"
            className="absolute w-32 h-auto rounded-md shadow-lg transform rotate-[30deg] translate-x-20 z-20"
          />
        </div>)}
        {loading && <p className="text-gray-500">✨ Shuffling the deck...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {cards.length > 0 && (
        <div className="mt-8 text-left w-full">
        {/* <h2 className="text-xl font-semibold mb-2">Your Cards:</h2> */}

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {cards.map((card, idx) => {
            // Convert card name to filename
            const cardNameToFileName = (cardName) => {
              return cardName
                .toLowerCase()
                .replace(' of ', '-')        // "Ace of Cups" => "ace-cups"
                .replace(/\s+/g, '-')        // Replace spaces with dashes
                + '.png';
            };

            const imageName = cardNameToFileName(card);

            return (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={`/tarot-card/${imageName}`}
                  alt={card}
                  className="w-40 h-auto rounded-md shadow-lg mb-2"
                />
                <p className="text-white font-semibold text-center">{card}</p>
              </div>
            );
          })}
        </div>
            <div className="bg-white bg-opacity-10 p-8 rounded w-full"> 
            <h2 className="text-xl font-semibold">Reading:</h2>
            <p className="whitespace-pre-line text-white ">{reading}</p>
            </div>
        </div>
        )}
      </div>
    </div>
    <FooterLinks/>
    </main>
  );
};

export default TarotReader;
