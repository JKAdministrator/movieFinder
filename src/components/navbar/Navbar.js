import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Stack,
  InputBase,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge, Tooltip } from "@mui/material";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchWords, setSearchWords] = useState(
    searchParams.get("words") ? searchParams.get("words") : ""
  );

  useEffect(() => {
    searchParams.has("words")
      ? setSearchWords(searchParams.get("words"))
      : setSearchWords("");
  }, [searchParams]);

  const onSearchChangeHandler = (e) => {
    e?.target?.value
      ? searchParams.set("words", e.target.value)
      : searchParams.delete("words");
    setSearchParams(searchParams);
  };

  const onClickFilterButtonHandler = (e) => {
    searchParams.set("showFilters", "1");
    setSearchParams(searchParams);
  };

  const onLogoClickHandler = (e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/");
  };

  return (
    <Box className="navbar">
      <AppBar>
        <Toolbar>
          <Box
            className="logo"
            sx={{ display: { xs: "none", sm: "flex" } }}
            onClick={onLogoClickHandler}
          >
            <img src="./logoNavbar.png" alt="Logo" />
          </Box>
          <Stack direction="row" spacing={1} className="stack">
            <Search sx={{ flexGrow: 0, display: { sm: "block" } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchWords}
                onChange={onSearchChangeHandler}
                style={{ flexGrow: "1", width: "100%" }}
              />
            </Search>
            <Tooltip title="Filter search">
              <IconButton
                color="primary"
                aria-label="search filter"
                component="span"
                style={{ color: "white" }}
                onClick={onClickFilterButtonHandler}
              >
                <Badge
                  badgeContent={
                    searchParams.get("rating") &&
                    searchParams.get("rating").length > 0
                      ? 1
                      : 0
                  }
                  color="secondary"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <FilterAltIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Login">
              <IconButton
                onClick={() => {}}
                size="small"
                sx={{ ml: 2 }}
                aria-haspopup="true"
              >
                <Avatar sx={{ width: 32, height: 32 }}>?</Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
