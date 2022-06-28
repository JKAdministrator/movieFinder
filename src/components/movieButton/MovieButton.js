import * as React from "react";
import { Card, CardMedia } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function MovieButton({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const appState = useSelector((state) => {
    return state;
  });

  const imageSrc =
    appState?.movies?.config?.images?.secure_base_url && movie.poster_path
      ? `${appState?.movies?.config?.images?.secure_base_url}original${movie.poster_path}`
      : "./noMovieImage".jpg;

  const onClickCardHandler = (e) => {
    searchParams.set("movieId", movie.id);
    setSearchParams(searchParams);
  };
  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={onClickCardHandler}
      style={{ cursor: "pointer", minWidth: "100%", height: "100%" }}
    >
      <CardMedia
        component="img"
        height="80"
        src={imageSrc}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // para evitar un loop si incluso la imagen de error falla al cargarse
          currentTarget.src = "./noMovieImage.jpg";
        }}
        alt={movie.name}
      />
    </Card>
  );
}
