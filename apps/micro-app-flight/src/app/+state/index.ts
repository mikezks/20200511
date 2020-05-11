import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State, reducer } from './reducers/flight-booking.reducer';

export interface RootState {
  flightBooking: State
}

export const reducers: ActionReducerMap<RootState> = {
  flightBooking: reducer
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];

export * from './actions/flight-booking.actions';
export * from './reducers/flight-booking.reducer';
export * from './effects/flight-booking.effects';
export * from './selectors/flight-booking.selectors';

