import { combineReducers } from "redux";
import themeReducer from "./Themes";

export default combineReducers({
  Theme: themeReducer,
});
