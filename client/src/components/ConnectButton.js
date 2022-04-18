import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import { useWalletModal } from "zhack-pancake-forked-wallet-connector";
import { useWeb3React } from "@web3-react/core";
// reactstrap components

import { NavLink as RRNavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";

const ConnectButton = () => {
  const { account } = useWeb3React();
  console.log(account);
  const network = useSelector((state) => state.network.chainId);
  const auth = useAuth(network);
  const {
    onPresentConnectModal,
    onPresentAccountModal
  } = useWalletModal(auth.login, auth.logout, account, parseInt(network));
  if (!account)
    return (
      <Button variant="contained" onClick={onPresentConnectModal}>
        Login
      </Button>
    );
  else
    return (
      <Button variant="contained" onClick={onPresentAccountModal}>
        {account.substr(0, 4) + "..." + account.substr(account.length - 4, 4)}
      </Button>
    );
 
};

export default ConnectButton;
