import { useState } from "react";
import { useRouter } from "next/router";
import { SparklesIcon, SunIcon, MoonIcon, Shuffle } from "lucide-react";
import { HeaderMenu } from "../components/HeaderMenu";
import { FooterLinks } from "../components/FooterLinks";

export default function TarotReader() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState([]);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
    setCards([]);
    setReading("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tarot?question=${encodeURIComponent(question)}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setCards(data.cards);
      setReading(data.reading);
    } catch (err) {
      setError("Something went wrong connecting to the universe 🌌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full items-center min-h-screen bg-[#14082b] text-white relative">

      <HeaderMenu />

      <section className="w-full max-w-4xl px-4 pt-24 pb-16 text-center">
        <div className="cosmic-card rounded-2xl p-8 md:p-12 relative overflow-hidden mb-10">
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-cosmic-accent-1 opacity-20 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-cosmic-accent-2 opacity-20 blur-3xl"></div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text ">
            AI Tarot Reading
          </h1>
          <p className="text-gray-300 mb-8">
            Ask your question and let the cards reveal the truth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What does my future hold?"
              className="flex-1 bg-cosmic-glass border border-cosmic-glass-border rounded-full px-6 py-3 focus:outline-none focus:ring-2"
            />
            <button
              onClick={handleReading}
              disabled={loading || !question}
              className="cosmic-card-highlight rounded-full px-6 py-3 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              <SparklesIcon className="mr-2" />
              Draw Cards
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="relative flex justify-center mb-16 perspective-1000 animate-fade-in">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cosmic-accent-1 opacity-10 blur-3xl rounded-full"></div>
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-32 h-48 cosmic-card-highlight rounded-lg relative"
                  style={{
                    transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 20 - 10}px) translateY(${Math.random() * 20 - 10}px)`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shuffle size={24} className="text-cosmic-gold animate-spin" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Idle state: placeholder cards */}
        {/* Idle state: show cosmic card backs only when no question is entered */}
        {!loading && cards.length === 0 && !question && (
          <div className="relative flex justify-center my-12">
            <div className="flex gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-40 h-64 bg-[#2b186c] rounded-xl flex items-center justify-center relative"
                >
                  <div className="w-16 h-16 border border-purple-300 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 border border-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Results */}
        {cards.length > 0 && (
          <div className="w-full mt-12">
            <h2 className="text-xl font-semibold mb-6 text-center">Your Cards</h2>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {cards.map((card, idx) => {
                const imageName = card
                  .toLowerCase()
                  .replace(" of ", "-")
                  .replace(/\s+/g, "-") + ".png";

                return (
                  <div key={idx} className="group perspective-1000">
                    <div className="cosmic-card-highlight rounded-lg p-2 transform transition-transform duration-500 group-hover:rotate-y-10 group-hover:scale-105">
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden w-40 h-auto mx-auto">
                        <img
                          src={`/tarot-card/${imageName}`}
                          alt={card}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                          <p className="text-cosmic-gold font-medium text-sm">{card}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cosmic-card rounded-xl p-8 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-cosmic-accent-1 opacity-10 blur-3xl"></div>
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cosmic-gold to-amber-300 bg-clip-text text-transparent">Your Reading</h3>
              <p className="whitespace-pre-line text-white mb-6 text-left">{reading}</p>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => {
                    setQuestion("");
                    setCards([]);
                    setReading("");
                  }}
                  className="cosmic-glass rounded-full px-6 py-2 hover:cosmic-card-highlight transition-all"
                >
                  Ask Another Question
                </button>
                <button className="cosmic-glass rounded-full px-6 py-2 hover:cosmic-card-highlight transition-all">
                  Save Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Additional Features */}
      {!loading && !reading && cards.length === 0 && (
        <section className="w-full max-w-4xl px-4 pb-24">
          <h3 className="text-xl font-semibold mb-8 text-center">Explore More Divination</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cosmic-card rounded-xl p-6 hover:cosmic-card-highlight transition-all cursor-pointer">
              <h4 className="text-lg mb-2">Astrology Chart</h4>
              <p className="text-sm text-gray-400 mb-4">
                Discover your complete birth chart and planetary alignments.
              </p>
              <div className="flex justify-end">
                <div className="w-10 h-10 cosmic-glass rounded-full flex items-center justify-center">
                  <SunIcon size={18} className="text-cosmic-gold" />
                </div>
              </div>
            </div>
            <div className="cosmic-card rounded-xl p-6 hover:cosmic-card-highlight transition-all cursor-pointer">
              <h4 className="text-lg mb-2">I Ching</h4>
              <p className="text-sm text-gray-400 mb-4">
                Ancient Chinese divination system for wisdom and guidance.
              </p>
              <div className="flex justify-end">
                <div className="w-10 h-10 cosmic-glass rounded-full flex items-center justify-center">
                  <MoonIcon size={18} className="text-cosmic-gold" />
                </div>
              </div>
            </div>
            <div className="cosmic-card rounded-xl p-6 hover:cosmic-card-highlight transition-all cursor-pointer">
              <h4 className="text-lg mb-2">Numerology</h4>
              <p className="text-sm text-gray-400 mb-4">
                Discover the mystical significance of numbers in your life.
              </p>
              <div className="flex justify-end">
                <div className="w-10 h-10 cosmic-glass rounded-full flex items-center justify-center">
                  <SparklesIcon size={18} className="text-cosmic-gold" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <FooterLinks />
    </main>
  );
}
