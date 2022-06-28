import { Box, Button, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieButton from "../movieButton/MovieButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
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
function getSlidesPerView() {
  return Math.trunc(window.innerWidth / 250);
}

export default function MoviesList({ genre, words }) {
  const [movieList, setMovieList] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView()); // la cantidad de slides por vista cambia en base al tamaño de pantalla

  useEffect(() => {
    switch (genre.id) {
      case GENERE_POPULAR: {
        api.fetchMoviesByPopularity().then((result) => {
          setMovieList(result.data.results);
        });
        break;
      }
      case GENERE_SEARCH_RESULT: {
        break;
      }
      default: {
        api.fetchMoviesByGenre(genre).then((result) => {
          setMovieList(result.data.results);
        });
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
  const searchConfig = useSelector((state) => {
    return state?.movies?.searchConfig;
  });
  useEffect(() => {
    if (
      genre.id === GENERE_SEARCH_RESULT &&
      searchConfig?.words &&
      searchConfig?.words.length > 0
    ) {
      api.fetchMoviesByWords(searchConfig?.words).then((result) => {
        let moviesList = [...result.data.results];
        if (searchConfig?.raiting && searchConfig?.raiting > 0) {
          moviesList = moviesList.filter((m) => {
            return (
              m.vote_average >= searchConfig?.raiting * 2 - 2 &&
              m.vote_average <= searchConfig?.raiting * 2
            );
          });
        }
        setMovieList(moviesList);
      });
    }
  }, [searchConfig, genre.id]);

  return (
    <>
      {movieList && (
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
              component="div"
              style={{
                textAlign: "left",
                padding: "1rem",
                margin: "0px",
              }}
            >
              {genre.name}
            </Typography>
            {genre.id !== GENERE_SEARCH_RESULT && <Button>View All </Button>}
          </Box>

          {movieList.length > 0 && (
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
                  <SwiperSlide key={genre.id + `-` + movie.id}>
                    <MovieButton movie={movie} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          {movieList.length === 0 && (
            <>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{
                  textAlign: "left",
                  padding: "1rem",
                  margin: "0px",
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
        </Box>
      )}
      {!movieList && (
        <Skeleton
          variant="rectangular"
          style={{ width: "100%" }}
          height={"12.5rem"}
        />
      )}
    </>
  );
}
