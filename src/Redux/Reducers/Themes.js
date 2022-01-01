/* eslint-disable import/no-anonymous-default-export */
import { SET_THEME, SET_VISIBILITY } from "../Actions/action.type";

let initialState = {
  THEME: "LIGHT",
  SIDEBARSTATUS: "hidden",
};

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        THEME: action.payload,
      };
    case SET_VISIBILITY:
      return {
        ...state,
        SIDEBARSTATUS: action.payload,
      };
    default:
      return state;
  }
};
