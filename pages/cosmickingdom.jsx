import { useEffect, useState } from "react";
import { HeaderMenu } from "../components/HeaderMenu";
import {
  TreePineIcon,
  FlowerIcon,
  Leaf,
  Sparkles,
  Droplets,
  Star,
  CloudIcon,
  LockIcon,
  UnlockIcon,
  GiftIcon,
  ClockIcon
} from "lucide-react";

// PLANTS
const plants = [
  {
    id: "stardust-flower",
    name: "Stardust Flower",
    icon: FlowerIcon,
    type: "Cosmic Bloom",
    color: "text-pink-400",
    bgColor: "bg-pink-400",
    growthTime: 15,
    waterNeeded: 3,
    starlightNeeded: 5,
    rewards: { starlight: 15, cosmicWater: 5, magicSeeds: 2 }
  },
  {
    id: "wisdom-tree",
    name: "Wisdom Tree",
    icon: TreePineIcon,
    type: "Ancient Guardian",
    color: "text-green-400",
    bgColor: "bg-green-400",
    growthTime: 30,
    waterNeeded: 5,
    starlightNeeded: 8,
    rewards: { starlight: 25, cosmicWater: 10, magicSeeds: 5 }
  },
  {
    id: "crystal-leaf",
    name: "Crystal Leaf",
    icon: Leaf,
    type: "Mineral Plant",
    color: "text-purple-400",
    bgColor: "bg-purple-400",
    growthTime: 20,
    waterNeeded: 4,
    starlightNeeded: 6,
    rewards: { starlight: 20, cosmicWater: 8, magicSeeds: 3 }
  },
  {
    id: "dream-vine",
    name: "Dream Vine",
    icon: Sparkles,
    type: "Mystical Climber",
    color: "text-blue-400",
    bgColor: "bg-blue-500",
    growthTime: 25,
    waterNeeded: 6,
    starlightNeeded: 7,
    rewards: { starlight: 18, cosmicWater: 12, magicSeeds: 4 }
  }
];

const initialIslands = [
  {
    id: "celestial",
    name: "Celestial Gardens",
    theme: "Starlight & Cosmic Energy",
    unlocked: true,
    unlockCost: 0,
    plots: Array.from({ length: 4 }, (_, i) => ({
      id: `celestial-${i}`,
      plantId: null,
      stage: 0,
      plantedAt: null,
      wateredAt: null,
      isReady: false
    })),
    background: "bg-gradient-to-br from-purple-900 to-indigo-900"
  },
  {
    id: "ethereal",
    name: "Ethereal Clouds",
    theme: "Dreams & Inspiration",
    unlocked: false,
    unlockCost: 50,
    plots: Array.from({ length: 6 }, (_, i) => ({
      id: `ethereal-${i}`,
      plantId: null,
      stage: 0,
      plantedAt: null,
      wateredAt: null,
      isReady: false
    })),
    background: "bg-gradient-to-br from-blue-900 to-cyan-800"
  },
  {
    id: "mystical",
    name: "Mystical Crystals",
    theme: "Wisdom & Crystal Energy",
    unlocked: false,
    unlockCost: 100,
    plots: Array.from({ length: 8 }, (_, i) => ({
      id: `mystical-${i}`,
      plantId: null,
      stage: 0,
      plantedAt: null,
      wateredAt: null,
      isReady: false
    })),
    background: "bg-gradient-to-br from-fuchsia-800 to-pink-800"
  }
];

