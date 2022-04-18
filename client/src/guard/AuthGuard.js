import React, { useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate, Redirect } from "react-router";

export default function AuthGuard({ children }) {
  const { account } = useWeb3React();
  const navigate = useNavigate();
  if (!account) {
    navigate('/');
    return <></>;
  }else{
    return <>{children}</>;
  }
  
}
