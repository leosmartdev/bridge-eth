import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  Box,
  Button,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import { approve, deleteNFT, promote } from "../redux/slices/user";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const CardContainer = styled(Box)(({ theme }) => ({
  border: "1px solid transparent",
  cursor: "pointer",
  borderRadius: 12,
  background: "rgba(255, 255, 255, 0.2)",
  transition: "all .5s",
  padding: theme.spacing(3),
  "&:hover": {
    border: "1px solid white",
  },
  width: 460,
  margin: "auto",
}));

const ServerUrl = "http://localhost:5000/uploads";

const options = ["None", "Diamond", "Gold", "Silver", "Bronze"];

function AdminListItem({ nft }) {
  const [open, setOpen] = useState();
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(nft.promotion);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log(index);
    setAnchorEl(null);
    dispatch(promote(nft._id, index));
  };

  const handleApprove = (boolean) => {
    dispatch(approve(boolean, nft._id));
  };

  const handleDelete = () => {
    dispatch(deleteNFT(nft._id));
  };

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <Box
          component="img"
          src={`${ServerUrl}/${nft.image}`}
          sx={{ width: 80 }}
        />
        <Stack direction="row" flexGrow={1}>
          <Typography variant="h4" sx={{ ml: 3 }}>
            {nft.name} (Solana)
          </Typography>
          <Typography variant="h4" sx={{ ml: 3 }}>
            Mint Price: {nft.price}
          </Typography>
          <Typography variant="h4" sx={{ ml: 3 }}>
            Mint Date: <Moment format="DD/MM/YYYY">{nft.date}</Moment>
          </Typography>
        </Stack>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ px: 5, py: 1 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>Promotion:</Typography>
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ background: "rgba(255, 255, 255, 0.2)" }}
            >
              {options[selectedIndex]}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              sx={{
                "& .MuiPaper-root": {
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(6px)",
                },
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Stack>

          <Button
            variant="contained"
            color="info"
            onClick={() => setOpenPreview(true)}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/edit/${nft._id}`}
            color="info"
          >
            Edit
          </Button>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={nft.approved}
              onClick={() => handleApprove(true)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={!nft.approved}
              onClick={() => handleApprove(false)}
            >
              Deny
            </Button>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Stack>
        </Stack>
      </Collapse>
      <Divider
        component="li"
        sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
      />

      <Dialog
        open={openPreview}
        keepMounted
        onClose={() => setOpenPreview(false)}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <DialogContent>
          <CardContainer>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4">{nft.name}</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box component="img" src="bsc.png" sx={{ width: 28 }} />
                  <Typography variant="h5">{nft.price}</Typography>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <StarRoundedIcon sx={{ fontSize: 32, color: "yellow" }} />
                  <Typography variant="h5" fontFamily="Roboto Mono, monospace">
                    0
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <Box component="img" src="/discord.png" sx={{ width: 22 }} />
                  <Box component="img" src="/twitter.png" sx={{ width: 20 }} />
                  <Box component="img" src="/website.png" sx={{ width: 18 }} />
                </Stack>
              </Box>
            </Stack>
            <Box
              component="img"
              src={`${ServerUrl}/${nft.image}`}
              sx={{ width: 360, height: 360, px: 5, py: 5, mx: "auto" }}
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">
                Mint Date: <Moment format="YYYY/MM/DD">{nft.date}</Moment>
              </Typography>
              <Typography variant="h6">Count: {nft.count}</Typography>
            </Stack>

            <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.6)" }} />

            <Box>
              <Typography variant="h4">Description</Typography>
              <Typography sx={{ height: 80 }}>
                {nft.description.length > 120
                  ? `${nft.description.slice(0, 120)}...`
                  : nft.description}
              </Typography>
            </Box>
            <Stack alignItems="center">
              <Button variant="contained" size="large">
                Notify
              </Button>
            </Stack>
          </CardContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminListItem;
