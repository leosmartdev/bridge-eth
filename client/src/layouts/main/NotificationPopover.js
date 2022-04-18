import { useState } from "react";
import { IconButton, Badge, Popover, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useWeb3React } from "@web3-react/core";
import NotificationsIcon from "@mui/icons-material/Notifications";

const ArrowStyle = styled("span")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: "absolute",
    borderRadius: "0 0 4px 0",
    transform: "rotate(-135deg)",
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
  },
}));

export default function MainNavbar({ nfts }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // Notify Part
  const handleOpenNotify = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleCloseNotify = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const isNotifyOpen = Boolean(anchorEl);
  return (
    <>
      <IconButton onClick={handleOpenNotify}>
        <Badge color="error" variant={nfts.length > 0 ? "dot" : ""}>
          <NotificationsIcon sx={{ color: "white" }} />
        </Badge>
      </IconButton>
      <Popover
        open={isNotifyOpen}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleCloseNotify}
        PaperProps={{
          sx: {
            mt: 1,
            ml: 0.5,
            overflow: "inherit",
            boxShadow: (theme) => theme.customShadows.z20,
            border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
            width: 200,
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            p: 1,
          },
        }}
      >
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <Typography key={nft._id}>
              <Typography variant="span" color="warning.main">{nft.name}</Typography> will be minted soon!
            </Typography>
          ))
        ) : (
          <Typography>No notifications</Typography>
        )}
      </Popover>
    </>
  );
}
