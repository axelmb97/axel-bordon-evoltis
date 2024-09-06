import { createAction, props } from "@ngrx/store";
import { StockActionName } from "./stock-action-names";
import { StockFilters } from "src/app/features/stock/domain/entities/stock-filters.entity";
import { PaginatedStock } from "src/app/features/stock/domain/entities/paginated-stock.entity";
import { Failure } from "../../failures/failure";

export const loadStocks = createAction(
  StockActionName.LOAD_PAGINATED_STOCKS,
  props<{filters: StockFilters}>()
);

export const loadedStocks = createAction(
  StockActionName.LOADED_PAGINATED_STOCKS,
  props<{stocks: PaginatedStock}>()
);

export const setStockError = createAction(
  StockActionName.SET_STOCKS_ERROR,
  props<{error: Failure}>()
);

export const setStockSucces = createAction(
  StockActionName.SET_STOCKS_SUCCESS,
  props<{message: string}>()
);
