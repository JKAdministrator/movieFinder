import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import * as api from "../../api/index";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./style.css";
export default function Recomended() {
  const state = useSelector((state) => {
    return state;
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const hasWords = searchParams.has("words");
  const secure_base_url = state?.movies?.config?.images?.secure_base_url;
  const [movieData, setMovieData] = useState({
    title: "",
    overview: "",
    backdrop_path: "",
  });

  useEffect(() => {
    api.fetchTrendingMovies().then((result) => {
      const randomItem = _.sample(result.data.results);
      const imageSrc = `${secure_base_url}original${randomItem.backdrop_path}`;
      const newData = {
        title: randomItem.title ? randomItem.title : randomItem.name,
        overview: randomItem.overview,
        id: randomItem.id,
        backdrop_path: imageSrc,
      };
      setMovieData(newData);
    });
  }, []);

  const handleOnClickMovie = (e) => {
    searchParams.set("movieId", movieData.id);
    setSearchParams(searchParams);
  };

  return (
    <>
      {!hasWords && (
        <Box className="recomended">
          <Box
            style={{
              backgroundImage: `url(${movieData.backdrop_path})`,
            }}
            className="box1"
          ></Box>
          <Box className="box2"></Box>
          <Box className="box3">
            <Typography variant="h2" component="h4" className="title">
              {movieData.title}
            </Typography>
            <Typography variant="body2" component="p" className="overview">
              {movieData.overview}
            </Typography>
            <Box className="box4">
              <Button variant="contained">Buy Ticket</Button>
              <Button variant="outlined" onClick={handleOnClickMovie}>
                More Info
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
