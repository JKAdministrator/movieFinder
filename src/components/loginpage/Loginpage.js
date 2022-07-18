import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  Typography,
  Slide,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Box,
  Fab,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Paper,
  Input,
  FilledInput,
  AppBar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getMovieData, removeMovieData } from "../../actions/movies";
import "./style.css";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Visibility from "@mui/icons-material/Visibility";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
export default function DetailDialog() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
              Login
            </Typography>
            <TextField
              id="username"
              label="Username"
              tyle="email"
              variant="outlined"
              style={{ width: "100%" }}
            />
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              style={{
                margin: "0px",
                width: "100%",
              }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              variant="contained"
              style={{
                alignSelf: "flex-end",
                width: "100%",
              }}
            >
              Login
            </Button>
            <Box
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                size="small"
                color="secondary"
                style={{
                  color: "grey",
                }}
              >
                Forgot Password?
              </Button>
              <Button
                size="small"
                color="secondary"
                style={{
                  color: "grey",
                }}
              >
                New user?
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
