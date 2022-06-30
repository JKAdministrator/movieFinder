import React, { useEffect, useState, useTransition } from "react";
import {
  Button,
  Dialog,
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Rating,
  DialogActions,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FiltersDialog() {
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams, setSearchParams] = useSearchParams();

  const [filtersState, setFiltersState] = useState({
    currentRating: searchParams.get("rating")
      ? Number(searchParams.get("rating"))
      : 0,
    newRating: searchParams.get("rating")
      ? Number(searchParams.get("rating"))
      : 0,
    show: false,
  });

  useEffect(() => {
    const rating = searchParams.get("rating")
      ? Number(searchParams.get("rating"))
      : 0;
    setFiltersState((_prev) => {
      return {
        ..._prev,
        show: searchParams.has("showFilters"),
        currentRating: rating,
        newRating: rating,
      };
    });
  }, [searchParams]);

  const handleSave = () => {
    setFiltersState((_prev) => {
      startTransition(() => {
        _prev.newRating > 0
          ? searchParams.set("rating", _prev.newRating)
          : searchParams.delete("rating");
        searchParams.delete("showFilters");
        setSearchParams(searchParams);
      });
      return {
        ..._prev,
        show: false,
        currentRating: _prev.newRating,
      };
    });
  };

  const handleCancel = () => {
    setFiltersState((_prev) => {
      startTransition(() => {
        _prev.currentRating > 0
          ? searchParams.set("rating", _prev.currentRating)
          : searchParams.delete("rating");
        searchParams.delete("showFilters");
        setSearchParams(searchParams);
      });

      return {
        ..._prev,
        show: false,
        newRating: _prev.currentRating,
      };
    });
  };

  const valueOfStars = Math.round(
    filtersState.newRating ? filtersState.newRating : 0 / 2
  );
  const valueOfStarsString =
    valueOfStars > 0
      ? "(" + (valueOfStars * 2 - 2) + "-" + valueOfStars * 2 + ")"
      : "";
  return (
    <Dialog
      fullScreen={fullScreen}
      open={filtersState.show}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Search Filters
          </Typography>
        </Toolbar>
      </AppBar>
      <List
        style={{
          minWidth: "17rem",
        }}
      >
        <ListItem
          style={{
            justifyContent: "space-between",
          }}
        >
          <Typography component="legend">
            Raiting {valueOfStarsString}
          </Typography>
          <Rating
            name="simple-controlled"
            value={filtersState.newRating}
            precision={1}
            onChange={(event, newValue) => {
              setFiltersState((_prev) => {
                return {
                  ..._prev,
                  newRating: newValue,
                };
              });
            }}
          />
        </ListItem>
      </List>
      <DialogActions>
        <Button onClick={handleSave}>Save filters</Button>
      </DialogActions>
    </Dialog>
  );
}
