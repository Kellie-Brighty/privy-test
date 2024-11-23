import { http, createConfig } from "wagmi";
import { baseSepolia, optimismSepolia,  } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { projectId } from "./project.config";

export const config = createConfig({
  chains: [baseSepolia, optimismSepolia],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [baseSepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
});