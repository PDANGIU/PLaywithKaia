import ProfileCard from "./Profile-Card";
import { Button } from "@/components/ui/button";
import ProfileForm from "./Profile-form";
import { useState, useEffect } from "react";
import { Profile } from "../../types/profile";
import Modal from "./Modal";

const initialProfiles = [
  {
    username: "Lissa",
    imageUrl: "static/Card/image4.png",
    badges: ["GAMING SCORES", "NEWS", "E-CHAT"],
    interactions: 9,
    bio: "Passionate gamer and creative content maker.",
    status: "online" as const,
    lastSeen: new Date(),
    rating: 5.0,
    hourlyRate: "20",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    username: "Squiddu",
    imageUrl: "static/Card/Squiddu.png",
    badges: ["E-CHAT", "NEWS", "Zone Nine"],
    interactions: 6,
    bio: "Exploring the world of League of Legends one match at a time.",
    status: "offline" as const,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    rating: 5.0,
    hourlyRate: "15",
    walletAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
  },
  {
    username: "Thor",
    imageUrl: "static/Card/image2.png",
    badges: ["E-CHAT", "NEWS", "Stellar Forger"],
    interactions: 9,
    bio: "Lightning-fast reflexes and a love for epic battles.",
    status: "online" as const,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    rating: 5.0,
    hourlyRate: "25",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    username: "Rikuuen",
    imageUrl: "static/Card/Rikuuen.png",
    badges: ["E-CHAT", "NEWS", "Onchain Clash"],
    interactions: 4,
    bio: "Gaming enthusiast with a knack for strategy.",
    status: "online" as const,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    rating: 5.0,
    hourlyRate: "18",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    username: "Johnny",
    imageUrl: "static/Card/johnny.png",
    badges: ["E-CHAT", "NEWS", "Omnizone"],
    interactions: 5,
    bio: "Dedicated to climbing the ranks in the gaming world.",
    status: "offline" as const,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    rating: 5.0,
    hourlyRate: "22",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    username: "CatLord",
    imageUrl: "static/Card/image6.png",
    badges: ["E-CHAT", "MasterDuel", "Omnizone"],
    interactions: 3,
    bio: "Master strategist with a love for cats and cards.",
    status: "online" as const,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    rating: 5.0,
    hourlyRate: "30",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    username: "Sparrow",
    imageUrl: "static/Card/image7.png",
    badges: ["E-CHAT", "NEWS", "Omnizone"],
    interactions: 4,
    bio: "Soaring through gaming adventures with style.",
    status: "offline" as const,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    rating: 5.0,
    hourlyRate: "19",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    username: "Prodev",
    imageUrl: "static/Card/image1.png",
    badges: ["E-CHAT", "Stellar Forger", "Zone Nine"],
    interactions: 4,
    bio: "Tech enthusiast by day, gaming legend by night.",
    status: "offline" as const,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    rating: 5.0,
    hourlyRate: "28",
    walletAddress: "0xB696e6E549d2b35Ee5a75F95bC306F9Fea550468",
  },
];

export default function ProfileGrid() {
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem("profiles");
    return savedProfiles ? JSON.parse(savedProfiles) : initialProfiles;
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const handleCreateProfile = (newProfile: Profile) => {
    setProfiles([
      ...profiles,
      {
        ...newProfile,
        bio: newProfile.bio || "No bio available",
        status: newProfile.status || "offline",
        lastSeen: newProfile.lastSeen || new Date(),
      },
    ]);
  };

  return (
    <section className="pt-[3rem] pb-[2rem]">
      <div className="relative lg:mx-auto max-w-5xl mx-[1rem]">
        <div className="flex justify-between items-center mb-[1rem]">
          <h1 className="text-[2rem] font-bold font-bangers">ProFile</h1>
          <Button
            onClick={() => setShowForm(true)}
            className="text-[2rem] font-bold font-bangers"
          >
            Create Profile
          </Button>
        </div>
        <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
          <ProfileForm
            onSubmit={handleCreateProfile}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((profile: Profile) => (
            <ProfileCard key={profile.username} {...profile} />
          ))}
        </div>
      </div>
    </section>
  );
}
