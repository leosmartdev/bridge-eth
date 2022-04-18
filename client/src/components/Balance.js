import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Typography } from "@mui/material";
import useGetBnbBalance from "../hooks/useTokenBalance";

const ConnectButton = () => {
  const context = useWeb3React();
  const { library, chainId, account } = context;
  const { balance } = useGetBnbBalance();
  return (
    <>
      <Typography sx={{ visibility: account ? "visible" : "hidden" }}>
        {`Balance : ${Number(balance).toFixed(2)}`}
      </Typography>
    </>
  );
};

export default ConnectButton;
