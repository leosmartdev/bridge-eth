import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Chip,
  LinearProgress,
} from "@mui/material";
import { MdDone, MdUpcoming, MdSend, MdRemoveDone } from "react-icons/md";
import { styled } from "@mui/material/styles";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "@ethersproject/units";

const CardContainer = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: 12,
  background: "rgba(255, 255, 255, 0.2)",
  transition: "all .5s",
  padding: theme.spacing(3),
}));

const ServerUrl = "http://localhost:5000/uploads";

function CardWrapper({ type, children }) {
  let border;
  let promo;
  switch (type) {
    case 1:
      border = "5px solid #ab4bff";
      promo = "diamond";
      break;
    case 2:
      border = "5px solid #fcd316";
      promo = "gold";
      break;
    case 3:
      border = "5px solid #49f0ff";
      promo = "silver";
      break;
    case 4:
      border = "5px solid #fc9455";
      promo = "bronze";
      break;
    default:
      border = "none";
      promo = "";
      break;
  }
  return (
    <Box sx={{ border: border, borderRadius: 2, position: "relative" }}>
      {children}
    </Box>
  );
}

export default function Card({ pool }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account } = useWeb3React();
  const network = useSelector((state) => state.network.chainId);
  const softCap =formatUnits(pool.softCap); 
  const hardCap =formatUnits(pool.hardCap); 
  const rate =formatUnits(pool.presaleRate, (18-pool.decimals));
  const progressHard = 100 * Number(formatUnits(pool.weiRaised,"gwei")) / Number(formatUnits(pool.hardCap,"gwei"));
  const progressSoft = 100 * Number(formatUnits(pool.weiRaised,"gwei")) / Number(formatUnits(pool.softCap,"gwei"));
  const raised = formatUnits(pool.weiRaised); 
  const [current, setCurrent]=useState(0);
  const startTime=(new Date(pool.startDateTime)).getTime();
  const endTime=(new Date(pool.endDateTime)).getTime();
  useEffect(()=>{
    const interval=setInterval(()=>{
      setCurrent(Date.now());
    },1000);
    return ()=>{clearInterval(interval)};
  },[]);
  return (
    <>
      <CardWrapper>
        <CardContainer>
          <Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                component="img"
                src={pool.ipfs?.logo}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "100%",
                }}
              />
              <div>
                {
                  pool.status == 0 ? (
                    <Chip
                      sx={{
                        fontSize: "0.7rem",
                      }}
                      label="Upcoming"
                      icon={<MdUpcoming />}
                      color="warning"
                      variant="outlined"
                    />
                  ) : pool.status == 1 ? (
                    <Chip
                      sx={{
                        fontSize: "0.7rem",
                      }}
                      label="Sale Live"
                      icon={<MdSend />}
                      color="primary"
                      variant="outlined"
                    />
                  ) : pool.status == 2 ? (
                    <Chip
                      sx={{
                        fontSize: "0.7rem",
                      }}
                      label="Finished"
                      icon={<MdDone />}
                      color="success"
                      variant="outlined"
                    />
                  ) : pool.status == 3 ? (
                    <Chip
                      sx={{
                        fontSize: "0.7rem",
                      }}
                      label="Ended"
                      icon={<MdDone />}
                      color="info"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      sx={{
                        fontSize: "0.7rem",
                      }}
                      label="Cancelled"
                      icon={<MdRemoveDone />}
                      color="error"
                      variant="outlined"
                    />
                  )
                }
                {" "}
                {
                  pool.kyc ? (
                    <Chip
                      sx={{
                        fontSize: "0.7rem",
                      }}
                      label="KYC"
                      color="secondary"
                      variant="filled"
                    />
                  ) : ""
                }
              </div>

            </Stack>
            <Typography variant="h5">{pool.name}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h7" color="text.disabled">
                1 {network == 3 ? "ETH" : "BNB"} = {Number(rate).toLocaleString('en')} {pool.symbol}
              </Typography>
            </Stack>
            <br />
            <Typography variant="h6">Soft/Hard Cap:</Typography>
            <Typography variant="h6" color="error">
              {softCap} {network == 3 ? "ETH" : "BNB"} - {hardCap} {network == 3 ? "ETH" : "BNB"}
            </Typography>

            <Typography variant="h6">Progress ({progressHard}%)</Typography>
            <LinearProgress variant="buffer" value={progressHard} valueBuffer={progressSoft} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="span" fontSize="0.8rem">
                {raised} {network == 3 ? "ETH" : "BNB"}
              </Typography>
              <Typography variant="span" fontSize="0.8rem">
                {hardCap} {network == 3 ? "ETH" : "BNB"}
              </Typography>
            </Stack>
            <br />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h7">Liquidity %:</Typography>
              <Typography variant="span" fontSize="0.8rem">
                {pool.dexCapPercent} %
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h7">Lockup Time:</Typography>
              <Typography variant="span" fontSize="0.8rem">
                {pool.dexLockup} days
              </Typography>
            </Stack>

            <br />
          </Stack>

          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.6)" }} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack>
              {
                pool.status == 0 ? (
                  <>
                    <Typography variant="span" fontSize="0.7rem">
                      Sale Starts In:
                    </Typography>

                    <Typography variant="span" fontSize="0.8rem">
                      {Math.floor((startTime-current)/1000/3600/24)}:{Math.floor((startTime-current)/1000/3600%24)}:{Math.floor((startTime-current)/1000/60%(60))}:{Math.floor((startTime-current)/1000%60)}
                    </Typography>
                  </>
                ) : pool.status == 1 ? (
                  <>
                    <Typography variant="span" fontSize="0.7rem">
                      Sale Ends In:
                    </Typography>

                    <Typography variant="span" fontSize="0.8rem">
                    {Math.floor((endTime-current)/1000/3600/24)}:{Math.floor((endTime-current)/1000/3600%24)}:{Math.floor((endTime-current)/1000/60%60)}:{Math.floor((endTime-current)/1000%60)}
                    </Typography>
                  </>
                ) : ""
              }

            </Stack>
            <Stack>
              <Button color="warning" onClick={() => navigate(`/detail/${pool.address}`)}>View Pool</Button>
            </Stack>
          </Stack>
        </CardContainer>
      </CardWrapper>
    </>
  );
}
