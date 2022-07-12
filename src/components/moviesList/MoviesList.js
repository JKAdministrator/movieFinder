import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import MovieButton from "../movieButton/MovieButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Scrollbar, Mousewheel } from "swiper";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import * as api from "../../api";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./style.css";

import {
  GENRE_POPULAR,
  GENRE_SEARCH_RESULT,
} from "../../constants/movieGenreTypes";
import { useNavigate, useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

function getSlidesPerView() {
  return Math.trunc(window.innerWidth / 250);
}

export default function MoviesList({ genre }) {
  const navigate = useNavigate("/");
  const [movieList, setMovieList] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView()); // la cantidad de slides por vista cambia en base al tamaño de pantalla
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const hasWords = searchParams.has("words");
  const [title, setTitle] = useState("");
  const stateData = useSelector((state) => {
    return {
      poster_sizes: state?.movies?.config?.images?.poster_sizes,
      secure_base_url: state?.movies?.config?.images?.secure_base_url,
    };
  });

  //cuando es un componente normal (busca por genero de pelicula) se realiza la busqueda solo al inicio
  useEffect(() => {
    switch (genre.id) {
      case GENRE_POPULAR: {
        api.fetchMoviesByPopularity().then((result) => {
          setMovieList(result.data.results);
        });
        break;
      }
      default: {
        api.fetchMoviesByGenre(genre).then((result) => {
          setMovieList(result.data.results);
        });
        setTitle(genre.name);
        break;
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [genre]);

  const handleResize = (e) => {
    setSlidesPerView(getSlidesPerView());
  };

  const onMovieClickHandler = (e) => {
    searchParams.set("movieId", e.target.dataset.movieId);
    setSearchParams(searchParams);
  };

  return (
    <>
      {!hasWords && (
        <Box className="movielistColumn">
          <Box className="movielistRow" style={{}}>
            <Box
              className="movielistTitleBox"
              style={{
                marginTop: "0rem",
              }}
            >
              <Typography
                gutterBottom
                variant="h4"
                component="h3"
                className="movieListTitle"
              >
                {genre.id === GENRE_POPULAR ? "Popular Movies" : title}
              </Typography>
            </Box>
            <Button>
              More
              <NavigateNextIcon />
            </Button>
          </Box>

          {movieList && movieList?.length > 0 && (
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={20}
              freeMode={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              mousewheel={{
                invert: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              {Array.from(movieList).map((movie) => {
                return (
                  <SwiperSlide
                    key={genre.id.toString() + `-` + movie.id.toString()}
                    style={{ height: "auto" }}
                  >
                    <MovieButton
                      movie={movie}
                      posterSizes={stateData.poster_sizes}
                      clickHandler={onMovieClickHandler}
                      secureBaseUrl={stateData.secure_base_url}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          {!movieList && (
            <Skeleton
              variant="rectangular"
              className="movielistSkeleton"
              height="12.5rem"
            />
          )}
        </Box>
      )}
    </>
  );
}
