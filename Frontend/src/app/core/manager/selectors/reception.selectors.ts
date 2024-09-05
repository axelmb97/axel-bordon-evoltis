import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ReceptionsState } from "../models/reception.state";

export const selectReceptionFeature = (app: AppState) => app.receptions;

export const selectReceptionLoading = createSelector(
  selectReceptionFeature,
  (state: ReceptionsState) => state.loading
);

export const selectReceptionFilters = createSelector(
  selectReceptionFeature,
  (state: ReceptionsState) => state.filters
);

export const selectReceptionPagination = createSelector(
  selectReceptionFeature,
  (state: ReceptionsState) => state.receptionsPagination
);

export const selectReceptionError = createSelector(
  selectReceptionFeature,
  (state: ReceptionsState) => state.error
);

export const selectReceptionSuccess = createSelector(
  selectReceptionFeature,
  (state: ReceptionsState) => state.success
);