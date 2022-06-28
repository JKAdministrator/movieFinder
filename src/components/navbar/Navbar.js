import React, { useCallback, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector } from "react-redux";
import { Avatar, Badge, Tooltip } from "@mui/material";
import _debounce from "lodash/debounce";
import { useSearchParams } from "react-router-dom";
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
    e.preventDefault();
    /*debounceSearch(e.target.value);*/
    e?.target?.value
      ? searchParams.set("words", e.target.value)
      : searchParams.delete("words");
    setSearchParams(searchParams);
    /*setSearchWords(e.target.value);*/
  };

  const onClickFilterButtonHandler = (e) => {
    console.log("--> Navbar.onClickFilterButtonHandler ->changing params to 1");
    searchParams.set("showFilters", "1");
    setSearchParams(searchParams);
  };

  return (
    <>
      <Box
        style={{ flexGrow: "0", position: "sticky", top: "0px", zIndex: "10" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{ display: { xs: "none", sm: "flex" } }}
              style={{
                width: "4rem",
                height: "4rem",
                padding: "0px",
                margin: "0px",
              }}
            >
              <img src="./logo512.png" alt="Logo" />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="h1"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                textAlign: "left",
                overflow: "initial",
              }}
            >
              Movie Finder
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              style={{
                width: "100%",
                justifyContent: "end",
              }}
            >
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
                  /*aria-controls={open ? "account-menu" : undefined}*/
                  aria-haspopup="true"
                  /* aria-expanded={open ? "true" : undefined}*/
                >
                  <Avatar sx={{ width: 32, height: 32 }}>?</Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
