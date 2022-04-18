// import { isString } from 'lodash';
import { useDropzone } from "react-dropzone";
// material
import { alpha, experimentalStyled as styled } from "@mui/material/styles";
import { Box, Theme, Typography, Paper } from "@mui/material";
// utils
// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  display: "flex",
  overflow: "hidden",
  textAlign: "center",
  height: "100%",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: "rgba(255, 255 ,255, 0.3)",
  backdropFilter: "blur(10px)",
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": {
    opacity: 0.72,
    cursor: "pointer",
  },
  [theme.breakpoints.up("md")]: { textAlign: "left", flexDirection: "row" },
}));

// ----------------------------------------------------------------------

export default function UploadSingleFile({
  error = false,
  file,
  sx,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && { padding: "12% 0" }),
        }}
      >
        <input {...getInputProps()} />

        {/* <UploadIllustration sx={{ width: 220 }} /> */}

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Drop files here or click
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Max size: 3MB
          </Typography>
        </Box>

        {file && (
          <Box
            component="img"
            alt="file preview"
            // src={isString(file) ? file : file.preview}
            src={file && file.preview}
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: "cover",
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
            }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
