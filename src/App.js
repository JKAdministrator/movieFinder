import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfig } from "./actions/movies";
import { Box, CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import SvganimLoading from "./components/svganimLoading/SvganimLoading";
import DetailDialog from "./components/detailDialog/DetailDialog"; 
import DetailDialogPage from "./components/detailDialogPage/DetailDialogPage.js";
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

  //los componentes se cargan solo cuando son necesarios
  const NotFound = lazy(() => import("./components/notFound/NotFound.js"));
  const Homepage = lazy(() => import("./components/homepage/Homepage.js"));
  const LoginPage = lazy(() => import("./components/loginpage/Loginpage.js"));
  const SignupPage = lazy(() =>
    import("./components/signuppage/Signuppage.js")
  );
  const RecoverPage = lazy(() =>
    import("./components/recoverpage/Recoverpage.js")
  );
  console.log('redraw app.js');

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <Box className="loadingappBox">
                      <SvganimLoading />
                    </Box>
                  }
                >
                  <NotFound />
                </Suspense>
              }
            />
            <Route
              path="/"
              exact
              element={
                <>
                  {!isReady && (
                    <Box className="loadingappBox">
                      <SvganimLoading />
                    </Box>
                  )}
                  {isReady && (
                    <Suspense
                      fallback={
                        <Box className="loadingappBox">
                          <SvganimLoading />
                        </Box>
                      }
                    >
                      <Homepage />
                      <DetailDialog />
                      </Suspense>
                  )}
                </>
              }
            />
            <Route
              path="/movie"
              exact
              element={
                <>
                  {!isReady && (
                    <Box className="loadingappBox">
                      <SvganimLoading />
                    </Box>
                  )}
                  {isReady && (
                    <Suspense
                      fallback={
                        <Box className="loadingappBox">
                          <SvganimLoading />
                        </Box>
                      }
                    >
                      <DetailDialogPage />
                    </Suspense>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              exact
              element={
                <>
                  {!isReady && (
                    <Box className="loadingappBox">
                      <SvganimLoading />
                    </Box>
                  )}
                  {isReady && (
                    <Suspense
                      fallback={
                        <Box className="loadingappBox">
                          <SvganimLoading />
                        </Box>
                      }
                    >
                      <LoginPage />
                    </Suspense>
                  )}
                </>
              }
            />

            <Route
              path="/signup"
              exact
              element={
                <>
                  {!isReady && (
                    <Box className="loadingappBox">
                      <SvganimLoading />
                    </Box>
                  )}
                  {isReady && (
                    <Suspense
                      fallback={
                        <Box className="loadingappBox">
                          <SvganimLoading />
                        </Box>
                      }
                    >
                      <SignupPage />
                    </Suspense>
                  )}
                </>
              }
            />
            <Route
              path="/recover"
              exact
              element={
                <>
                  {!isReady && (
                    <Box className="loadingappBox">
                      <SvganimLoading />
                    </Box>
                  )}
                  {isReady && (
                    <Suspense
                      fallback={
                        <Box className="loadingappBox">
                          <SvganimLoading />
                        </Box>
                      }
                    >
                      <RecoverPage />
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
