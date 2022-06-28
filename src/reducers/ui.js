import {
  SET_FILTER_STATE,
  SET_RESULT_STATE,
  SET_DETAIL_STATE,
} from "../constants/actionTypes";
export default (
  filterData = {
    detailState: false,
    detailId: undefined,
    filtersState: false,
    filtersCount: 0,
  },
  action
) => {
  switch (action.type) {
    case SET_FILTER_STATE: {
      return action.payload ? { ...filterData, ...action.payload } : filterData;
    }
    case SET_DETAIL_STATE: {
      return action.payload ? { ...filterData, ...action.payload } : filterData;
    }
    case SET_RESULT_STATE: {
      return action.payload ? { ...filterData, ...action.payload } : filterData;
    }
    default: {
      return filterData;
    }
  }
};
