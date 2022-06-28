import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Button,
  Dialog,
  Typography,
  Slide,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Box,
  Fab,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getMovieData, removeMovieData } from "../../actions/movies";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailDialog({ isOpen }) {
  const params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
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

  const imageSrc = movieData?.backdrop_path
    ? `${secure_base_url}original/${movieData.backdrop_path}`
    : "./noMovieImage.jpg";
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

  return (
    <Dialog
      open={movieId ? true : false}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullScreen={fullScreen}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "hidden",
        },
      }}
    >
      {movieData ? (
        <Card
          style={{
            height: "100%",
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "absolute", top: "1rem", right: "1rem" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Fab>
          <CardMedia
            component="img"
            height="280"
            image={imageSrc}
            alt="Movie Image"
          />
          <CardContent
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "0.2rem",
            }}
          >
            <Typography gutterBottom variant="h4" component="div">
              {movieData.title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              style={{ opacity: "0.7" }}
            >
              Original Title: "{movieData.original_title}"
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
            <Box
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1rem",
              }}
            >
              <Rating
                name="read-only"
                value={movieData?.vote_average ? movieData.vote_average / 2 : 0}
                readOnly
                precision={0.5}
              />
              <Typography variant="body2" color="text.secondary">
                {movieData?.vote_average} ({movieData?.vote_count} votes)
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </Dialog>
  );
}
