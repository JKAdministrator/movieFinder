import {
  FETCH_MOVIES_API_CONFIG,
  SET_MOVIES_SEARCH_CONFIG,
} from "../constants/actionTypes";
export default (
  moviesData = { result: [], config: {}, searchConfig: {} },
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
    default: {
      return moviesData;
    }
  }
};
