// Set of helper functions to facilitate wallet setup

import {
  BASE_BSC_SCAN_URL, BASE_POLYGON_SCAN_URL
} from "../config";
import { nodes } from "./getRpcUrl";

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (network) => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = network;
    try {
      if (chainId == 56)
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: "Binance Smart Chain Mainnet",
              nativeCurrency: {
                name: "BNB",
                symbol: "bnb",
                decimals: 18,
              },
              rpcUrls: nodes[chainId],
              blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
            },
          ],
        });
      else if (chainId == 137)
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: "Binance Smart Chain Mainnet",
              nativeCurrency: {
                name: "Polygon Mainnet",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: nodes[chainId],
              blockExplorerUrls: [`${BASE_POLYGON_SCAN_URL}/`],
            },
          ],
        });
      else if (chainId == 1)
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`  
            },
          ],
        });
      

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
