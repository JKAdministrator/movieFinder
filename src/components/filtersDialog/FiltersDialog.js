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
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FiltersDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [ratingValue, setRatingValue] = useState(
    searchParams.get("rating") ? Number(searchParams.get("rating")) : 0
  );
  const [ratingValueNew, setRatingValueNew] = useState(
    searchParams.get("rating") ? Number(searchParams.get("rating")) : 0
  );

  useEffect(() => {
    searchParams.get("showFilters") ? setOpen(true) : setOpen(false);
  }, [searchParams]);

  const handleSave = () => {
    searchParams.delete("showFilters");
    ratingValueNew > 0
      ? searchParams.set("rating", ratingValueNew)
      : searchParams.delete("rating");
    setSearchParams(searchParams);
    setRatingValue(ratingValueNew);
  };

  const handleCancel = () => {
    searchParams.delete("showFilters");
    ratingValue > 0
      ? searchParams.set("rating", ratingValue)
      : searchParams.delete("rating");
    setSearchParams(searchParams);
    setRatingValueNew(ratingValue);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
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
            Filters
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
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
