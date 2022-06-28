import {
  SET_FILTER_STATE,
  SET_DETAIL_STATE,
  SET_RESULT_STATE,
} from "../constants/actionTypes";
export const setFiltersState =
  ({ filtersState = undefined, filtersCount = undefined }) =>
  async (disptach) => {
    try {
      disptach({
        type: SET_FILTER_STATE,
        payload: { filtersState, filtersCount },
      });
    } catch (error) {
      console.error(error);
    }
  };
export const setDetailState =
  ({ detailState = undefined, detailId = undefined }) =>
  async (disptach) => {
    try {
      disptach({
        type: SET_DETAIL_STATE,
        payload: { detailState, detailId },
      });
    } catch (error) {
      console.error(error);
    }
  };
export const setResultState =
  ({ resultState = undefined }) =>
  async (disptach) => {
    try {
      disptach({
        type: SET_RESULT_STATE,
        payload: { resultState },
      });
    } catch (error) {
      console.error(error);
    }
  };
