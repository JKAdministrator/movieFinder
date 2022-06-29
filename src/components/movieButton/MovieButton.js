import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function MovieButton({ movie }) {
  const [searchParams, setSearchParams] = useSearchParams();
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

  return (
    <LazyLoadImage
      alt={movie.name}
      src={`${secure_base_url}original${movie.poster_path}`} // use normal <img> attributes as props
      placeholderSrc="./posterPlaceholder.jpg"
      effect="blur"
      onClick={onClickCardHandler}
      style={{ cursor: "pointer", minWidth: "100%", height: "100%" }}
    />
  );
}
