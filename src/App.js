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
  const searchConfig = useSelector((state) => {
    return state?.movies?.searchConfig;
  });

  //primera carga de la app graba el token en localStorage
  useEffect(() => {
    dispatch(getConfig());
    api.fetchGenres().then((result) => {
      setRandomGenres((_prevstate) => {
        return selectRandomGenres([...result.data.genres]);
      });
    });
  }, []);

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
                <Box
                  style={{
                    minHeight: "100vh",
                  }}
                >
                  <div className="App">
                    <Navbar />
                    <Box style={{ flexGrow: "1" }}>
                      <MoviesList key={-1} genre={{ id: -1 }} />
                      {randomGenres.map((g) => {
                        return (
                          <MoviesList
                            key={g.id}
                            genre={g}
                            words={searchConfig?.words}
                          />
                        );
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
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
