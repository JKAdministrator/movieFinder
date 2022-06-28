import { Box, Button, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "./style.css";
export default function Footer() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  return (
    <footer className="footer">
      <Box id="infoForm">
        <Typography variant="h6" component="h6" id="infoTitle">
          Want to annotate
        </Typography>
        <Typography variant="body2" component="p" id="infoP">
          Are you a writer? Feel like you could provide some great feedback on
          movies. Here are the features and benefits of becoming a member.
        </Typography>
        <ul>
          <li>Discuss movies with friends</li>
          <li>Build your collection of disucssed films.</li>
          <li>Save your favourite movies</li>
        </ul>
      </Box>
      <form>
        <Box id="loginForm">
          <Typography variant="h6" component="h6" id="loginFormTitle">
            Create Account
          </Typography>
          <TextField
            id="firstName"
            label="First name"
            variant="filled"
            type="text"
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="filled"
            autoComplete="username"
            type="text"
          />
          <TextField
            id="emailAddress"
            label="Email Address"
            variant="filled"
            autoComplete="email"
            type="text"
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            autoComplete="current-password"
            type={values.showPassword ? "text" : "password"}
          />
          <Box id="signInAccountButton">
            <Typography variant="body2" component="span">
              Already have an account?
            </Typography>
            <Button>Sign In</Button>
          </Box>
          <Button variant="contained" id="createAccountButton">
            Create Account
          </Button>
        </Box>
      </form>
    </footer>
  );
}
