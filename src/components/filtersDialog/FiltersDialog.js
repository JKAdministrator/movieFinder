import React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { setFiltersState } from "../../actions/ui";
import { setSearchConfig } from "../../actions/movies";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function countFilters(raiting) {
  let count = 0;
  if (raiting > 0) count++;
  return count;
}

export default function FiltersDialog() {
  const filtersDialogstate = useSelector((state) => {
    return state?.ui?.filtersState ? state.ui.filtersState : false;
  });
  const dispatch = useDispatch();

  const handleSave = () => {
    setRatingValue(ratingValueNew); //se graba el nuevo valor en el estado
    const filtersCount = countFilters(ratingValueNew); //se cuenta la cantidad de filtros
    dispatch(setFiltersState({ filtersState: false, filtersCount })); //se actualiza el estado global de la ui
    dispatch(setSearchConfig({ raiting: ratingValueNew })); //se realiza la busqueda contra el api
  };

  const handleCancel = () => {
    const filtersCount = countFilters(ratingValue); //se cuenta la cantidad de filtros
    dispatch(setFiltersState({ filtersState: false, filtersCount })); //se actualiza el estado de la ui (solo cierra popup)
    setRatingValueNew(ratingValue, 0); //se vuelve a los valores originales
  };

  const [ratingValue, setRatingValue] = React.useState(0);
  const [ratingValueNew, setRatingValueNew] = React.useState(0);

  return (
    <Dialog
      fullScreen
      open={filtersDialogstate}
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
          <Button autoFocus color="inherit" onClick={handleSave}>
            Add Filter
          </Button>
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
    </Dialog>
  );
}