export default function CosmicKingdom() {
  const [islands, setIslands] = useState(initialIslands);
  const [resources, setResources] = useState({
    starlight: 100,
    cosmicWater: 50,
    magicSeeds: 10
  });
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [selectedIslandId, setSelectedIslandId] = useState("celestial");
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [showDailyReward, setShowDailyReward] = useState(true);

  const selectedIsland = islands.find((i) => i.id === selectedIslandId);
  const selectedPlant = plants.find((p) => p.id === selectedPlantId);

  const formatTime = (minutes) => {
    if (minutes < 60) return `${Math.floor(minutes)}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const unlockIsland = (id) => {
    const target = islands.find((i) => i.id === id);
    if (!target || target.unlocked || resources.starlight < target.unlockCost) return;

    const updated = islands.map((i) =>
      i.id === id ? { ...i, unlocked: true } : i
    );
    setIslands(updated);
    setResources({
      ...resources,
      starlight: resources.starlight - target.unlockCost
    });
  };

  const handlePlant = (plotId) => {
    if (!selectedPlant || resources.magicSeeds < 1 || resources.starlight < selectedPlant.starlightNeeded) {
      alert("Not enough resources or no plant selected");
      return;
    }

    const updated = islands.map((island) => {
      if (island.id !== selectedIslandId) return island;
      const newPlots = island.plots.map((plot) => {
        if (plot.id === plotId && !plot.plantId) {
          return {
            ...plot,
            plantId: selectedPlant.id,
            plantedAt: Date.now(),
            wateredAt: null,
            stage: 0,
            isReady: false
          };
        }
        return plot;
      });
      return { ...island, plots: newPlots };
    });

    setIslands(updated);
    setResources((prev) => ({
      ...prev,
      magicSeeds: prev.magicSeeds - 1,
      starlight: prev.starlight - selectedPlant.starlightNeeded
    }));
    setSelectedPlantId(null);
  };

  const handleWater = (plotId) => {
    if (resources.cosmicWater < 1) return;

    const updated = islands.map((island) => {
      if (island.id !== selectedIslandId) return island;
      const newPlots = island.plots.map((plot) =>
        plot.id === plotId && plot.plantId && !plot.wateredAt
          ? { ...plot, wateredAt: Date.now() }
          : plot
      );
      return { ...island, plots: newPlots };
    });

    setIslands(updated);
    setResources((prev) => ({ ...prev, cosmicWater: prev.cosmicWater - 1 }));
  };

  const handleHarvest = (plotId) => {
    const updated = islands.map((island) => {
      if (island.id !== selectedIslandId) return island;
      const newPlots = island.plots.map((plot) => {
        if (plot.id === plotId && plot.isReady) {
          const plant = plants.find((p) => p.id === plot.plantId);
          if (!plant) return plot;

          setResources((prev) => ({
            starlight: prev.starlight + plant.rewards.starlight,
            cosmicWater: prev.cosmicWater + plant.rewards.cosmicWater,
            magicSeeds: prev.magicSeeds + plant.rewards.magicSeeds
          }));

          const newXP = experience + 10;
          setExperience(newXP);
          setLevel(Math.floor(newXP / 100) + 1);

          return {
            ...plot,
            plantId: null,
            wateredAt: null,
            plantedAt: null,
            stage: 0,
            isReady: false
          };
        }
        return plot;
      });
      return { ...island, plots: newPlots };
    });

    setIslands(updated);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const updated = islands.map((island) => {
        const newPlots = island.plots.map((plot) => {
          if (plot.plantId && plot.wateredAt) {
            const plant = plants.find((p) => p.id === plot.plantId);
            const elapsed = (now - plot.wateredAt) / 60000;
            const stage = Math.min(
              Math.floor((elapsed / plant.growthTime) * 5),
              4
            );
            const isReady = elapsed >= plant.growthTime;
            return { ...plot, stage, isReady };
          }
          return plot;
        });
        return { ...island, plots: newPlots };
      });
      setIslands(updated);
    }, 60000);
    return () => clearInterval(interval);
  }, [islands]);

  return (
    <div className="w-full flex flex-col min-h-screen px-4 py-8 bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      {showDailyReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/50 rounded-xl p-8 mx-4 text-center max-w-md">
            <GiftIcon className="mx-auto w-12 h-12 text-yellow-400 mb-2 animate-bounce" />
            <h2 className="text-yellow-400 text-xl font-bold mb-4">Daily Cosmic Gift!</h2>
            <p className="mb-2">🌟+50 Starlight</p>
            <p className="mb-2">💦+25 Cosmic Water</p>
            <p className="mb-4">🌱+5 Magic Seeds</p>
            <button
              onClick={() => {
                setResources((prev) => ({
                  starlight: prev.starlight + 50,
                  cosmicWater: prev.cosmicWater + 25,
                  magicSeeds: prev.magicSeeds + 5
                }));
                setShowDailyReward(false);
              }}
              className="bg-yellow-400 text-black px-6 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Claim Rewards
            </button>
          </div>
        </div>
      )}
        <HeaderMenu />
      <div className="text-center mb-6 mt-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text">Cosmic Kingdom</h1>
        <p className="text-sm">Level {level} Gardener · XP {experience}</p>
        <div className="mt-2 flex justify-center gap-4 text-sm">
          <span>⭐ {resources.starlight}</span>
          <span>💧 {resources.cosmicWater}</span>
          <span>🌱 {resources.magicSeeds}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {islands.map((island) => (
          <button
            key={island.id}
            onClick={() => island.unlocked ? setSelectedIslandId(island.id) : unlockIsland(island.id)}
            className={`p-4 rounded-xl transition-all text-left ${
              island.background
            } ${selectedIslandId === island.id ? "ring-2 ring-yellow-300" : ""}`}
          >
            <div className="floating-island w-full h-32 mb-4 animate-islandFloat relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {island.unlocked ? (
                  <span className="text-2xl">🏝️</span>
                ) : (
                  <LockIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {!island.unlocked && (
                <div className="absolute bottom-2 right-2 bg-black/70 rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {island.unlockCost}
                </div>
              )}
            </div>
            <h3 className="font-semibold">{island.name}</h3>
            <p className="text-sm text-gray-300">{island.theme}</p>
            <p className="text-xs text-gray-400">{island.plots.length} Garden Plots</p>
          </button>
        ))}
      </div>

      <h2 className="text-xl font-bold text-yellow-300 text-center mb-4">Select a Seed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {plants.map((plant) => (
          <button
            key={plant.id}
            onClick={() =>
              setSelectedPlantId((prev) => (prev === plant.id ? null : plant.id))
            }
            className={`p-4 rounded-xl transition-all text-center ${
              selectedPlantId === plant.id
                ? "ring-2 ring-yellow-300 scale-105"
                : "bg-indigo-800"
            }`}
          >
            <div className={`w-10 h-10 mx-auto mb-2 rounded-full ${plant.bgColor} flex items-center justify-center`}>
              <plant.icon className="w-5 h-5 text-white" />
            </div>
            <h4 className={`text-sm font-semibold ${plant.color}`}>{plant.name}</h4>
            <p className="text-xs text-gray-300">{plant.type}</p>
            <p className="text-xs mt-1">
              ⏱ {formatTime(plant.growthTime)} • ⭐ {plant.starlightNeeded}
            </p>
          </button>
        ))}
      </div>

      <h2 className="text-xl font-bold text-yellow-300 text-center mb-4">{selectedIsland?.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedIsland?.plots.map((plot) => {
          const plant = plants.find((p) => p.id === plot.plantId);
          return (
            <div
              key={plot.id}
              className="bg-indigo-700 p-4 rounded-xl text-center"
              onClick={() =>
                plot.plantId
                  ? plot.isReady && handleHarvest(plot.id)
                  : handlePlant(plot.id)
              }
            >
              {plot.plantId && plant ? (
                <>
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-full ${plant.bgColor} flex items-center justify-center`}>
                    <plant.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm">{plant.name}</p>
                  <p className="text-xs text-gray-300">Stage {plot.stage + 1}</p>
                  {plot.isReady && <p className="text-xs text-yellow-300">Ready!</p>}
                  {!plot.wateredAt && (
                    <button
                      onClick={() => handleWater(plot.id)}
                      className="mt-2 text-xs text-blue-300"
                    >
                      💧 Water
                    </button>
                  )}
                </>
              ) : (
                <>
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-gray-300">+</span>
                  </div>
                  <p className="text-sm text-gray-400">Empty Plot</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
