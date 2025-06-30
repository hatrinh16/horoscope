import { useState, useEffect } from "react";
import { PaletteIcon, SparklesIcon, EyeIcon, ShirtIcon, CalendarIcon, StarIcon } from "lucide-react";
import { HeaderMenu } from "../components/HeaderMenu";
import { FooterLinks } from "../components/FooterLinks";


export default function StyleGuide() {
    const [selectedSign, setSelectedSign] = useState("Aries");
  const [activeTab, setActiveTab] = useState("overview");
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  const zodiacStyles = [
    {
      name: "Aries",
      dates: "Mar 21 - Apr 19",
      element: "Fire",
      image: "/aries.png",
      personality: "Bold, confident, and energetic. Aries loves to make a statement and isn't afraid to stand out.",
      overallColors: {
        primary: "#FF6B47", // Bold red-orange
        secondary: "#FFD700", // Gold
        accent: "#8B0000", // Deep red
        neutral: "#2F2F2F" // Charcoal
      },
      colorPalette: [
        { name: "Fiery Red", hex: "#FF6B47", description: "Your power color - wear for confidence and leadership" },
        { name: "Crimson", hex: "#DC143C", description: "Perfect for important meetings and dates" },
        { name: "Burnt Orange", hex: "#FF8C00", description: "Great for creative projects and self-expression" },
        { name: "Golden Yellow", hex: "#FFD700", description: "Brings out your natural charisma" },
        { name: "Rust", hex: "#B7410E", description: "Grounding color for everyday wear" }
      ],
      dailyColors: {
        Sunday: { color: "Crimson", hex: "#DC143C", energy: "Power and passion for new beginnings" },
        Monday: { color: "Fiery Red", hex: "#FF6B47", energy: "Energy boost for tackling the week" },
        Tuesday: { color: "Burnt Orange", hex: "#FF8C00", energy: "Creativity and dynamic action" },
        Wednesday: { color: "Golden Yellow", hex: "#FFD700", energy: "Communication and confidence" },
        Thursday: { color: "Rust", hex: "#B7410E", energy: "Steady progress and determination" },
        Friday: { color: "Coral", hex: "#FF7F50", energy: "Social energy and magnetism" },
        Saturday: { color: "Scarlet", hex: "#FF2400", energy: "Adventure and bold choices" }
      },
      makeup: {
        eyeshadow: ["Bold golds", "Copper tones", "Warm oranges", "Deep reds"],
        lipColor: ["Classic red", "Coral", "Orange-red", "Berry stain"],
        blush: "Warm peach or coral",
        highlighter: "Golden bronze",
        style: "Bold and dramatic - don't be afraid to make a statement"
      },
      clothing: {
        style: "Sharp, structured pieces with bold silhouettes. Think power suits, statement jackets, and confident cuts.",
        fabrics: ["Leather", "Structured cotton", "Sharp tailoring", "Bold textures"],
        patterns: ["Geometric prints", "Bold stripes", "Animal prints", "Color blocking"],
        accessories: ["Statement jewelry", "Bold watches", "Structured bags", "Sharp sunglasses"],
        avoid: ["Overly delicate fabrics", "Pastel colors", "Timid patterns", "Shapeless clothing"]
      },
      seasonalTips: {
        spring: "Embrace bright corals and energizing oranges",
        summer: "Cool down with crimson and deep reds",
        fall: "Perfect season for rust and burnt orange tones",
        winter: "Add warmth with golden accents and rich reds"
      }
    },
    {
      name: "Taurus",
      dates: "Apr 20 - May 20",
      element: "Earth",
      image: "/taurus.png",
      personality: "Luxurious, sensual, and grounded. Taurus appreciates quality, comfort, and timeless beauty.",
      overallColors: {
        primary: "#228B22", // Forest green
        secondary: "#DEB887", // Burlywood
        accent: "#FFB6C1", // Light pink
        neutral: "#8B7355" // Dark khaki
      },
      colorPalette: [
        { name: "Emerald Green", hex: "#50C878", description: "Your signature color - promotes growth and stability" },
        { name: "Rose Pink", hex: "#FFB6C1", description: "Enhances your natural beauty and charm" },
        { name: "Earth Brown", hex: "#8B4513", description: "Grounding color that connects you to nature" },
        { name: "Cream", hex: "#F5F5DC", description: "Soft luxury that complements your gentle nature" },
        { name: "Sage Green", hex: "#9CAF88", description: "Calming color perfect for relaxation" }
      ],
      dailyColors: {
        Sunday: { color: "Rose Pink", hex: "#FFB6C1", energy: "Self-care and gentle luxury" },
        Monday: { color: "Forest Green", hex: "#228B22", energy: "Steady growth and productivity" },
        Tuesday: { color: "Earth Brown", hex: "#8B4513", energy: "Grounding and practical focus" },
        Wednesday: { color: "Sage Green", hex: "#9CAF88", energy: "Balance and harmony" },
        Thursday: { color: "Cream", hex: "#F5F5DC", energy: "Gentle progress and comfort" },
        Friday: { color: "Dusty Rose", hex: "#DCAE96", energy: "Social warmth and connection" },
        Saturday: { color: "Olive Green", hex: "#6B8E23", energy: "Natural beauty and relaxation" }
      },
      makeup: {
        eyeshadow: ["Earthy browns", "Soft greens", "Rose gold", "Nude tones"],
        lipColor: ["Rose pink", "Nude brown", "Coral", "Berry tones"],
        blush: "Soft rose or peach",
        highlighter: "Champagne or rose gold",
        style: "Natural and polished - enhance your features subtly"
      },
      clothing: {
        style: "Classic, comfortable, and luxurious. Quality over quantity with timeless pieces.",
        fabrics: ["Cashmere", "Silk", "High-quality cotton", "Soft knits", "Velvet"],
        patterns: ["Florals", "Subtle textures", "Classic plaids", "Soft stripes"],
        accessories: ["Pearl jewelry", "Leather goods", "Silk scarves", "Quality handbags"],
        avoid: ["Cheap materials", "Overly trendy pieces", "Uncomfortable fits", "Harsh textures"]
      },
      seasonalTips: {
        spring: "Fresh greens and soft pinks welcome new growth",
        summer: "Light creams and sage greens keep you cool",
        fall: "Rich earth tones and deep roses feel cozy",
        winter: "Luxurious textures in emerald and cream"
      }
    },
    {
      name: "Gemini",
      dates: "May 21 - Jun 20",
      element: "Air",
      image: "/gemini.png",
      personality: "Versatile, curious, and expressive. Gemini loves variety and isn't afraid to experiment with different looks.",
      overallColors: {
        primary: "#FFD700", // Bright yellow
        secondary: "#87CEEB", // Sky blue
        accent: "#DDA0DD", // Plum
        neutral: "#C0C0C0" // Silver
      },
      colorPalette: [
        { name: "Bright Yellow", hex: "#FFD700", description: "Stimulates your quick mind and communication" },
        { name: "Sky Blue", hex: "#87CEEB", description: "Reflects your airy nature and adaptability" },
        { name: "Lavender", hex: "#E6E6FA", description: "Balances your dual nature with calm energy" },
        { name: "Mint Green", hex: "#98FB98", description: "Fresh color for new ideas and growth" },
        { name: "Silver", hex: "#C0C0C0", description: "Modern and versatile like your personality" }
      ],
      dailyColors: {
        Sunday: { color: "Lavender", hex: "#E6E6FA", energy: "Mental clarity and peaceful thoughts" },
        Monday: { color: "Bright Yellow", hex: "#FFD700", energy: "Mental stimulation and communication" },
        Tuesday: { color: "Sky Blue", hex: "#87CEEB", energy: "Clear thinking and adaptability" },
        Wednesday: { color: "Mint Green", hex: "#98FB98", energy: "Fresh perspectives and new ideas" },
        Thursday: { color: "Silver", hex: "#C0C0C0", energy: "Versatility and modern thinking" },
        Friday: { color: "Periwinkle", hex: "#CCCCFF", energy: "Social butterfly energy" },
        Saturday: { color: "Coral", hex: "#FF7F50", energy: "Creative expression and fun" }
      },
      makeup: {
        eyeshadow: ["Bright blues", "Sunny yellows", "Lilac tones", "Metallic silvers"],
        lipColor: ["Coral pink", "Berry", "Nude rose", "Bright colors"],
        blush: "Peachy pink or coral",
        highlighter: "Silver or iridescent",
        style: "Playful and changeable - experiment with different looks"
      },
      clothing: {
        style: "Mix and match versatility. Love layering and pieces that can be styled multiple ways.",
        fabrics: ["Light cottons", "Chiffon", "Mixed textures", "Breathable fabrics"],
        patterns: ["Stripes with florals", "Color blocking", "Abstract prints", "Mix of patterns"],
        accessories: ["Stackable jewelry", "Convertible pieces", "Colorful scarves", "Fun bags"],
        avoid: ["Boring basics", "Single-style pieces", "Heavy fabrics", "Monotonous colors"]
      },
      seasonalTips: {
        spring: "Mix bright yellows with fresh blues",
        summer: "Light lavenders and mint greens",
        fall: "Layer silver with warm corals",
        winter: "Brighten dark days with sunny yellows"
      }
    },
    {
      name: "Cancer",
      dates: "Jun 21 - Jul 22",
      element: "Water",
      image: "/cancer.png",
      personality: "Nurturing, intuitive, and emotional. Cancer values comfort, home, and sentimental beauty.",
      overallColors: {
        primary: "#4682B4", // Steel blue
        secondary: "#F0F8FF", // Alice blue
        accent: "#FFB6C1", // Light pink
        neutral: "#708090" // Slate gray
      },
      colorPalette: [
        { name: "Moonlight Silver", hex: "#C0C0C0", description: "Connects you to lunar energy and intuition" },
        { name: "Ocean Blue", hex: "#4682B4", description: "Reflects your emotional depth and wisdom" },
        { name: "Soft Pink", hex: "#FFB6C1", description: "Nurturing color that enhances your caring nature" },
        { name: "Pearl White", hex: "#F8F8FF", description: "Pure and protective, like a mother's love" },
        { name: "Sea Foam", hex: "#93E9BE", description: "Calming color that soothes your sensitive soul" }
      ],
      dailyColors: {
        Sunday: { color: "Moonlight Silver", hex: "#C0C0C0", energy: "Intuitive reflection and family time" },
        Monday: { color: "Ocean Blue", hex: "#4682B4", energy: "Emotional intelligence and depth" },
        Tuesday: { color: "Soft Pink", hex: "#FFB6C1", energy: "Nurturing others and self-care" },
        Wednesday: { color: "Pearl White", hex: "#F8F8FF", energy: "Pure intentions and clarity" },
        Thursday: { color: "Sea Foam", hex: "#93E9BE", energy: "Healing and emotional balance" },
        Friday: { color: "Lavender Blue", hex: "#CCCCFF", energy: "Gentle social connections" },
        Saturday: { color: "Powder Blue", hex: "#B0E0E6", energy: "Peaceful home and comfort" }
      },
      makeup: {
        eyeshadow: ["Soft blues", "Pearl tones", "Gentle pinks", "Silver shimmer"],
        lipColor: ["Rose pink", "Nude", "Soft coral", "Berry stain"],
        blush: "Soft rose or pink",
        highlighter: "Pearl or moonlight glow",
        style: "Soft and romantic - enhance your natural glow"
      },
      clothing: {
        style: "Comfortable, flowing, and feminine. Pieces that feel like a warm hug.",
        fabrics: ["Soft cottons", "Silk", "Cashmere", "Flowing fabrics", "Cozy knits"],
        patterns: ["Soft florals", "Watercolor prints", "Gentle waves", "Romantic details"],
        accessories: ["Pearl jewelry", "Sentimental pieces", "Soft scarves", "Vintage items"],
        avoid: ["Sharp edges", "Harsh colors", "Uncomfortable fits", "Cold materials"]
      },
      seasonalTips: {
        spring: "Soft pinks and sea foam greens",
        summer: "Cool blues and pearl whites",
        fall: "Warm silver and dusty rose",
        winter: "Moonlight silver with cozy textures"
      }
    },
    {
      name: "Leo",
      dates: "Jul 23 - Aug 22",
      element: "Fire",
      image: "/leo.png",
      personality: "Dramatic, confident, and regal. Leo loves luxury, attention, and making a grand impression.",
      overallColors: {
        primary: "#DAA520", // Goldenrod
        secondary: "#FF4500", // Orange red
        accent: "#800080", // Purple
        neutral: "#000000" // Black
      },
      colorPalette: [
        { name: "Royal Gold", hex: "#DAA520", description: "Your signature color - radiates confidence and luxury" },
        { name: "Sunburst Orange", hex: "#FF4500", description: "Energizing color that matches your vibrant personality" },
        { name: "Regal Purple", hex: "#800080", description: "Adds mystery and royal sophistication" },
        { name: "Dramatic Black", hex: "#000000", description: "Creates striking contrast and elegance" },
        { name: "Champagne", hex: "#F7E7CE", description: "Soft luxury for everyday glamour" }
      ],
      dailyColors: {
        Sunday: { color: "Royal Gold", hex: "#DAA520", energy: "Confidence and self-expression" },
        Monday: { color: "Sunburst Orange", hex: "#FF4500", energy: "Dynamic energy and leadership" },
        Tuesday: { color: "Regal Purple", hex: "#800080", energy: "Creative power and mystery" },
        Wednesday: { color: "Champagne", hex: "#F7E7CE", energy: "Elegant communication" },
        Thursday: { color: "Rose Gold", hex: "#E8B4A0", energy: "Warm charisma and charm" },
        Friday: { color: "Amber", hex: "#FFBF00", energy: "Social magnetism and fun" },
        Saturday: { color: "Bronze", hex: "#CD7F32", energy: "Dramatic flair and entertainment" }
      },
      makeup: {
        eyeshadow: ["Gold metallics", "Warm oranges", "Rich purples", "Bronze tones"],
        lipColor: ["Bold red", "Orange-red", "Gold gloss", "Berry"],
        blush: "Golden peach or warm coral",
        highlighter: "Golden bronze with shimmer",
        style: "Glamorous and attention-grabbing - go for the drama"
      },
      clothing: {
        style: "Bold, luxurious, and statement-making. Quality pieces that command attention.",
        fabrics: ["Silk", "Velvet", "Satin", "Metallics", "Rich textures"],
        patterns: ["Animal prints", "Bold florals", "Metallic details", "Dramatic solids"],
        accessories: ["Statement jewelry", "Designer pieces", "Bold sunglasses", "Luxury handbags"],
        avoid: ["Boring basics", "Cheap materials", "Understated pieces", "Dull colors"]
      },
      seasonalTips: {
        spring: "Bright golds with fresh orange accents",
        summer: "Champagne and rose gold for elegance",
        fall: "Rich purples and bronze tones",
        winter: "Dramatic blacks with gold highlights"
      }
    },
    {
      name: "Virgo",
      dates: "Aug 23 - Sep 22",
      element: "Earth",
      image: "/virgo.png",
      personality: "Refined, practical, and perfectionist. Virgo appreciates clean lines, quality, and understated elegance.",
      overallColors: {
        primary: "#6B8E23", // Olive drab
        secondary: "#F5F5DC", // Beige
        accent: "#4682B4", // Steel blue
        neutral: "#A9A9A9" // Dark gray
      },
      colorPalette: [
        { name: "Sage Green", hex: "#9CAF88", description: "Calming earth tone that promotes clarity" },
        { name: "Soft Beige", hex: "#F5F5DC", description: "Clean and sophisticated neutral" },
        { name: "Steel Blue", hex: "#4682B4", description: "Professional color that enhances focus" },
        { name: "Dusty Rose", hex: "#DCAE96", description: "Gentle color that softens your analytical nature" },
        { name: "Cream", hex: "#FFFDD0", description: "Pure and clean like your organized mind" }
      ],
      dailyColors: {
        Sunday: { color: "Sage Green", hex: "#9CAF88", energy: "Peaceful organization and planning" },
        Monday: { color: "Steel Blue", hex: "#4682B4", energy: "Professional focus and efficiency" },
        Tuesday: { color: "Soft Beige", hex: "#F5F5DC", energy: "Practical problem-solving" },
        Wednesday: { color: "Dusty Rose", hex: "#DCAE96", energy: "Gentle perfectionism" },
        Thursday: { color: "Cream", hex: "#FFFDD0", energy: "Clear thinking and analysis" },
        Friday: { color: "Moss Green", hex: "#8A9A5B", energy: "Natural connections and growth" },
        Saturday: { color: "Soft Gray", hex: "#C0C0C0", energy: "Refined relaxation" }
      },
      makeup: {
        eyeshadow: ["Neutral browns", "Soft greens", "Muted roses", "Clean whites"],
        lipColor: ["Nude pink", "Rose brown", "Soft coral", "Natural tones"],
        blush: "Subtle rose or peach",
        highlighter: "Natural glow or soft pearl",
        style: "Polished and natural - perfect your technique"
      },
      clothing: {
        style: "Clean, tailored, and refined. Well-fitted basics with perfect details.",
        fabrics: ["High-quality cotton", "Linen", "Wool", "Crisp materials"],
        patterns: ["Classic stripes", "Subtle textures", "Clean geometrics", "Minimal prints"],
        accessories: ["Simple jewelry", "Quality leather", "Structured bags", "Classic watches"],
        avoid: ["Messy patterns", "Poor quality", "Overly trendy pieces", "Flashy details"]
      },
      seasonalTips: {
        spring: "Fresh sage green with cream accents",
        summer: "Cool steel blue and soft beige",
        fall: "Warm dusty rose and moss green",
        winter: "Clean whites with gray undertones"
      }
    },
    {
      name: "Libra",
      dates: "Sep 23 - Oct 22",
      element: "Air",
      image: "/libra.png",
      personality: "Harmonious, aesthetic, and diplomatic. Libra loves beauty, balance, and romantic elegance.",
      overallColors: {
        primary: "#FFB6C1", // Light pink
        secondary: "#87CEEB", // Sky blue
        accent: "#DDA0DD", // Plum
        neutral: "#F5F5F5" // White smoke
      },
      colorPalette: [
        { name: "Rose Pink", hex: "#FFB6C1", description: "Your signature color - promotes love and harmony" },
        { name: "Sky Blue", hex: "#87CEEB", description: "Balancing color that brings peace and clarity" },
        { name: "Lavender", hex: "#E6E6FA", description: "Romantic color that enhances your charm" },
        { name: "Mint Green", hex: "#98FB98", description: "Fresh balance for your diplomatic nature" },
        { name: "Soft White", hex: "#F5F5F5", description: "Pure and elegant like your refined taste" }
      ],
      dailyColors: {
        Sunday: { color: "Rose Pink", hex: "#FFB6C1", energy: "Love and romantic connections" },
        Monday: { color: "Sky Blue", hex: "#87CEEB", energy: "Peaceful balance and harmony" },
        Tuesday: { color: "Lavender", hex: "#E6E6FA", energy: "Diplomatic solutions and grace" },
        Wednesday: { color: "Mint Green", hex: "#98FB98", energy: "Fresh perspectives and fairness" },
        Thursday: { color: "Soft White", hex: "#F5F5F5", energy: "Pure intentions and clarity" },
        Friday: { color: "Blush Pink", hex: "#FADADD", energy: "Social charm and attraction" },
        Saturday: { color: "Powder Blue", hex: "#B0E0E6", energy: "Artistic beauty and creativity" }
      },
      makeup: {
        eyeshadow: ["Soft pinks", "Blue tones", "Lavender", "Neutral roses"],
        lipColor: ["Rose pink", "Coral", "Berry", "Nude rose"],
        blush: "Soft pink or rose",
        highlighter: "Rose gold or pearl",
        style: "Romantic and balanced - create harmony in your look"
      },
      clothing: {
        style: "Feminine, balanced, and aesthetically pleasing. Pieces that create beautiful silhouettes.",
        fabrics: ["Silk", "Chiffon", "Satin", "Flowing materials", "Soft textures"],
        patterns: ["Florals", "Romantic prints", "Balanced geometrics", "Soft watercolors"],
        accessories: ["Delicate jewelry", "Silk scarves", "Beautiful handbags", "Elegant shoes"],
        avoid: ["Harsh lines", "Aggressive patterns", "Unbalanced proportions", "Jarring colors"]
      },
      seasonalTips: {
        spring: "Soft pinks with fresh mint accents",
        summer: "Cool sky blue and lavender",
        fall: "Warm rose with soft white",
        winter: "Elegant powder blue with rose gold"
      }
    },
    {
      name: "Scorpio",
      dates: "Oct 23 - Nov 21",
      element: "Water",
      image: "/scorpio.png",
      personality: "Intense, mysterious, and magnetic. Scorpio loves deep colors, dramatic looks, and powerful statements.",
      overallColors: {
        primary: "#8B0000", // Dark red
        secondary: "#000000", // Black
        accent: "#800080", // Purple
        neutral: "#2F2F2F" // Dark gray
      },
      colorPalette: [
        { name: "Deep Crimson", hex: "#8B0000", description: "Your power color - intense and magnetic" },
        { name: "Midnight Black", hex: "#000000", description: "Mysterious and sophisticated" },
        { name: "Royal Purple", hex: "#800080", description: "Transformative color that enhances intuition" },
        { name: "Burgundy", hex: "#800020", description: "Rich and passionate like your nature" },
        { name: "Dark Plum", hex: "#483D8B", description: "Deep mystery and psychic power" }
      ],
      dailyColors: {
        Sunday: { color: "Deep Crimson", hex: "#8B0000", energy: "Passionate intensity and power" },
        Monday: { color: "Midnight Black", hex: "#000000", energy: "Mystery and professional strength" },
        Tuesday: { color: "Royal Purple", hex: "#800080", energy: "Transformation and intuition" },
        Wednesday: { color: "Burgundy", hex: "#800020", energy: "Deep communication and truth" },
        Thursday: { color: "Dark Plum", hex: "#483D8B", energy: "Psychic insight and wisdom" },
        Friday: { color: "Wine Red", hex: "#722F37", energy: "Magnetic social presence" },
        Saturday: { color: "Charcoal", hex: "#36454F", energy: "Mysterious allure and depth" }
      },
      makeup: {
        eyeshadow: ["Deep reds", "Black smoky", "Purple tones", "Dark metallics"],
        lipColor: ["Deep red", "Burgundy", "Dark berry", "Black cherry"],
        blush: "Deep rose or burgundy",
        highlighter: "Subtle glow or dark bronze",
        style: "Intense and dramatic - embrace the mystery"
      },
      clothing: {
        style: "Dramatic, form-fitting, and powerful. Pieces that command respect and intrigue.",
        fabrics: ["Leather", "Silk", "Velvet", "Rich textures", "Structured materials"],
        patterns: ["Solid bold colors", "Subtle textures", "Dark florals", "Mysterious prints"],
        accessories: ["Bold jewelry", "Statement pieces", "Dark sunglasses", "Powerful watches"],
        avoid: ["Pastel colors", "Childish patterns", "Weak silhouettes", "Overly bright colors"]
      },
      seasonalTips: {
        spring: "Deep reds with purple undertones",
        summer: "Rich blacks with burgundy accents",
        fall: "Perfect season for all your deep colors",
        winter: "Dramatic blacks with crimson highlights"
      }
    },
    {
      name: "Sagittarius",
      dates: "Nov 22 - Dec 21",
      element: "Fire",
      image: "/sagittarus.png",
      personality: "Adventurous, optimistic, and free-spirited. Sagittarius loves bold colors, eclectic styles, and global influences.",
      overallColors: {
        primary: "#800080", // Purple
        secondary: "#FF8C00", // Dark orange
        accent: "#4B0082", // Indigo
        neutral: "#8B4513" // Saddle brown
      },
      colorPalette: [
        { name: "Royal Purple", hex: "#800080", description: "Enhances your philosophical and spiritual nature" },
        { name: "Turquoise", hex: "#40E0D0", description: "Adventure and travel energy" },
        { name: "Burnt Orange", hex: "#FF8C00", description: "Optimistic fire that matches your enthusiasm" },
        { name: "Deep Indigo", hex: "#4B0082", description: "Wisdom and higher learning" },
        { name: "Golden Brown", hex: "#B8860B", description: "Earth connection and wanderlust" }
      ],
      dailyColors: {
        Sunday: { color: "Royal Purple", hex: "#800080", energy: "Spiritual growth and philosophy" },
        Monday: { color: "Turquoise", hex: "#40E0D0", energy: "Adventure and new experiences" },
        Tuesday: { color: "Burnt Orange", hex: "#FF8C00", energy: "Enthusiasm and bold action" },
        Wednesday: { color: "Deep Indigo", hex: "#4B0082", energy: "Learning and wisdom sharing" },
        Thursday: { color: "Golden Brown", hex: "#B8860B", energy: "Practical adventure planning" },
        Friday: { color: "Teal", hex: "#008080", energy: "Social exploration and discovery" },
        Saturday: { color: "Violet", hex: "#8A2BE2", energy: "Freedom and self-expression" }
      },
      makeup: {
        eyeshadow: ["Purple tones", "Turquoise", "Golden browns", "Adventurous colors"],
        lipColor: ["Berry purple", "Coral", "Bronze", "Bold colors"],
        blush: "Warm coral or golden peach",
        highlighter: "Golden bronze or colorful",
        style: "Bold and experimental - try new trends and colors"
      },
      clothing: {
        style: "Eclectic, comfortable, and globally inspired. Mix patterns and cultures with confidence.",
        fabrics: ["Natural cottons", "Ethnic textiles", "Comfortable knits", "Travel-friendly fabrics"],
        patterns: ["Global prints", "Mixed patterns", "Ethnic designs", "Bold combinations"],
        accessories: ["Travel jewelry", "Cultural pieces", "Comfortable shoes", "Adventure gear"],
        avoid: ["Restrictive clothing", "Conservative styles", "Boring basics", "Single culture appropriation"]
      },
      seasonalTips: {
        spring: "Bright turquoise with golden accents",
        summer: "Cool purples and deep indigo",
        fall: "Rich burnt orange and golden brown",
        winter: "Royal purple with warm orange highlights"
      }
    },
    {
      name: "Capricorn",
      dates: "Dec 22 - Jan 19",
      element: "Earth",
      image: "/capricorn.png",
      personality: "Ambitious, sophisticated, and classic. Capricorn values quality, status, and timeless elegance.",
      overallColors: {
        primary: "#2F4F4F", // Dark slate gray
        secondary: "#8B4513", // Saddle brown
        accent: "#B8860B", // Dark goldenrod
        neutral: "#000000" // Black
      },
      colorPalette: [
        { name: "Charcoal Gray", hex: "#2F4F4F", description: "Professional power and sophisticated authority" },
        { name: "Rich Brown", hex: "#8B4513", description: "Earthy stability and reliable strength" },
        { name: "Classic Black", hex: "#000000", description: "Timeless elegance and executive presence" },
        { name: "Forest Green", hex: "#228B22", description: "Growth and traditional values" },
        { name: "Camel", hex: "#C19A6B", description: "Luxury and classic sophistication" }
      ],
      dailyColors: {
        Sunday: { color: "Charcoal Gray", hex: "#2F4F4F", energy: "Strategic planning and authority" },
        Monday: { color: "Classic Black", hex: "#000000", energy: "Professional power and respect" },
        Tuesday: { color: "Rich Brown", hex: "#8B4513", energy: "Steady progress and determination" },
        Wednesday: { color: "Forest Green", hex: "#228B22", energy: "Growth and practical wisdom" },
        Thursday: { color: "Camel", hex: "#C19A6B", energy: "Executive presence and luxury" },
        Friday: { color: "Navy Blue", hex: "#000080", energy: "Professional networking" },
        Saturday: { color: "Taupe", hex: "#483C32", energy: "Refined relaxation and quality time" }
      },
      makeup: {
        eyeshadow: ["Neutral browns", "Charcoal gray", "Classic blacks", "Earthy tones"],
        lipColor: ["Classic red", "Brown nude", "Rose brown", "Professional tones"],
        blush: "Subtle brown-rose or taupe",
        highlighter: "Subtle glow or champagne",
        style: "Classic and polished - invest in quality products"
      },
      clothing: {
        style: "Classic, structured, and professional. Investment pieces that last and command respect.",
        fabrics: ["Wool", "Cashmere", "High-quality cotton", "Structured materials"],
        patterns: ["Classic solids", "Pinstripes", "Subtle textures", "Traditional patterns"],
        accessories: ["Quality leather", "Classic jewelry", "Professional watches", "Status symbols"],
        avoid: ["Trendy pieces", "Cheap materials", "Flashy colors", "Overly casual wear"]
      },
      seasonalTips: {
        spring: "Soften charcoal with forest green",
        summer: "Classic black with camel accents",
        fall: "Rich browns and deep grays",
        winter: "Perfect season for your sophisticated palette"
      }
    },
    {
      name: "Aquarius",
      dates: "Jan 20 - Feb 18",
      element: "Air",
      image: "/aquarius.png",
      personality: "Unique, innovative, and eccentric. Aquarius loves unusual colors, futuristic styles, and standing out from the crowd.",
      overallColors: {
        primary: "#00FFFF", // Cyan
        secondary: "#4169E1", // Royal blue
        accent: "#9370DB", // Medium purple
        neutral: "#C0C0C0" // Silver
      },
      colorPalette: [
        { name: "Electric Blue", hex: "#00BFFF", description: "Innovative energy and forward-thinking" },
        { name: "Aquamarine", hex: "#7FFFD4", description: "Your signature color - unique and refreshing" },
        { name: "Silver", hex: "#C0C0C0", description: "Futuristic and modern like your vision" },
        { name: "Neon Green", hex: "#39FF14", description: "Unconventional color for breaking boundaries" },
        { name: "Violet", hex: "#8A2BE2", description: "Spiritual innovation and higher consciousness" }
      ],
      dailyColors: {
        Sunday: { color: "Electric Blue", hex: "#00BFFF", energy: "Innovation and original thinking" },
        Monday: { color: "Aquamarine", hex: "#7FFFD4", energy: "Unique solutions and fresh ideas" },
        Tuesday: { color: "Silver", hex: "#C0C0C0", energy: "Futuristic planning and technology" },
        Wednesday: { color: "Neon Green", hex: "#39FF14", energy: "Breaking conventions and rules" },
        Thursday: { color: "Violet", hex: "#8A2BE2", energy: "Humanitarian vision and progress" },
        Friday: { color: "Cyan", hex: "#00FFFF", energy: "Social innovation and friendship" },
        Saturday: { color: "Periwinkle", hex: "#CCCCFF", energy: "Eccentric self-expression" }
      },
      makeup: {
        eyeshadow: ["Electric blues", "Unusual purples", "Metallic silvers", "Unconventional colors"],
        lipColor: ["Blue-toned berry", "Unconventional colors", "Metallic", "Unique shades"],
        blush: "Unusual tones or skip traditional blush",
        highlighter: "Holographic or unusual colors",
        style: "Experimental and unique - don't follow trends, create them"
      },
      clothing: {
        style: "Futuristic, unconventional, and individualistic. Mix vintage with modern in unexpected ways.",
        fabrics: ["Technical fabrics", "Unusual textures", "Metallic materials", "Innovative textiles"],
        patterns: ["Geometric", "Abstract", "Futuristic prints", "Unexpected combinations"],
        accessories: ["Unique jewelry", "Tech accessories", "Unconventional pieces", "Statement items"],
        avoid: ["Following fashion rules", "Conventional styles", "Boring basics", "Mainstream trends"]
      },
      seasonalTips: {
        spring: "Electric blue with fresh aquamarine",
        summer: "Cool silvers and neon accents",
        fall: "Unusual violets with metallic touches",
        winter: "Futuristic silvers with electric highlights"
      }
    },
    {
      name: "Pisces",
      dates: "Feb 19 - Mar 20",
      element: "Water",
      image: "/pisces.png",
      personality: "Dreamy, artistic, and intuitive. Pisces loves soft colors, flowing fabrics, and ethereal beauty.",
      overallColors: {
        primary: "#9370DB", // Medium purple
        secondary: "#7FFFD4", // Aquamarine
        accent: "#FFB6C1", // Light pink
        neutral: "#F8F8FF" // Ghost white
      },
      colorPalette: [
        { name: "Sea Green", hex: "#2E8B57", description: "Connects you to ocean energy and intuition" },
        { name: "Lavender", hex: "#E6E6FA", description: "Dreamy color that enhances your psychic abilities" },
        { name: "Soft Pink", hex: "#FFB6C1", description: "Romantic and gentle like your compassionate heart" },
        { name: "Aquamarine", hex: "#7FFFD4", description: "Your water element color for emotional flow" },
        { name: "Pearl White", hex: "#F8F8FF", description: "Pure and spiritual like your soul" }
      ],
      dailyColors: {
        Sunday: { color: "Sea Green", hex: "#2E8B57", energy: "Spiritual connection and intuition" },
        Monday: { color: "Lavender", hex: "#E6E6FA", energy: "Dreamy inspiration and creativity" },
        Tuesday: { color: "Soft Pink", hex: "#FFB6C1", energy: "Compassionate action and love" },
        Wednesday: { color: "Aquamarine", hex: "#7FFFD4", energy: "Emotional flow and communication" },
        Thursday: { color: "Pearl White", hex: "#F8F8FF", energy: "Spiritual clarity and purity" },
        Friday: { color: "Lilac", hex: "#C8A2C8", energy: "Artistic expression and beauty" },
        Saturday: { color: "Seafoam", hex: "#93E9BE", energy: "Peaceful dreams and relaxation" }
      },
      makeup: {
        eyeshadow: ["Soft purples", "Ocean blues", "Pearl tones", "Ethereal colors"],
        lipColor: ["Soft pink", "Coral", "Berry stain", "Natural tones"],
        blush: "Soft rose or coral",
        highlighter: "Pearl or iridescent glow",
        style: "Soft and dreamy - create an ethereal goddess look"
      },
      clothing: {
        style: "Flowing, romantic, and artistic. Pieces that move like water and inspire dreams.",
        fabrics: ["Chiffon", "Silk", "Flowing materials", "Soft textures", "Ethereal fabrics"],
        patterns: ["Watercolor prints", "Abstract art", "Flowing designs", "Dreamy patterns"],
        accessories: ["Artistic jewelry", "Flowing scarves", "Unique pieces", "Spiritual symbols"],
        avoid: ["Sharp edges", "Harsh colors", "Rigid structures", "Aggressive patterns"]
      },
      seasonalTips: {
        spring: "Soft sea green with pearl accents",
        summer: "Cool aquamarine and lavender",
        fall: "Warm soft pink with lilac",
        winter: "Dreamy pearl white with seafoam"
      }
    }
  ];

  const getCurrentZodiacStyle = () => {
    return zodiacStyles.find(style => style.name === selectedSign) || zodiacStyles[0];
  };

  const currentStyle = getCurrentZodiacStyle();

  return (
    <div className="pt-28">
        <HeaderMenu/>
      {/* Hero Section */}
      <div className="w-full max-w-4xl mx-auto mb-12">
        <div className="cosmic-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-cosmic-accent-1 opacity-20 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-cosmic-accent-2 opacity-20 blur-3xl"></div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r bg-clip-text">
            Cosmic Style Guide
          </h1>
          <p className="text-lg mb-8 text-gray-300 text-center max-w-2xl mx-auto">
            Discover your perfect colors, makeup, and fashion style based on your zodiac sign's unique energy and personality traits.
          </p>
        </div>
      </div>

      {/* Zodiac Sign Selector */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <div className="cosmic-glass rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-logo-yellow">Choose Your Zodiac Sign</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-3">
            {zodiacStyles.map((style) => (
              <button
                key={style.name}
                onClick={() => setSelectedSign(style.name)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  selectedSign === style.name
                    ? 'cosmic-card-highlight border-2 border-logo-yellow'
                    : 'cosmic-glass hover:border border-cosmic-glass-border hover:border-logo-yellow/50'
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden mb-1">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-xs text-center">{style.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="cosmic-glass rounded-xl p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: StarIcon },
              { id: 'colors', label: 'Color Palette', icon: PaletteIcon },
              { id: 'daily', label: 'Daily Colors', icon: CalendarIcon },
              { id: 'makeup', label: 'Makeup', icon: EyeIcon },
              { id: 'clothing', label: 'Fashion', icon: ShirtIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-logo-yellow text-black'
                    : 'text-white hover:bg-cosmic-glass'
                }`}
              >
                <tab.icon size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="cosmic-card rounded-xl p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-logo-yellow">
                  <img
                    src={currentStyle.image}
                    alt={currentStyle.name}
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-logo-yellow">{currentStyle.name}</h3>
                  <p className="text-gray-400 mb-4">{currentStyle.dates} • {currentStyle.element} Sign</p>
                  <p className="text-gray-300">{currentStyle.personality}</p>
                </div>
              </div>
            </div>

            {/* Primary Colors */}
            <div className="cosmic-glass rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-4 text-logo-yellow">Your Power Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(currentStyle.overallColors).map(([type, color]) => (
                  <div key={type} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white/20"
                      style={{ backgroundColor: color }}
                    />
                    <p className="capitalize text-sm font-medium">{type}</p>
                    <p className="text-xs text-gray-400">{color}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="cosmic-card rounded-xl p-8">
            <h4 className="text-xl font-semibold mb-6 text-logo-yellow">Complete Color Palette</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentStyle.colorPalette.map((color, index) => (
                <div key={index} className="cosmic-glass rounded-lg p-4">
                  <div 
                    className="w-full h-20 rounded-lg mb-3 border-2 border-white/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h5 className="font-semibold mb-1">{color.name}</h5>
                  <p className="text-xs text-gray-400 mb-2">{color.hex}</p>
                  <p className="text-sm text-gray-300">{color.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Colors Tab */}
        {activeTab === 'daily' && (
          <div className="cosmic-card rounded-xl p-8">
            <h4 className="text-xl font-semibold mb-6 text-logo-yellow">Daily Color Guide</h4>
            <div className="mb-6 p-4 cosmic-glass rounded-lg">
              <h5 className="font-semibold mb-2">Today is {currentDay}</h5>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full border-2 border-logo-yellow"
                  style={{ backgroundColor: currentStyle.dailyColors[currentDay]?.hex }}
                />
                <div>
                  <p className="font-medium">{currentStyle.dailyColors[currentDay]?.color}</p>
                  <p className="text-sm text-gray-400">{currentStyle.dailyColors[currentDay]?.energy}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(currentStyle.dailyColors).map(([day, info]) => (
                <div key={day} className={`cosmic-glass rounded-lg p-4 ${day === currentDay ? 'border border-logo-yellow' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: info.hex }}
                    />
                    <div>
                      <p className="font-medium">{day}</p>
                      <p className="text-sm text-gray-400">{info.color}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{info.energy}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Makeup Tab */}
        {activeTab === 'makeup' && (
          <div className="cosmic-card rounded-xl p-8">
            <h4 className="text-xl font-semibold mb-6 text-logo-yellow">Makeup Guide</h4>
            <div className="space-y-6">
              <div className="cosmic-glass rounded-lg p-6">
                <h5 className="font-semibold mb-3 flex items-center">
                  <SparklesIcon className="mr-2" size={16} />
                  Your Makeup Style
                </h5>
                <p className="text-gray-300">{currentStyle.makeup.style}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="cosmic-glass rounded-lg p-4">
                  <h6 className="font-semibold mb-3">Eyeshadow Colors</h6>
                  <div className="space-y-2">
                    {currentStyle.makeup.eyeshadow.map((color, index) => (
                      <div key={index} className="flex items-center">
                        <SparklesIcon size={12} className="mr-2 text-logo-yellow" />
                        <span className="text-sm">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="cosmic-glass rounded-lg p-4">
                  <h6 className="font-semibold mb-3">Lip Colors</h6>
                  <div className="space-y-2">
                    {currentStyle.makeup.lipColor.map((color, index) => (
                      <div key={index} className="flex items-center">
                        <SparklesIcon size={12} className="mr-2 text-logo-yellow" />
                        <span className="text-sm">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="cosmic-glass rounded-lg p-4">
                  <h6 className="font-semibold mb-2">Blush</h6>
                  <p className="text-sm text-gray-300">{currentStyle.makeup.blush}</p>
                </div>
                
                <div className="cosmic-glass rounded-lg p-4">
                  <h6 className="font-semibold mb-2">Highlighter</h6>
                  <p className="text-sm text-gray-300">{currentStyle.makeup.highlighter}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clothing Tab */}
        {activeTab === 'clothing' && (
          <div className="space-y-8">
            <div className="cosmic-card rounded-xl p-8">
              <h4 className="text-xl font-semibold mb-6 text-logo-yellow">Fashion Guide</h4>
              
              <div className="cosmic-glass rounded-lg p-6 mb-6">
                <h5 className="font-semibold mb-3">Your Style Personality</h5>
                <p className="text-gray-300">{currentStyle.clothing.style}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="cosmic-glass rounded-lg p-4">
                  <h6 className="font-semibold mb-3 text-kingdom-forest">Recommended Fabrics</h6>
                  <div className="space-y-2">
                    {currentStyle.clothing.fabrics.map((fabric, index) => (
                      <div key={index} className="flex items-center">
                        <SparklesIcon size={12} className="mr-2 text-kingdom-forest" />
                        <span className="text-sm">{fabric}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="cosmic-glass rounded-lg p-4">
                  <h6 className="font-semibold mb-3 text-kingdom-crystal">Perfect Patterns</h6>
                  <div className="space-y-2">
                    {currentStyle.clothing.patterns.map((pattern, index) => (
                      <div key={index} className="flex items-center">
                        <SparklesIcon size={12} className="mr-2 text-kingdom-crystal" />
                        <span className="text-sm">{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="cosmic-glass rounded-lg p-4">
                  <h6 className="font-semibold mb-3 text-kingdom-cloud">Accessories</h6>
                  <div className="space-y-2">
                    {currentStyle.clothing.accessories.map((accessory, index) => (
                      <div key={index} className="flex items-center">
                        <SparklesIcon size={12} className="mr-2 text-kingdom-cloud" />
                        <span className="text-sm">{accessory}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="cosmic-glass rounded-lg p-4">
                  <h6 className="font-semibold mb-3 text-red-400">Avoid</h6>
                  <div className="space-y-2">
                    {currentStyle.clothing.avoid.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span className="mr-2 text-red-400">×</span>
                        <span className="text-sm text-gray-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Seasonal Tips */}
            <div className="cosmic-card rounded-xl p-8">
              <h4 className="text-xl font-semibold mb-6 text-logo-yellow">Seasonal Style Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(currentStyle.seasonalTips).map(([season, tip]) => (
                  <div key={season} className="cosmic-glass rounded-lg p-4">
                    <h6 className="font-semibold mb-2 capitalize text-logo-yellow">{season}</h6>
                    <p className="text-sm text-gray-300">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
      </div>
      <FooterLinks/>
    </div>
  );
}