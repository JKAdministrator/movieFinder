import React from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  AppBar,
} from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
export default function RecoverPage() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <img
          src="loginBackground.jpg"
          alt="login background"
          className="backgroundImage"
        />
        <AppBar
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "max-content",
            height: "max-content",
            background: "transparent",
            margin: "1rem",
            boxShadow: "none",
          }}
        >
          <Box
            className="logo"
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
          >
            <img src="./logoNavbar.png" alt="Logo" />
          </Box>
        </AppBar>
        <Box
          style={{
            backgroundColor: "#000000d1",
            opacity: "0.4",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        ></Box>

        <Paper style={{ marginTop: "3rem", position: "relative", zIndex: "3" }}>
          <Box
            style={{
              width: "max-content",
              height: "max-content",
              display: "flex",
              flexFlow: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "1rem",
              padding: "1rem",
              minWidth: "20rem",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              style={{ marginBottom: "1rem" }}
            >
              Recover
            </Typography>
            <TextField
              id="email"
              label="Email"
              tyle="email"
              variant="outlined"
              style={{ width: "100%" }}
            />
            <Button
              variant="contained"
              style={{
                alignSelf: "flex-end",
                width: "100%",
              }}
            >
              RECOVER USER
            </Button>
            <Box
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                size="small"
                color="secondary"
                style={{
                  color: "grey",
                }}
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                Have a user?
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
