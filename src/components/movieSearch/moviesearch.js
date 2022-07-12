import {
  Box,
  Button,
  CircularProgress,
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

export default function MoviesSearch() {
  const navigate = useNavigate("/");

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView()); // la cantidad de slides por vista cambia en base al tamaño de pantalla
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const hasWords = searchParams.has("words");
  const [searchData, setSearchData] = useState({
    words: searchParams.get("words"),
    rating: searchParams.get("rating"),
    currentPage: 0,
    movieList: [],
    hasToLoadCurrentPage: false,
    isLoading: false,
    canTryNextSearch: true,
  });
  const stateData = useSelector((state) => {
    return {
      poster_sizes: state?.movies?.config?.images?.poster_sizes,
      secure_base_url: state?.movies?.config?.images?.secure_base_url,
    };
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //obtiene los datos del query cada vez que se actualiza
  useEffect(() => {
    //si son distintos a los que estan actualmente se reinicia la busqueda
    if (
      searchData?.words !== searchParams.get("words") ||
      searchData?.rating !== searchParams.get("rating")
    ) {
      setSearchData({
        words: searchParams.get("words"),
        rating: searchParams.get("rating"),
        currentPage: 1,
        hasToLoadCurrentPage: true,
        movieList: [],
        isLoading: true,
        canTryNextSearch: true,
      });
    }
  }, [searchParams]);

  // si es el componente que muestra la busqueda debe volver a buscar ante un cambio en los datos
  useEffect(() => {
    if (
      searchData.hasToLoadCurrentPage &&
      searchData.words &&
      searchData.words.length > 0
    ) {
      api
        .fetchMoviesByWords(searchData.words, searchData.currentPage)
        .then((result) => {
          let moviesList = [...result.data.results];
          //agregamos una pelicula extra al final
          const rating = searchData.rating;
          if (rating) {
            let filteredMoviesList = moviesList.filter((m) => {
              const showMovie =
                m.vote_average >= Number(rating) * 2 - 2 &&
                m.vote_average <= Number(rating) * 2;
              return showMovie;
            });
            moviesList = filteredMoviesList;
          }

          setSearchData((_prevSearchData) => {
            //if an id is already on the list --> remove
            let newMoviesList = moviesList.filter((newM) => {
              return (
                _prevSearchData.movieList.findIndex((currM) => {
                  return currM.id === newM.id;
                }) === -1
              );
            });
            return {
              ..._prevSearchData,
              movieList: [..._prevSearchData.movieList, ...newMoviesList],
              hasToLoadCurrentPage: false,
              isLoading: false,
              canTryNextSearch: newMoviesList.length > 0 ? true : false,
            };
          });
          handleResize();
        });
    }
  }, [searchData]);

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

  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setSearchData((_prevSearchData) => {
          return {
            ..._prevSearchData,
            currentPage: _prevSearchData.currentPage + 1,
            hasToLoadCurrentPage: true,
            isLoading: true,
            canTryNextSearch: false,
          };
        });
      },
      { threshold: 0.25, rootMargin: "50px" }
    );
    bottomObserver.current = observer;
  }, []);

  useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

  return (
    <>
      {hasWords && (
        <>
          <Box className="movieSearchColumn">
            <Box className={`movieSearchRow isGrid`} style={{}}>
              <Box
                className="movieSearchTitleBox"
                style={{
                  marginTop: "4rem",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h3"
                  className="movieSearchTitle"
                >
                  {`Resuls for "${searchParams.get("words")}"`}
                </Typography>
                <IconButton
                  color="primary"
                  aria-label="cancel search"
                  component="span"
                  className="movieSearchCancelButton"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <>
              <Swiper
                direction={"vertical"}
                slidesPerView={"auto"}
                freeMode={true}
                scrollbar={true}
                mousewheel={true}
                modules={[FreeMode, Scrollbar, Mousewheel]}
                className="mySwiper isGrid"
              >
                <SwiperSlide>
                  <Grid container spacing={2}>
                    {Array.from(searchData.movieList).map((movie) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          xl={2}
                          key={`searchFilter-` + movie.id.toString()}
                        >
                          <MovieButton
                            movie={movie}
                            posterSizes={stateData.poster_sizes}
                            clickHandler={onMovieClickHandler}
                            secureBaseUrl={stateData.secure_base_url}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </SwiperSlide>
              </Swiper>
              {searchData.isLoading && <CircularProgress />}
              {!searchData.isLoading && searchData.canTryNextSearch && (
                <div ref={setBottom}></div>
              )}
            </>
            {!searchData.isLoading && searchData.movieList.length === 0 && (
              <>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  className="movieSearchSubtitle"
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
        </>
      )}
    </>
  );
}
