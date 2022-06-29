import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfig } from "./actions/movies";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

  //se obtiene el estado incial de la aplicacion
  const configData = useSelector((state) => {
    return state?.movies?.config?.images;
  });

  useEffect(() => {
    dispatch(getConfig()); //se solicita la configuracion inicial de la app
  }, []);

  useEffect(() => {
    //cuando tenemos los parametros del api podemos iniciar la app
    if (!isReady && configData) setIsReady(true);
  }, [configData]);

  const NotFound = lazy(() => import("./components/notFound/NotFound.js"));
  const Homepage = lazy(() => import("./components/homepage/Homepage.js"));

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <Suspense fallback={<CircularProgress />}>
                  <NotFound />
                </Suspense>
              }
            />
            <Route
              path="/"
              exact
              element={
                <>
                  {!isReady && <CircularProgress />}
                  {isReady && (
                    <Suspense fallback={<CircularProgress />}>
                      <Homepage />
                    </Suspense>
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
