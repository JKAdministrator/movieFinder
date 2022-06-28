import {
  FETCH_MOVIES_API_CONFIG,
  SET_MOVIES_SEARCH_CONFIG,
  FETCH_MOVIE_DATA,
  REMOVE_MOVIE_DATA,
} from "../constants/moviesActionTypes";
export default (
  moviesData = {
    result: [],
    config: {},
    searchConfig: {},
    selectedMovieData: undefined,
  },
  action
) => {
  switch (action.type) {
    case SET_MOVIES_SEARCH_CONFIG: {
      return action.payload
        ? {
            ...moviesData,
            searchConfig: { ...moviesData.searchConfig, ...action.payload },
          }
        : moviesData;
    }
    case FETCH_MOVIES_API_CONFIG: {
      return action.payload
        ? { ...moviesData, config: action.payload }
        : moviesData;
    }
    case FETCH_MOVIE_DATA: {
      return action.payload
        ? { ...moviesData, selectedMovieData: action.payload }
        : moviesData;
    }
    case REMOVE_MOVIE_DATA: {
      return { ...moviesData, selectedMovieData: undefined };
    }

    default: {
      return moviesData;
    }
  }
};
