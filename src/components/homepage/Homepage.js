import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
//import DetailDialog from "../detailDialog/DetailDialog"; 
import FiltersDialog from "../filtersDialog/FiltersDialog";
import Footer from "../footer/Footer";
import MoviesList from "../moviesList/MoviesList";
import Navbar from "../navbar/Navbar";
import Recomended from "../recomended/Recomended";
import * as api from "../../api";
import _ from "lodash";
import "./style.css";
import MoviesSearch from "../movieSearch/moviesearch";

import { useSearchParams } from "react-router-dom";
function selectRandomGenres(genres, quantity = 5) {
  let randomGenres = [];
  for (let i = 0; i < quantity; i++) {
    randomGenres.push(
      genres.splice(
        genres.findIndex((g) => {
          return g.id === _.sample(genres).id;
        }),
        1
      )[0]
    );
  }
  return randomGenres;
}

export default function Homepage() {
  const [randomGenres, setRandomGenres] = useState([]);

  useEffect(() => {
    api.fetchGenres().then((result) => {
      setRandomGenres((_prevstate) => {
        return selectRandomGenres([...result.data.genres]);
      });
    });
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const hasWords = searchParams.has("words");

  if (!hasWords) window.scrollTo(0, 0);

  return (
    <Box
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="homepage">
        <Navbar />
        <Box style={{ flexGrow: "1" }}>
          <Recomended />
          <MoviesList key={-1} genre={{ id: -1 }} />
          {randomGenres.map((g) => {
            return <MoviesList key={g.id} genre={g} />;
          })}
          <MoviesSearch />
        </Box>
        
        <FiltersDialog />
        <Footer />
      </div>
    </Box>
  );
}
