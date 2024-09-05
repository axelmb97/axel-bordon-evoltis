import { createReducer, on } from '@ngrx/store'
import * as ReceptionActions from '../actions/receptions.actions'
import { ReceptionsState } from '../models/reception.state'
import { Reception } from 'src/app/features/receptions/domain/entities/reception.entity';
import { Failure } from '../../failures/failure';

export const initialState : ReceptionsState = {
  loading: false,
  receptionsPagination: undefined,
  filters: undefined,
  receptionById: undefined,
  success: '',
  error: undefined,
}

export const receptionReducers = createReducer(
  initialState,
  on(ReceptionActions.loadReceptions, (state, prop) => {
    return {...state, loading: true, filters: prop.filters}
  }),
  on(ReceptionActions.loadedReceptions, (state, prop) => {
    return {...state, loading: false, receptionsPagination: prop.receptions}
  }),
  on(ReceptionActions.setReceptionError, (state, prop) => {
    return {...state, loading: false, error: prop.error}
  }),
  on(ReceptionActions.setReceptionSucces, (state, prop) => {
    return {...state, loading: false, success: prop.message}
  }),
  on(ReceptionActions.loadReceptionById, (state) => {
    return {...state, loading: true}
  }),
  on(ReceptionActions.loadedReceptionById, (state, prop) => {
    return {...state, loading: true, receptionById: prop.reception}
  })
);