import { createReducer, on } from '@ngrx/store'
import * as StockActions from '../actions/stocks.actions'
import { SotcksState } from '../models/stock.state'

export const initialState: SotcksState = {
  loading: false,
  filters: undefined,
  stockPagination: undefined,
  error: undefined,
  success: ''
}

export const stockReducers = createReducer(
  initialState,
  on(StockActions.loadStocks, (state, prop) => {
    return {...state, loading: true, filter: prop.filters}
  }),
  on(StockActions.loadedStocks, (state, prop) => {
    return {...state, loading: false, stockPagination: prop.stocks}
  }),
  on(StockActions.setStockError, (state, prop) => {
    return {...state, loading: false, error: prop.error}
  }),
  on(StockActions.setStockSucces, (state, prop) => {
    return {...state, loading: false, success: prop.message}
  }),
);