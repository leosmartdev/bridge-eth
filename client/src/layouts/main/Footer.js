import { Box, Stack, IconButton, Link, Button } from "@mui/material";

export default function Footer() {
  return (
    <Stack
      direction="row"
      sx={{
        px: 15,
        py: 3,
        background: "rgba(255, 255, 255, 0.1)",
        mt: 5,
        width: 1,
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" sx="small" color="warning" target="_blank" href="https://t.me/">
          ApeZone
        </Button>
        <Button variant="outlined" sx="small" color="warning" target="_blank" href="mailto:aa@aaa.com">
          Contact
        </Button>
      </Stack>
      <Link href="#" sx={{ color: "white" }}>
        Powered by  &copy; 2021
      </Link>
      <Stack direction="row" spacing={2}>
        <IconButton  target="_blank" href="https://twitter.com/">
          <Box
            component="img"
            src="twitter.png"
            sx={{
              width: 40,
              transition: "all 0.2s",
              "&:hover": { transform: "scale(1.3)" },
            }}
          />
        </IconButton>
        <IconButton  target="_blank" href="https://t.me/">
          <Box
            component="img"
            src="telegram.png"
            sx={{
              width: 40,
              transition: "all 0.2s",
              "&:hover": { transform: "scale(1.3)" },
            }}
          />
        </IconButton>
       <IconButton  target="_blank" href="https://discord.gg/">
          <Box
            component="img"
            src="discord.png"
            sx={{
              width: 40,
              transition: "all 0.2s",
              "&:hover": { transform: "scale(1.3)" },
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}
