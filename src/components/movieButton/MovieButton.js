import * as React from "react";
import { Card, CardMedia } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDetailState } from "../../actions/ui";
export default function MovieButton({ movie }) {
  const dispatch = useDispatch();
  const appState = useSelector((state) => {
    return state;
  });
  const imageSrc = `${appState?.movies?.config?.images?.secure_base_url}original${movie.poster_path}`;
  const onClickCardHandler = (e) => {
    dispatch(setDetailState({ detailState: true, detailId: movie }));
  };
  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={onClickCardHandler}
      style={{ cursor: "pointer", minWidth: "100%" }}
    >
      <CardMedia
        component="img"
        height="80"
        data-src={imageSrc}
        className="swiper-lazy"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // para evitar un loop si incluso la imagen de error falla al cargarse
          currentTarget.src = "./noMovieImage.jpg";
        }}
        alt={movie.name}
      />
    </Card>
  );
}
