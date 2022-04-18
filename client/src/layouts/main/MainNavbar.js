import { NavLink as RouterLink, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Stack,
  Button,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ConnectButton from "../../components/ConnectButton";

import NetworkButton from "../../components/NetworkButton";
import { useWeb3React } from "@web3-react/core";

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: 100,
  background: "#66267b",
}));

export default function MainNavbar() {
  const { account } = useWeb3React();
  // const { users } = useSelector((state) => state.user);
  // let notifications = [];
  // users.map((user) => {
  //   const eachNotification = user.notification.find(
  //     (item) => item.account === account
  //   );
  //   if (eachNotification && eachNotification.visible === true)
  //     notifications.push(user);
  // });
  return (
    <>
      <AppBar>
        <ToolbarStyle>
          <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between">
              <RouterLink to="/" variant="h4">
                <Box component="img" src="/logo.png" sx={{ width: 80 }} />
              </RouterLink>
              <Stack direction="row" alignItems="center" spacing={2}>
                
                <NetworkButton />
                <ConnectButton />
              </Stack>
            </Stack>
          </Container>
        </ToolbarStyle>
      </AppBar>
      <Box sx={{ height: 100 }} />
    </>
  );
}
