import React from "react";
import { Box, Typography } from "@mui/material";

interface LoadingErrorProps {
  message: string;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ message }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default LoadingError;
