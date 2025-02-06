import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Search } from "./Search";
import merry from "../../../public/static/merry.svg";
import { getUserByAddr } from "@/services/userService"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchUser = async () => {
      if (!address) return;
      const user = await getUserByAddr(address as string);
      console.log("User data: ", user);
    }
    fetchUser();
  }, [isConnected, address]);

  return (
    <nav className="bg-background px-4 sm:px-6 lg:px-16 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6  font-bangers">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold flex items-center space-x-2"
          >
            <span>PlaywithKaia</span>
            <img src={merry} alt="Merry" className="h-10 w-10" />
          </Link>
          <Link to="/communication" className="text-2xl font-bold">
            <span>Communication</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Search />
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <ConnectButton />
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 flex flex-row">
          <Search />
          <div className="flex float-end justify-end ml-auto ">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <ConnectButton />
          </div>
        </div>
      )}
    </nav>
  );
}
