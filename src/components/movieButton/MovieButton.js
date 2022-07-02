import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box, Typography } from "@mui/material";

export default function MovieButton({ movie, secureBaseUrl, clickHandler }) {
  const [hasError, setHasError] = useState(false);
  const onMediaError = (e) => {
    e.target.onerror = null;
    e.target.src = "./backdropPlaceholder.jpg";
    setHasError(true);
  };

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
        src={`${secureBaseUrl}w500${movie.poster_path}`} // use normal <img> attributes as props
        placeholderSrc="./posterPlaceholder.jpg"
        effect="blur"
        height={"100%"}
        onClick={clickHandler}
        style={{
          cursor: "pointer",
          minWidth: "100%",
          minHeight: "100%",
          height: "100%",
        }}
        data-movie-id={movie.id}
        onError={onMediaError}
      />
    </Box>
  );
}
