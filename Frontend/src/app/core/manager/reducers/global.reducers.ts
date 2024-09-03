import { createReducer, on } from "@ngrx/store";
import { GlobalState } from "../models/global.state";
import * as GlobalActions from "../actions/global.actions"

export const initialState: GlobalState = {
  showSidebar: false
}

export const globalReducers = createReducer(
  initialState,
  on(GlobalActions.showSidebar, (state) => {
    return {...state, showSidebar: true}
  }),
  on(GlobalActions.hideSidebar, (state) => {
    return {...state, showSidebar: false}
  })
);