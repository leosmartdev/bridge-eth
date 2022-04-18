import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
import { ConnectorNames } from "zhack-pancake-forked-wallet-connector";
import getNodeUrl from "./getRpcUrl";
import { ethers } from 'ethers'

const POLLING_INTERVAL = 12000;

const injected = ()=>{
  return (new InjectedConnector({ supportedChainIds: [1,3,56,137] }));
}

const walletconnect =(network)=> new WalletConnectConnector({
  rpc: { ["1"]: getNodeUrl("1"), ["56"]:getNodeUrl("56"), ["137"]:getNodeUrl("137") },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

const bscConnector = (network)=>new BscConnector({ supportedChainIds: [network] });

export const connectorsByName = (network) => {
  if (network == 56)
    return {
      [ConnectorNames.Injected]: injected(),
      [ConnectorNames.WalletConnect]: walletconnect(network),
      [ConnectorNames.BSC]: bscConnector(network),
    };
  else
    return {
      [ConnectorNames.Injected]: injected(),
      [ConnectorNames.WalletConnect]: walletconnect(network)
    };
};

export const getLibrary = (provider)=> {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}
