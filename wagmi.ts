import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, mainnet } from "wagmi/chains";
import {
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  rabbyWallet,
  walletConnectWallet,
  braveWallet,
  safeWallet,
  ledgerWallet,
  binanceWallet,
} from "@rainbow-me/rainbowkit/wallets";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

export const config = getDefaultConfig({
  appName: "v-0",
  projectId: projectId,
  chains: [mainnet, bsc],
  ssr: true,
  wallets: [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        trustWallet,
        coinbaseWallet,
        walletConnectWallet,
        braveWallet,
        safeWallet,
        ledgerWallet,
        rabbyWallet,
        binanceWallet,
      ],
    },
  ],
});
