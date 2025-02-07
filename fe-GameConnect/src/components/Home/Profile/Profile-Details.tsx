import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import type { Profile } from "../../types/profile";
import { useState } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

interface ProfileDetailsProps {
  profile: Profile;
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  const [recipientAddress, setRecipientAddress] = useState(""); // State cho địa chỉ người nhận
  const [amountToSend, setAmountToSend] = useState(""); // State cho số tiền
  const { sendTransaction } = useSendTransaction();

  const handleSendPayment = async () => {
    try {
      if (!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress)) {
        console.error("Invalid Ethereum address");
        return;
      }

      const tx = await sendTransaction({
        to: recipientAddress as `0x${string}`, // Type assertion
        value: parseEther(amountToSend),
      });
      console.log("Transaction sent:", tx);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className="space-y-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <img
          src={profile.imageUrl}
          alt={profile.username}
          className="h-24 w-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{profile.username}</h2>
            <span role="img" aria-label="verified">
              👑
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{profile.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {profile.bio || "No bio available"}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.badges.map((badge) => (
              <Badge key={badge} variant="secondary" className="bg-gray-300">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium">Status</p>
          <p
            className={`${
              profile.status === "online" ? "text-green-500" : "text-gray-500"
            }`}
          >
            {profile.status || "offline"}
          </p>
        </div>
        <div>
          <p className="font-medium">Last seen</p>
          <p className="text-gray-500">
            {profile.lastSeen
              ? new Date(profile.lastSeen).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>
      <Separator />
      <div className="mt-4">
        <h3 className="font-bold">Wallet Address:</h3>
        <p className="text-gray-300">{profile.walletAddress}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Hourly Rate:</h3>
        <p className="text-gray-300">{profile.hourlyRate} KAI</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Send Payment:</h3>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          required
        />
        <input
          type="text"
          placeholder="Amount (ETH)"
          value={amountToSend}
          onChange={(e) => setAmountToSend(e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          required
        />
        <button
          onClick={handleSendPayment}
          className="p-2 bg-blue-500 text-white rounded flex justify-center items-center"
        >
          Send Payment
        </button>
      </div>
    </div>
  );
}
