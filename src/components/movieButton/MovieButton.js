import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box, Typography } from "@mui/material";

export default function MovieButton({ movie }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasError, setHasError] = useState(false);
  const secure_base_url = useSelector((state) => {
    return state?.movies?.config?.images?.secure_base_url;
  });

  //esta funcion siempre hace lo mismo por lo que no necesitamos rearmarla en cada rerender
  const onClickCardHandler = useCallback(
    (e) => {
      searchParams.set("movieId", movie.id);
      setSearchParams(searchParams);
    },
    [movie]
  );

  const onMediaError = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = "./backdropPlaceholder.jpg";
    setHasError(true);
  }, []);

  return (
    <Box
      className="container"
      style={{
        height: "100%",
      }}
    >
      <Typography
        gutterBottom
        variant="h6"
        component="p"
        style={{
          opacity: "0.7",
          color: "white",
          position: "absolute",
          pointerEvents: "none",
          padding: "1rem",
          textAlign: "left",
        }}
      >
        {hasError ? movie.title : ""}
      </Typography>
      <LazyLoadImage
        alt={movie.name}
        src={`${secure_base_url}original${movie.poster_path}`} // use normal <img> attributes as props
        placeholderSrc="./posterPlaceholder.jpg"
        effect="blur"
        height={"100%"}
        onClick={onClickCardHandler}
        style={{
          cursor: "pointer",
          minWidth: "100%",
          minHeight: "100%",
          height: "100%",
        }}
        onError={onMediaError}
      />
    </Box>
  );
}
