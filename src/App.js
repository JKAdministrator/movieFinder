import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import MoviesList from "./components/moviesList/MoviesList";
import { useDispatch, useSelector } from "react-redux";
import { getConfig } from "./actions/movies";
import FiltersDialog from "./components/filtersDialog/FiltersDialog";
import DetailDialog from "./components/detailDialog/DetailDialog";
import * as api from "./api";
import _ from "lodash";
import { Box } from "@mui/material";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Recomended from "./components/recomended/Recomended";
function selectRandomGenres(genres) {
  let randomGenres = [];
  let randomItem;
  for (let i = 0; i < 5; i++) {
    randomItem = _.sample(genres);
    randomGenres.push(
      genres.splice(
        genres.findIndex((g) => {
          return g.id === randomItem.id;
        }),
        1
      )[0]
    );
  }
  return randomGenres;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const dispatch = useDispatch();
  const [randomGenres, setRandomGenres] = useState([]);
  const [isReady, setIsReady] = useState(false);

  //se obtiene el estado incial de la aplicacion
  const configDataSate = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch(getConfig()); //se graba el estado inicial (datos de configuracion y parametros remotos del api)
    api.fetchGenres().then((result) => {
      //se obtiene un conjunto de generos de peliculas al azar
      setRandomGenres((_prevstate) => {
        return selectRandomGenres([...result.data.genres]);
      });
    });
  }, []);

  useEffect(() => {
    //cuando el estado inciial de la app cambia se inciial la app si todavia no inició
    console.log("APP configDataSate change", { configDataSate });
    if (!isReady && configDataSate?.movies?.config?.images) {
      console.log("app ready", { configDataSate });
      setIsReady(true);
    }
  }, [configDataSate]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<>404 Not found</>} />
            <Route
              path="/"
              exact
              element={
                <>
                  {!isReady && <Box>Loading</Box>}
                  {isReady && (
                    <Box
                      style={{
                        minHeight: "100vh",
                      }}
                    >
                      <div className="App">
                        <Navbar />
                        <Box style={{ flexGrow: "1" }}>
                          <Recomended />
                          <MoviesList key={-1} genre={{ id: -1 }} />
                          {randomGenres.map((g) => {
                            return <MoviesList key={g.id} genre={g} />;
                          })}
                          <MoviesList
                            key={-2}
                            genre={{
                              id: -2,
                            }}
                          />
                        </Box>
                        <DetailDialog />
                        <FiltersDialog />
                        <Footer />
                      </div>
                    </Box>
                  )}
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
