import { Box, Button, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieButton from "../movieButton/MovieButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import * as api from "../../api";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "./style.css";

import {
  GENERE_POPULAR,
  GENERE_SEARCH_RESULT,
} from "../../constants/movieGenereTypes";
import { useSearchParams } from "react-router-dom";
function getSlidesPerView() {
  return Math.trunc(window.innerWidth / 250);
}

export default function MoviesList({ genre, words }) {
  const [movieList, setMovieList] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView()); // la cantidad de slides por vista cambia en base al tamaño de pantalla
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState({
    words: searchParams.get("words"),
    rating: searchParams.get("rating"),
  });
  const [title, setTitle] = useState("");

  //obtiene los datos del query cada vez que se actualiza
  useEffect(() => {
    setSearchData({
      words: searchParams.get("words"),
      rating: searchParams.get("rating"),
    });
    if (genre.id === GENERE_SEARCH_RESULT)
      setTitle(`Resuls for "${searchParams.get("words")}"`);
  }, [searchParams]);

  // si es el componente que muestra la busqueda debe volver a buscar ante un cambio en los datos
  useEffect(() => {
    if (genre.id === GENERE_SEARCH_RESULT) {
      if (searchData.words && searchData.words.length > 0) {
        api.fetchMoviesByWords(searchData.words).then((result) => {
          let moviesList = [...result.data.results];
          const rating = searchData.rating;
          if (rating) {
            let filteredMoviesList = moviesList.filter((m) => {
              return Math.round(m.vote_average / 2) === Number(rating);
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
  }, [searchData]);

  //cuando es un componente normal (busca por genero de pelicula) se realiza la busqueda solo al inicio
  useEffect(() => {
    switch (genre.id) {
      case GENERE_POPULAR: {
        api.fetchMoviesByPopularity().then((result) => {
          setMovieList(result.data.results);
        });
        setTitle(`Popular Movies`);
        break;
      }
      case GENERE_SEARCH_RESULT: {
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

  return (
    <>
      {((genre.id === GENERE_SEARCH_RESULT &&
        searchData.words &&
        searchData.words.length > 0) ||
        (genre.id !== GENERE_SEARCH_RESULT &&
          (!searchData.words || searchData.words.length === 0))) && (
        <Box
          style={{
            display: "flex",
            flexFlow: "column",
            height: "max-content",
            minHeight: "16rem",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexFlow: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="h3"
              style={{
                textAlign: "left",
                padding: "1rem",
                margin: "0px",
                color: "#e5e5e5",
              }}
            >
              {title}
            </Typography>
            {genre.id !== GENERE_SEARCH_RESULT && (
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
                    <MovieButton movie={movie} />
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
                style={{
                  textAlign: "left",
                  padding: "1rem",
                  margin: "0px",
                  color: "white",
                }}
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
              style={{ width: "100%" }}
              height={"12.5rem"}
            />
          )}
        </Box>
      )}
    </>
  );
}
