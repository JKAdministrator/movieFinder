import React, { useEffect, useState } from "react";
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
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const [ratingValue, setRatingValue] = useState(
    searchParams.get("rating") ? Number(searchParams.get("rating")) : 0
  );
  const [ratingValueNew, setRatingValueNew] = useState(
    searchParams.get("rating") ? Number(searchParams.get("rating")) : 0
  );

  useEffect(() => {
    setShowFilters(searchParams.has("showFilters"));
  }, [searchParams]);

  const handleSave = () => {
    ratingValueNew > 0
      ? searchParams.set("rating", ratingValueNew)
      : searchParams.delete("rating");
    searchParams.delete("showFilters");
    setSearchParams(searchParams);
    setShowFilters(false);
    setRatingValue(ratingValueNew);
  };

  const handleCancel = () => {
    ratingValue > 0
      ? searchParams.set("rating", ratingValue)
      : searchParams.delete("rating");
    searchParams.delete("showFilters");
    setSearchParams(searchParams);
    setShowFilters(false);
    setRatingValueNew(ratingValue);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={showFilters}
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
          <Typography component="legend">Raiting</Typography>
          <Rating
            name="simple-controlled"
            value={ratingValueNew}
            precision={1}
            onChange={(event, newValue) => {
              setRatingValueNew(newValue);
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
