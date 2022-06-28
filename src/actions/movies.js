import * as api from "../api";
import {
  FETCH_MOVIES_API_CONFIG,
  SET_MOVIES_SEARCH_CONFIG,
} from "../constants/actionTypes";

export const setSearchConfig = (searchConfig) => async (disptach) => {
  try {
    disptach({ type: SET_MOVIES_SEARCH_CONFIG, payload: searchConfig });
  } catch (error) {
    console.error(error);
  }
};

export const getConfig = () => async (disptach) => {
  try {
    const responses = await Promise.all([api.fetchConfig(), api.fetchGenres()]);

    localStorage.setItem(
      "secure_base_url",
      responses[0].data.images.secure_base_url
    );
    disptach({
      type: FETCH_MOVIES_API_CONFIG,
      payload: { ...responses[0].data, ...responses[1].data },
    });
  } catch (error) {
    localStorage.removeItem("config");
    console.error(error);
  }
};
