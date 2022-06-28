import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import MoviesList from "./components/moviesList/MoviesList";
import { useDispatch, useSelector } from "react-redux";
import { getConfig, getMovies } from "./actions/movies";
import FiltersDialog from "./components/filtersDialog/FiltersDialog";
import DetailDialog from "./components/detailDialog/DetailDialog";
import * as api from "./api";
import _ from "lodash";
import { Box } from "@mui/material";
import Footer from "./components/footer/Footer";
function App() {
  const dispatch = useDispatch();
  const [apiToken, setApiToken] = useState(localStorage.token);
  const [isReady, setIsReady] = useState(false);
  const [randomGenres, setRandomGenres] = useState([]);

  const searchConfig = useSelector((state) => {
    return state?.movies?.searchConfig;
  });

  //primera carga de la app graba el token en localStorage
  useEffect(() => {
    api.fetchGenres().then((result) => {
      let randomGenres = [];
      let genres = [...result.data.genres];
      let randomItem;
      for (let i = 0; i < 5; i++) {
        randomItem = _.sample(genres);
        randomGenres.push(randomItem);
        genres.splice(
          genres.findIndex((g) => {
            return g.id === randomItem.id;
          }),
          1
        );
        genres = [...genres];
      }
      setRandomGenres((_prevstate) => {
        return randomGenres;
      });
    });
  }, []);

  //si se pudo grabar el token obtiene la configuracion del api
  useEffect(() => {
    dispatch(getConfig());
  }, [apiToken]);

  return (
    <>
      <Box
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="App">
          <Navbar />
          <Box style={{ flexGrow: "1" }}>
            {searchConfig?.words && searchConfig?.words?.length > 0 && (
              <MoviesList
                key={-2}
                genre={{ id: -2, name: `Results for "${searchConfig?.words}"` }}
                words={searchConfig?.words}
              />
            )}
            {(!searchConfig?.words || searchConfig?.words?.length === 0) && (
              <>
                <MoviesList key={-1} genre={{ id: -1, name: "Popular now" }} />
                {randomGenres.map((g) => {
                  return (
                    <MoviesList
                      key={g.id}
                      genre={g}
                      words={searchConfig?.words}
                    />
                  );
                })}
              </>
            )}
          </Box>
          <FiltersDialog />
          <DetailDialog />
          <Footer />
        </div>
      </Box>
    </>
  );
}

export default App;