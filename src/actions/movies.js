import * as api from "../api";
import {
  FETCH_MOVIES_API_CONFIG,
  FETCH_MOVIE_DATA,
  REMOVE_MOVIE_DATA,
} from "../constants/moviesActionTypes";

/**
 * Saves the config data & parameters from the api
 * @returns
 */
export const getConfig = () => async (disptach) => {
  try {
    const responses = await Promise.all([api.fetchConfig(), api.fetchGenres()]);
    disptach({
      type: FETCH_MOVIES_API_CONFIG,
      payload: { ...responses[0].data, ...responses[1].data },
    });
  } catch (error) {
    console.error(error);
  }
};
/**
 * Update the state with the selected movie data
 * @param {int} id The id of the movie
 * @returns
 */
export const getMovieData = (id) => async (disptach) => {
  try {
    const { data } = await api.fetchMovieData(id);
    disptach({
      type: FETCH_MOVIE_DATA,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const removeMovieData = () => async (disptach) => {
  try {
    disptach({
      type: REMOVE_MOVIE_DATA,
      payload: undefined,
    });
  } catch (error) {
    console.error(error);
  }
};
