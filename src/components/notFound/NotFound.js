import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box className="notFound">
      <Box>
        <Typography variant="h2" component="h2" className="title">
          404
        </Typography>
        <Typography variant="body1" component="p" className="title">
          Page Not Found
        </Typography>
      </Box>
      <Button
        contained
        onClick={() => {
          navigate("/");
        }}
      >
        Go to home
      </Button>
    </Box>
  );
}
