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
        const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/card-of-the-day`);
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
            <div className="w-full max-w-2xl mb-16">
              <div className="cosmic-card rounded-xl p-8 relative overflow-hidden">
                <div className="absolute -left-10 -top-10 w-40 h-auto rounded-full bg-logo-yellow opacity-10 blur-3xl"></div>
                
                <h3 className="text-xl font-semibold mb-6 text-center text-logo-yellow">Today's Tarot Insight</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-3/5 relative">
                    <div className="aspect-[2/3] rounded-lg overflow-hidden cosmic-card-highlight p-1 border border-logo-yellow/30">
                    <img
                      src={`/tarot-card/${imageName}.png`}
                      alt={card}
                      className="w-48 h-auto rounded-md shadow-md"
                    />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-xl text-logo-yellow mb-2">Five of Wands</h4>
                    <p className="text-gray-300 mb-6 italic">
                      {description}
                    </p>
                    <button 
                      className="cosmic-glass rounded-full px-6 py-2 text-sm border border-logo-yellow/30 hover:border-logo-yellow transition-colors"
                      
                    >
                      Full Reading →
                    </button>
                  </div>
                </div>
              </div>
            </div>
  );
};
