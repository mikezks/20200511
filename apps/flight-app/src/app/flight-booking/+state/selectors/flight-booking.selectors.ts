import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { State, FeatureState } from '../reducers/flight-booking.reducer';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const getFlightBookingState =
    createFeatureSelector<FeatureState, State>('flightBooking');

export const getFlights = createSelector(
    // Selector
    getFlightBookingState,
    // Projector
    (state: State) => state.flights
);

export const getDelayedFlights = createSelector(
    getFlights,
    (flights) => flights.filter(f => f.delayed)
);

export const getSumDelayedFlights = createSelector(
    getDelayedFlights,
    (flights) => flights.length
);

export const getScheduledFlights = createSelector(
    getFlights,
    (flights) => flights.filter(f => !f.delayed)
);

export const getSumScheduledFlights = createSelector(
    getScheduledFlights,
    (flights) => flights.length
);

export const getTotalFlights = createSelector(
    getSumDelayedFlights,
    getSumScheduledFlights,
    (delayedFlights, scheduledFlights) => delayedFlights + scheduledFlights
);

export const selectFlightsWithProps = createSelector(
    getFlights,
    (flights, props) => flights.filter(f => !props.blackList.includes(f.id))
);

export const getDelayedRxJSOperator = () =>
    pipe(
        // RxJS Operator to select state from store
        select(getFlights),
        // RxJS map Operator
        map(flights =>
            // Array filter function
            flights.filter(f => f.delayed)
        )
    );

export const getItemsByFilter =
    <T, K>(
        mapFn: (state: T) => Array<K>,
        filter: (item: K) => boolean
    ) => pipe(
        // RxJS Operator to select state from store
        select(mapFn),
        // RxJS map Operator
        map(arr =>
            // Array filter function
            arr.filter(filter)
        )
    );
