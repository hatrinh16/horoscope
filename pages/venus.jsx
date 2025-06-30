import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    city: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8080/astro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Something went wrong. Check your backend." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">🌌 Astrology Sign Calculator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            name="city"
            type="text"
            placeholder="City of Birth (e.g. Seoul, Paris)"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-300"
          >
            {loading ? "Calculating..." : "Get My Signs"}
          </button>
        </form>

        {result && (
          <div className="mt-6 text-center">
            {result.error ? (
              <p className="text-red-300">{result.error}</p>
            ) : (
              <>
                <p className="text-xl mt-4">
                  💖 <strong>Venus Sign:</strong> {result.venusSign}
                </p>
                <p className="text-xl mt-2">
                  🌅 <strong>Rising Sign:</strong> {result.risingSign}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
