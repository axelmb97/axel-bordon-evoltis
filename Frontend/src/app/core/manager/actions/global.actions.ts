import { createAction, props } from "@ngrx/store";
import { GlobalActionName } from "./global-action-name";

export const showSidebar = createAction(
  GlobalActionName.SHOW_SIDEBAR
);

export const hideSidebar = createAction(
  GlobalActionName.HIDE_SIDEBAR
);