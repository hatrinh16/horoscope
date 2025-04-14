import React, { useEffect, useState } from 'react';

const formatCardName = (card) => {
  return card
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/of-/g, ''); // For "Ace of Cups" → "cups-ace"
};

export const CardOfTheDay = () => {
  const [card, setCard] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch('http://localhost:8080/card-of-the-day');
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setCard(data.card);
        setDescription(data.description);
      } catch (err) {
        console.error(err);
        setError("The veil is too thick today 🌫️");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  if (loading) return <p className="text-center text-gray-500">{`✨ Drawing today's energy...`}</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const imageName = formatCardName(card); // e.g. "cups-ace"

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
  <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Card of the Day</h2>
  
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    <img
      src={`/tarot-card/${imageName}.png`}
      alt={card}
      className="w-48 h-auto rounded-md shadow-md"
    />

    <div className="text-center md:text-left">
      <h3 className="text-xl font-semibold text-white mb-2">{card}</h3>
      <p className="text-gray-300 italic">{description}</p>
    </div>
  </div>
</div>

  );
};
