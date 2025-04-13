import { useState } from "react";
import { useRouter } from "next/router";
import { FooterLinks } from '../components/FooterLinks';
import { HeaderMenu } from '../components/HeaderMenu';


export default function CompatibilityForm() {
  const [userSign, setUserSign] = useState("");
  const [partnerSign, setPartnerSign] = useState("");
  const [loveContent, setLoveContent] = useState("");
  const [workContent, setWorkContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const navigateToHomePage = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleCheck = async () => {
    if (!userSign || !partnerSign) return;
  
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/compatibility?userSign=${userSign}&partnerSign=${partnerSign}`
      );
      const data = await res.json();
  
      console.log("Backend Response:", data);
  
      const fullText = data.love || "";
  
      // Split into sections based on headings
      const loveSplit = fullText.split("**Love Compatibility**");
      const workSplit = fullText.split("**Work Compatibility**");
  
      // Extract and clean Love section
      let loveContent = "";
      if (loveSplit.length > 1) {
        loveContent = loveSplit[1].split("**Work Compatibility**")[0]?.trim() || "";
      }
  
      // Extract and clean Work section
      let workContent = "";
      if (workSplit.length > 1) {
        workContent = workSplit[1]?.trim() || "";
      }
  
      // Set state with fallback if empty
      setLoveContent(loveContent || "No love compatibility details found.");
      setWorkContent(workContent || "No work compatibility details found.");
    } catch (error) {
      console.error("Error fetching compatibility:", error);
      setLoveContent("Error fetching data.");
      setWorkContent("Try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")  // Bold formatting
      .replace(/\n\n/g, "<br/><br/>");  // Replace double newlines with <br/>
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
        <div className="p-6 w-full md:w-3/5 mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Check Compatibility</h2>

      <div className="space-y-4">
        <div className="space-x-4">
        <select
          className="border rounded p-2 w-1/4"
          value={userSign}
          onChange={(e) => setUserSign(e.target.value)}
        >
          <option value="">Select Your Sign</option>
          {SIGNS.map((sign) => (
            <option key={sign} value={sign}>
              {sign}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2 w-1/4"
          value={partnerSign}
          onChange={(e) => setPartnerSign(e.target.value)}
        >
          <option value="">Select Partner's Sign</option>
          {SIGNS.map((sign) => (
            <option key={sign} value={sign}>
              {sign}
            </option>
          ))}
        </select>
        </div>

        <button
          onClick={handleCheck}
          className="bg-[#FF9100] hover:bg-[#f58a3e] text-white font-semibold py-2 px-6 rounded-full transition border-transparent"
        >
          Check Compatibility
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}

      {(loveContent || workContent) && (
        <div className="mt-6 text-left bg-white bg-opacity-10 rounded shadow p-8 space-y-6">
          {loveContent && (
            <div>
              <h2 className="text-xl font-semibold">Love</h2>
              <p
                className="whitespace-pre-line text-white"
                dangerouslySetInnerHTML={{
                  __html: formatText(loveContent),
                }}
              />
            </div>
          )}
          {workContent && (
            <div>
              <h2 className="text-xl font-semibold">Work</h2>
              <p
                className="whitespace-pre-line text-white"
                dangerouslySetInnerHTML={{
                  __html: formatText(workContent),
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
    <FooterLinks/>
    </main>
  );
}

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];
