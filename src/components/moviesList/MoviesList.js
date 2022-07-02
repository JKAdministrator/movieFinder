import { Box, Button, IconButton, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieButton from "../movieButton/MovieButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
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

export default function MoviesList({ genre, words }) {
  const navigate = useNavigate("/");
  const [movieList, setMovieList] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView()); // la cantidad de slides por vista cambia en base al tamaño de pantalla
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState({
    words: searchParams.get("words"),
    rating: searchParams.get("rating"),
  });
  const [title, setTitle] = useState("");
  const stateData = useSelector((state) => {
    return {
      poster_sizes: state?.movies?.config?.images?.poster_sizes,
      secure_base_url: state?.movies?.config?.images?.secure_base_url,
    };
  });

  //obtiene los datos del query cada vez que se actualiza
  useEffect(() => {
    setSearchData({
      words: searchParams.get("words"),
      rating: searchParams.get("rating"),
    });
    if (genre.id === GENRE_SEARCH_RESULT)
      setTitle(`Resuls for "${searchParams.get("words")}"`);
  }, [genre.id, searchParams]);

  // si es el componente que muestra la busqueda debe volver a buscar ante un cambio en los datos
  useEffect(() => {
    if (genre.id === GENRE_SEARCH_RESULT) {
      if (searchData.words && searchData.words.length > 0) {
        api.fetchMoviesByWords(searchData.words).then((result) => {
          let moviesList = [...result.data.results];
          const rating = searchData.rating;
          if (rating) {
            let filteredMoviesList = moviesList.filter((m) => {
              const showMovie =
                m.vote_average >= Number(rating) * 2 - 2 &&
                m.vote_average <= Number(rating) * 2;
              return showMovie;
            });
            setMovieList(filteredMoviesList);
          } else setMovieList(moviesList);
          handleResize();
        });
      } else {
        setMovieList([]);
        handleResize();
      }
    }
  }, [genre.id, searchData]);

  //cuando es un componente normal (busca por genero de pelicula) se realiza la busqueda solo al inicio
  useEffect(() => {
    switch (genre.id) {
      case GENRE_POPULAR: {
        api.fetchMoviesByPopularity().then((result) => {
          setMovieList(result.data.results);
        });
        break;
      }
      case GENRE_SEARCH_RESULT: {
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
  const handleClose = () => {
    navigate("/");
  };

  const onMovieClickHandler = (e) => {
    searchParams.set("movieId", e.target.dataset.movieId);
    setSearchParams(searchParams);
  };

  return (
    <>
      {((genre.id === GENRE_SEARCH_RESULT &&
        searchData.words &&
        searchData.words.length > 0) ||
        (genre.id !== GENRE_SEARCH_RESULT &&
          (!searchData.words || searchData.words.length === 0))) && (
        <Box className="movielistColumn">
          <Box className="movielistRow">
            <Box
              className="movielistTitleBox"
              style={{
                marginTop: genre.id === GENRE_SEARCH_RESULT ? "4rem" : "0rem",
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
              {genre.id === GENRE_SEARCH_RESULT && (
                <IconButton
                  color="primary"
                  aria-label="cancel search"
                  component="span"
                  className="movielistCancelButton"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>

            {genre.id !== GENRE_SEARCH_RESULT && (
              <Button>
                More
                <NavigateNextIcon />
              </Button>
            )}
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
                      secureBaseUrl={stateData.secure_base_url}
                      clickHandler={onMovieClickHandler}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          {movieList && movieList.length === 0 && (
            <>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                className="movielistSubtitle"
              >
                The search returned no matches. You can try the following:
              </Typography>
              <ul className="suggest">
                <li>Try other keywords</li>
                <li>Don't add extra filters</li>
                <li>Try with the title of the movie/series</li>
              </ul>
            </>
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
