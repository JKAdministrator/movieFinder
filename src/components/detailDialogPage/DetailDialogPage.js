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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getMovieData, removeMovieData } from "../../actions/movies";
import "./style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const onCardMediaError = (e) => {
  e.target.onerror = null;
  e.target.src = "./backdropPlaceholder.jpg";
};

export default function DetailDialogPage({ isOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    setMovieId(searchParams.get("movieId"));
  }, [searchParams]);

  useEffect(() => {
    if (movieId) dispatch(getMovieData(movieId));
  }, [movieId]);

  const movieData = useSelector((state) => {
    return state?.movies?.selectedMovieData;
  });
  const genresList = useSelector((state) => {
    return state?.movies?.config?.genres ? state?.movies?.config?.genres : [];
  });

  const secure_base_url = useSelector((state) => {
    return state?.movies?.config?.images?.secure_base_url;
  });

  const genres = movieData?.genres
    ? Array.from(movieData.genres)
        .map((g) => {
          return genresList.find((g2) => {
            return Number(g2.id) === Number(g.id);
          })?.name;
        })
        .join(", ")
    : [];

  const handleClose = () => {
    searchParams.delete("movieId");
    setSearchParams(searchParams);
    dispatch(removeMovieData(movieId));
  };

  if (movieData?.error) handleClose();
  console.log('redraw detailDialog');
  return (
    <Box
    style={{
      minHeight: "100vh",
    }}
    >
      {movieData ? (
        <Card
          style={{
            height: "100vh",
            width: "100%",
            overflow: "auto",
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            className="detaildialogCloseButton"
            onClick={handleClose}
          >
            <CloseIcon />
          </Fab>
          <CardMedia
            component="img"
            height="280"
            image={`${secure_base_url}w780${movieData.backdrop_path}`}
            alt="Movie Image"
            onError={onCardMediaError}
          ></CardMedia>
          <CardContent className="detaildialogCardcontent">
            <Typography gutterBottom variant="h4" component="div">
              {movieData?.title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              style={{ opacity: "0.7" }}
            >
              Original Title: "{movieData?.original_title}"
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {movieData?.overview}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Genre: </b>
              {genres}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Release date: </b>
              {movieData?.release_date}
            </Typography>
            <Box className="detaildialogActions">
              <Rating
                name="read-only"
                value={movieData?.vote_average ? movieData.vote_average / 2 : 0}
                readOnly
                precision={0.5}
              />
              <Typography variant="body2" color="text.secondary">
                {movieData?.vote_average} ({movieData?.vote_count} votes)
              </Typography>
              <Button
                color="primary"
                variant="contained"
                style={{ marginLeft: "auto" }}
              >
                Buy Ticket
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box className="detaildialogLoadingbox">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
