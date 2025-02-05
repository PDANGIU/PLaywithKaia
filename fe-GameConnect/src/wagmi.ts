import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { kairos } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [kairos],
  ssr: true,
});
