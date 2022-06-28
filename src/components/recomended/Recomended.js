import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import * as api from "../../api/index";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
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
      const imageSrc = `${secure_base_url}original/${randomItem.backdrop_path}`;
      console.log("randomItem", { randomItem });
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
        <Box
          name="sarasa"
          style={{
            position: "relative",
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            height: "70vh",
            width: "100%",
          }}
        >
          <Box
            style={{
              position: "relative",
              backgroundColor: "black",
              width: "100%",
              height: "100%",
              display: "flex",
              flexFlow: "column",
              backgroundPosition: "center",
              backgroundImage: `url(${movieData.backdrop_path})`,
              backgroundRepeat: "no-repeat",
              zIndex: "0",
              backgroundSize: "cover",
            }}
            name="box1"
          ></Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column",
              width: "100%",
              height: "100%",
              background: "rgb(2,0,36)",
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: "1",
              background: "rgb(0, 0, 0)",
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(5,5,5,1) 24%, rgba(255,255,255,0) 100%, rgba(255,255,255,0) 100%)",
            }}
            name="box2"
          ></Box>
          <Box
            style={{
              minWidth: "40%",
              display: "flex",
              flexFlow: "column",
              height: "max-content",
              position: "absolute",
              bottom: "5rem",
              left: "0px",
              zIndex: "2",
              color: "#f5f5f5a3",
              maxWidth: "50%",
              textAlign: "justify",
              gap: "2rem",
              padding: "2rem",
            }}
            name="box3"
          >
            <Typography
              variant="h2"
              component="h4"
              style={{
                color: "#ffffffe0",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {movieData.title}
            </Typography>
            <Typography variant="body2" component="p">
              {movieData.overview}
            </Typography>
            <Button variant="outlined" onClick={handleOnClickMovie}>
              More
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
