import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ImageUpload from "./ImageUpload";
import type { Profile } from "../../types/profile";
import { 
  type BaseError,
  useWriteContract 
} from 'wagmi';
import { GamerProfileWithCommentsABI } from '../../../abis/GamerProfileWithComments'; // Adjust the path as necessary

const contractAddress = '0x4a9C121080f6D9250Fc0143f41B595fD172E31bf'; // Replace with your contract address

interface ProfileFormProps {
  onSubmit: (profile: Profile) => void;
  onCancel: () => void;
}

export default function ProfileForm({ onSubmit, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState<{
    hourlyRate: string;
    username: string;
    walletAddress: string;
    imageType: "url" | "upload";
    imageUrl: string;
    imageFile: string;
    badges: string;
    bio: string;
    status: "online" | "offline";
  }>({
    hourlyRate: "",
    username: "",
    walletAddress: "",
    imageType: "url",
    imageUrl: "",
    imageFile: "",
    badges: "",
    bio: "",
    status: "online",
  });

  const { 
    data: hash,
    error,
    isPending, 
    writeContract 
  } = useWriteContract();

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setFormData({
        hourlyRate: parsedProfile.hourlyRate || "",
        username: parsedProfile.username || "",
        walletAddress: parsedProfile.walletAddress || "",
        imageType: parsedProfile.imageType || "url",
        imageUrl: parsedProfile.imageUrl || "",
        imageFile: parsedProfile.imageFile || "",
        badges: parsedProfile.badges.join(", ") || "",
        bio: parsedProfile.bio || "",
        status: parsedProfile.status || "online",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageTypeChange = (value: "url" | "upload") => {
    setFormData((prevData) => ({ ...prevData, imageType: value }));
  };

  const handleImageSelected = (imageData: string) => {
    setFormData((prevData) => ({ ...prevData, imageFile: imageData }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = {
      ...formData,
      imageUrl:
        formData.imageType === "url" ? formData.imageUrl : formData.imageFile,
      badges: formData.badges.split(",").map((badge) => badge.trim()),
      interactions: 0,
      status: formData.status as "online" | "offline",
      lastSeen: new Date(),
      rating: 5.0,
    };

    // Ensure writeContract is a function before calling it
    if (writeContract) {
      await writeContract({
        address: contractAddress,
        abi: GamerProfileWithCommentsABI,
        functionName: 'createProfile',
        args: [BigInt(profileData.hourlyRate), profileData.username, profileData.bio], // Pass the correct arguments
      });
    } else {
      console.error("write function is not available");
    }

    onSubmit(profileData); // Call the onSubmit prop with the profile data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-2xl font-bold mb-2 font-bangers">
        Create New Profile
      </h2>
      <div className="space-y-1">
        <Label htmlFor="hourlyRate">Hourly Rate</Label>
        <Input
          id="hourlyRate"
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          placeholder="Enter hourly rate"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="walletAddress">Wallet Address</Label>
        <Input
          id="walletAddress"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleChange}
          placeholder="Enter your wallet address"
          required
        />
      </div>
      <div className="space-y-1">
        <Label>Profile Image</Label>
        <RadioGroup
          defaultValue="url"
          onValueChange={handleImageTypeChange}
          className="flex"
        >
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="url" id="url" className="bg-white" />
            <Label htmlFor="url">Image URL</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="upload" id="upload" className="bg-white" />
            <Label htmlFor="upload">Upload Image</Label>
          </div>
        </RadioGroup>
      </div>
      {formData.imageType === "url" ? (
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            required={formData.imageType === "url"}
          />
        </div>
      ) : (
        <ImageUpload onImageSelected={handleImageSelected} />
      )}
      <div className="space-y-1">
        <Label htmlFor="badges">Badges</Label>
        <Input
          id="badges"
          name="badges"
          value={formData.badges}
          onChange={handleChange}
          placeholder="Enter badges (comma-separated)"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Enter bio"
          required
        />
      </div>
      <div className="flex justify-end space-x-1">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Profile'}
        </Button>
      </div>
      {hash && (
        <div style={{ marginTop: '5px', color: 'white', overflowWrap: 'break-word' }}>
          Transaction Hash: {hash}
        </div>
      )}
      {error && (
        <div style={{ marginTop: '5px', color: 'white', overflowWrap: 'break-word' }}>
          Error: {(error as BaseError).shortMessage || error.message}
        </div>
      )}
    </form>
  );
}
