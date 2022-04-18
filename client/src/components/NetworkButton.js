import React, { useState, useEffect } from "react";
import { setupNetwork } from "../utils/wallet";
// reactstrap components

import { NavLink as RRNavLink,  } from "react-router-dom";

import { Button, Select,
  MenuItem, } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { switchNetwork } from "../redux/slices/network";
const NetworkButton = () => {
  const network = useSelector((state) => state.network.chainId);
  const dispatch = useDispatch();
  const handleNetwork = async (id) => {
    console.log(id);
    //
    const changed = await setupNetwork(id);
   

  };
  return (
    <Select
      labelId="refund-label"
      id="refund-select"
      value={network}
      onChange={e=>handleNetwork(Number(e.target.value))}
      inputProps={{
        sx: {
          // width: 160,
          width: 1,
          border: "1px solid white",
          color: "white",
          display: "flex",
          paddingTop:'5px',
          paddingBottom:'5px'
        },
      }}
      MenuProps={{
        sx: {
          "& .MuiPaper-root": {
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
    >
      <MenuItem value="1">
        Ethereum
      </MenuItem>
      <MenuItem value="56">
        BSC
      </MenuItem>
      <MenuItem value="137">
        Polygon
      </MenuItem>
    </Select>
  );
  
};

export default NetworkButton;
