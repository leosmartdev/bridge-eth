import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPools } from "../redux/slices/pools";
import Loader from "react-loader-spinner";
import { styled } from "@mui/material/styles";
import { useTokenContract, useBridgeContract } from "../hooks/useContract";
import {
  Container, TextField, Alert as MuiAlert, Snackbar,
  Box,
  Grid,
  Typography,
  Stack,
  Select,
  MenuItem,
  Button,
  Pagination,
  Tabs,
  Tab,
  FormControl,
  Link,
} from "@mui/material";
import Card from "../components/Card";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import axios from "../utils/axios";
import { formatUnits, formatEther, parseEther, parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const CardContainer = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  background: "rgba(255, 255, 255, 0.2)",
  transition: "all .5s",
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto'
}));
export default function Homepage() {
  const { account } = useActiveWeb3React();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('0');
  const [receiveAmount, setReceiveAmont] = useState(0);
  const network = useSelector((state) => state.network.chainId);
  const [toNetwork, setToNetwork] = useState(1);
  const [symbol, setSymbol] = useState("");
  const tokenContract = useTokenContract();
  const bridgeContract = useBridgeContract();
  const [isTransferring, setIsTransferring] = useState(false);
  const [isTransferComplete, setIsTransferComplete] = useState(false);
  const [isTransferError, setIsTransferError] = useState(false);
  useEffect(() => {
    let unmounted = false;
    (async () => {
      try {
        const fee = await bridgeContract.fee();
        const decimals = await tokenContract.decimals();
        const receiveBalance_tmp = BigNumber.from(amount).mul(100 - Number(fee)).div(100);
        if (!unmounted)
          setReceiveAmont(formatUnits(receiveBalance_tmp, decimals));
      } catch (err) {

      }
    })();
    return () => { unmounted = true; }
  }, [amount]);
  useEffect(() => {
    if (network == 1)
      setToNetwork(56);
    else if (network == 56)
      setToNetwork(137);
    else
      setToNetwork(1);
  }, [network]);
  const handleMax = async (e) => {
    e.preventDefault();
    try {
      const balance = await tokenContract.balanceOf(account);
      const decimals = await tokenContract.decimals();
      const symbol_tmp = await tokenContract.symbol();
      setAmount(formatUnits(balance, decimals));
      setSymbol(symbol_tmp);
    } catch (err) {
    }
  };
  const transfer = async () => {
    if (!isTransferring) {
      try {
        setIsTransferring(true);
        const tx = await bridgeContract.burn(toNetwork, account, parseUnits(amount));
        await tx.wait();
        setIsTransferring(false);

        setIsTransferComplete(true);
      } catch (err) {
        setIsTransferring(false);
        setIsTransferError(true);
      }

    }
  }
  return (
    <Container maxWidth="xl" sx={{ p: 5 }}>
      <CardContainer>
        <Stack>
          <Stack
            direction="row"
            alignItems="center"
            fontSize="0.85rem"
          >
            To : {" "}
            <Select
              labelId="network-label"
              id="network-select"
              value={toNetwork}
              onChange={(e) => setToNetwork(Number(e.target.value))}
              inputProps={{
                sx: {
                  // width: 160,
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  width: 1,
                  border: "1px solid white",
                  color: "white",
                  display: "flex",
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
                <Box
                  component="img"
                  src="ethereum.png"
                  sx={{ width: 28, mr: 2 }}
                />
                Ethereum
              </MenuItem>
              <MenuItem value="56">
                <Box
                  component="img"
                  src="bsc.png"
                  sx={{ width: 28, mr: 2 }}
                />
                Binance Smart Chain
              </MenuItem>
              <MenuItem value="137">
                <Box
                  component="img"
                  src="matic.png"
                  sx={{ width: 28, mr: 2 }}
                />
                Polygon
              </MenuItem>
            </Select>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            fontSize="0.85rem"
            marginTop="20px"
          >
            <TextField
              fullWidth
              label="amount"
              type="number"
              value={amount}
              onChangeCapture={(e) => setAmount(e.target.value)}
              sx={{
                width: 1,
                color: "white",
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            />
          </Stack>
          <Stack
            justifyContent="space-between" direction="row"
            fontSize="0.85rem"
          >
            <Stack color="#aaa" fontSize="0.75rem">
              {receiveAmount} {symbol} (received)
            </Stack>
            <Link href="" underline="none" onClick={handleMax}>max</Link>
          </Stack>
          {
            isTransferring ? (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={30}
                width={30}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={transfer}
              >
                Transfer
              </Button>
            )
          }

        </Stack>

      </CardContainer>
      <Snackbar open={isTransferError} autoHideDuration={6000} onClose={() => setIsTransferError(false)} >
        <Alert onClose={() => setIsTransferError(false)} severity="error" sx={{ width: '100%', wordBreak: 'break-all' }}>
          Failed in Transferring!
        </Alert>
      </Snackbar>
      <Snackbar open={isTransferComplete} autoHideDuration={6000} onClose={() => setIsTransferComplete(false)} >
        <Alert onClose={() => setIsTransferComplete(false)} severity="success" sx={{ width: '100%', wordBreak: 'break-all' }}>
          Succeed in Transferring!
        </Alert>
      </Snackbar>
    </Container>
  );
}
