import React from "react";
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
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { setDetailState } from "../../actions/ui";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailDialog() {
  const theme = useTheme();
  const detailDialogData = useSelector((state) => {
    return {
      state: state?.ui?.detailState,
      movieData: state?.ui?.detailId,
      config: state?.movies?.config,
    };
  });

  const canShare = navigator.canShare();
  const imageSrc = detailDialogData?.movieData?.backdrop_path
    ? `${detailDialogData?.config?.images?.secure_base_url}original/${detailDialogData?.movieData?.backdrop_path}`
    : "./noMovieImage.jpg";
  const dispatch = useDispatch();
  const genres = detailDialogData?.movieData?.genre_ids
    ? Array.from(detailDialogData?.movieData?.genre_ids)
        .map((g) => {
          return detailDialogData.config?.genres?.find((g2) => {
            return g2.id === g;
          }).name;
        })
        .join(", ")
    : [];
  const handleClose = () => {
    dispatch(setDetailState({ detailState: false })); //se actualiza el estado de la ui (solo cierra popup)
  };
  const handleShare = () => {
    if (canShare) {
      navigator.share({
        url: "https://",
      });
    }
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={detailDialogData.state}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullScreen={fullScreen}
    >
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
            {detailDialogData?.movieData?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            style={{ opacity: "0.7" }}
          >
            Original Title: "{detailDialogData?.movieData?.original_title}"
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {detailDialogData?.movieData?.overview}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Genre: </b>
            {genres}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Release date: </b>
            {detailDialogData?.movieData?.release_date}
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
              value={
                detailDialogData?.movieData?.vote_average
                  ? detailDialogData?.movieData?.vote_average / 2
                  : 0
              }
              readOnly
              precision={0.5}
            />
            <Typography variant="body2" color="text.secondary">
              {detailDialogData?.movieData?.vote_average} (
              {detailDialogData?.movieData?.vote_count} votes)
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          {canShare ? (
            <Button size="small" onClick={handleShare}>
              Share
            </Button>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </Dialog>
  );
}
