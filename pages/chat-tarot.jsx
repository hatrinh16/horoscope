import React, { useState, useRef, useEffect } from "react";
import { HeaderMenu } from "../components/HeaderMenu";

export default function TarotChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome, friend. Ask your question and the cards will reveal their guidance...",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  // ✅ persistent session for memory
    const sessionId = useRef("");

    useEffect(() => {
    const existing = localStorage.getItem("tarotSession");
    const id = existing || crypto.randomUUID();

    sessionId.current = id;
    localStorage.setItem("tarotSession", id);
    }, []);


  useEffect(() => {
    localStorage.setItem("tarotSession", sessionId.current);
  }, []);

  // ✅ auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const messageToSend = input.trim();
    if (!messageToSend) return;

    // show user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", content: messageToSend },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tarot-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          sessionId: sessionId.current,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "The cards are unclear right now. Try again shortly...",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="w-full min-h-screen bg-[#14082b] text-white flex flex-col items-center">
    <HeaderMenu />

    {/* Full width chat area */}
    <div className="flex-1 flex flex-col w-3/4 pt-24">

      {/* Messages take full width */}
      <div className="flex-1 overflow-y-auto px-8 md:px-24 lg:px-48 space-y-4 pb-32">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`w-fit max-w-[900px] px-5 py-4 rounded-2xl text-[15px] leading-relaxed
              ${msg.role === "user"
                ? "ml-auto bg-violet-600"
                : "bg-[#2a1f3d] border border-[#4d3b70]"
              }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="w-fit max-w-[900px] px-5 py-4 rounded-2xl bg-[#2a1f3d] border border-[#4d3b70] italic opacity-70">
            Reading the cards...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Sticky input bar like ChatGPT */}
      <div className="fixed bottom-0 w-3/4 px-8 md:px-24 lg:px-48 py-6">
        <div className="flex gap-4 ">
          <input
            className="
                w-full
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                text-white
                placeholder-white/40
                rounded-full
                px-6
                py-4
                outline-none
                focus:border-violet-400/60
                focus:bg-white/10
                transition
                "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the tarot anything..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                text-white
                placeholder-white/40
                rounded-full
                px-6
                py-4
                outline-none
                focus:border-violet-400/60
                focus:bg-white/10
                transition
                hover:bg-violet-500"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  </main>
);

}
