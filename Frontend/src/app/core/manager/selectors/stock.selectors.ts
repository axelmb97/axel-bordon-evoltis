import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { SotcksState } from "../models/stock.state";

export const selectStocksFeature = (app: AppState) => app.stocks

export const selectLoadingStock = createSelector(
  selectStocksFeature,
  (state: SotcksState) => state.loading
);

export const selectStockFilters = createSelector(
  selectStocksFeature,
  (state: SotcksState) => state.filters
);

export const selectStockPagination = createSelector(
  selectStocksFeature,
  (state: SotcksState) => state.stockPagination
);

export const selectStockError = createSelector(
  selectStocksFeature,
  (state: SotcksState) => state.error
);

export const selectStockSucces = createSelector(
  selectStocksFeature,
  (state: SotcksState) => state.success
);