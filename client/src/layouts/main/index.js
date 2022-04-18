import { useLocation, Outlet } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const PageStyle = styled(Box)(({ theme }) => ({
  height: "calc(100% - 100px)",
  overflow: "auto",
  background: "linear-gradient(to bottom right, #bd4394, #443c80, #3b7cb8)",
  position: "relative",
}));

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <MainNavbar />
      <PageStyle>
        <Outlet />
        <Footer />
      </PageStyle>
    </>
  );
}
