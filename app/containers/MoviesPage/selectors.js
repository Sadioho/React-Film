import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the moviesPage state domain
 */

const selectMoviesPageDomain = state => state.moviesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MoviesPage
 */

const makeSelectMoviesData = () =>
  createSelector(
    selectMoviesPageDomain,
    substate => substate.dataMovies,
  );
const makeSelectDetailMovie = () =>
  createSelector(
    selectMoviesPageDomain,
    substate => substate.detailMovie,
  );
const makeSelectDataActor = () =>
  createSelector(
    selectMoviesPageDomain,
    substate => substate.dataActor,
  );
const makeSelectStatusFlags = () =>
  createSelector(
    selectMoviesPageDomain,
    substate => substate.statusFlags,
  );

export {
  makeSelectMoviesData,
  makeSelectStatusFlags,
  makeSelectDetailMovie,
  makeSelectDataActor,
};
