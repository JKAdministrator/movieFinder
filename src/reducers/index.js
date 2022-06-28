import { combineReducers } from "redux";
import movies from "./movies";
import ui from "./ui";
export default combineReducers({
  movies,
  ui,
});
