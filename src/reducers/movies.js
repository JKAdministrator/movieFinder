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
      return {
        ...moviesData,
        searchConfig: { ...moviesData.searchConfig, ...action.payload },
      };
    }
    case FETCH_MOVIES_API_CONFIG: {
      return { ...moviesData, config: action.payload };
    }
    case FETCH_MOVIE_DATA: {
      return { ...moviesData, selectedMovieData: action.payload };
    }
    case REMOVE_MOVIE_DATA: {
      return {
        ...moviesData,
        selectedMovieData: undefined,
        movieDataError: undefined,
      };
    }

    default: {
      return moviesData;
    }
  }
};
