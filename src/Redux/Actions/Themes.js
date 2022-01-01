import { SET_THEME, SET_VISIBILITY } from "./action.type";

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setSidebarVisibility = (status) => ({
  type: SET_VISIBILITY,
  payload: status,
});
