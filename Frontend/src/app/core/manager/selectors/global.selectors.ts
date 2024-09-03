import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { GlobalState } from "../models/global.state";

export const selectGlobalFeature = (app:AppState) => app.global;

export const selectShowSidebar = createSelector(
  selectGlobalFeature,
  (state: GlobalState) => state.showSidebar
);