import { CommunityTop } from "@/components/Home/Communication/CommunityTop";
import { Feed } from "@/components/Home/Communication/Feed";
import Game from "@/components/Home/Communication/Game";
import { Navigation } from "@/components/Home/Communication/Navigation";
import { Sidebar } from "@/components/Home/Communication/SideBar";
import { CreatePost } from "@/components/Home/Communication/CreatePost";
import { useState, useEffect } from "react";
import { Post, User } from "@/components/types/post";

const currentUser: User = {
  id: "1",
  name: "Current User",
  avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${Math.random()}`,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("latest");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        id: "2",
        name: `Stellar Forger⚔️
              @Stellar Forger`,
        avatar: `static/Services/game3.png`,
      },
      content: `Happy New Year to all Forgers! 🎉

We're thrilled to share that Stellar Forger Alpha is coming soon! ☄️ Let's make 2025 a year of growth, innovation, and unforgettable moments together. Thank you for being part of this incredible journey`,
      image: "static/post/newyear.png",
      timestamp: "4 minutes ago",
      likes: 100,
      comments: 0,
    },
    {
      id: 2,
      author: {
        id: "2",
        name: `Onchain Clash⚔️🏆
        @OnchainClash`,
        avatar: `static/Services/game2.png`,
      },
      content: `How will you rise above the waves & claim victory in #OCC? 🌊 🏆

    1️⃣ Dominate: Eliminate both rival factions to claim ultimate victory.
    1️⃣ Outlast: If time runs out, the faction with the most territories wins.

      The victorious team takes home the ENTIRE prize pool, funded by player cell purchases. 💵💰😌`,
      image: "static/post/onchclash.png",
      timestamp: "30 minutes ago",
      likes: 1,
      comments: 0,
    },
    {
      id: 3,
      author: {
        id: "2",
        name: `Zone Nine 🪓🧟
              @Zone9Survival`,
        avatar: `static/Services/game1.png`,
      },
      content: `They call it Garbage Camp Gate. A haven of hope and hell, where the only rule is survival. 
Lawless. Ruthless. Broken.
Here, in the Free Zone, shattered lives collide, gunfire is the common tongue and zols are worth more than life.
Welcome to the Free Zone. No gods. No masters. Not even Machine God.`,
      image: "static/post/zonenine.png",
      timestamp: " 1 hours ago",
      likes: 1,
      comments: 0,
    },
  ]);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const addPost = (
    newPost: Omit<Post, "id" | "timestamp" | "likes" | "comments">
  ) => {
    const updatedPosts = [
      {
        ...newPost,
        id: posts.length + 1,
        timestamp: "just now",
        likes: 0,
        comments: 0,
      },
      ...posts,
    ];

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setIsCreatePostOpen(false);
  };

  return (
    <div className="min-h-screen text-white">
      <h1 className="font-bangers flex relative m-12 text-3xl">
        Communication
      </h1>

      <Game />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <Sidebar
            onCreatePost={() => setIsCreatePostOpen(true)}
            currentUser={currentUser}
          />

          <main className="flex-1">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            <Feed posts={posts} />
          </main>

          <aside className="w-80">
            <CommunityTop />
          </aside>
        </div>
      </div>

      {isCreatePostOpen && (
        <CreatePost
          onPostCreated={addPost}
          onClose={() => setIsCreatePostOpen(false)}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
