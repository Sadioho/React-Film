/*
 *
 * MoviesPage reducer
 *
 */
import produce from 'immer';
import {
  GET_DATA_MOVIE,
  GET_DATA_MOVIE_ERROR,
  GET_DATA_MOVIE_FOLLOW_ID_ERROR,
  GET_DATA_MOVIE_FOLLOW_ID_SUCCESS,
  GET_DATA_MOVIE_SUCCESS,
  GET_NEW_DATA,
  GET_NEW_DATA_ERROR,
  GET_NEW_DATA_SUCCESS,
  RESET_FLAGS_MOVIE,
} from './constants';

export const initialState = {
  dataMovies: [],
  statusFlags: {
    isCallAPILoading: true,
    isGetDataSuccess: false,
    isCallNewAPILoading: true,
  },
  error: '',
  detailMovie: {},
  dataActor: [],
};

/* eslint-disable default-case, no-param-reassign */
const moviesPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_MOVIE:
        draft.statusFlags.isCallAPILoading = true;
        break;
      case GET_DATA_MOVIE_SUCCESS:
        draft.statusFlags.isCallAPILoading = false;
        draft.dataMovies = action.payload;
        break;
      case GET_DATA_MOVIE_ERROR:
        draft.statusFlags.isCallAPILoading = false;
        draft.error = action.error;
        break;

      case GET_DATA_MOVIE_FOLLOW_ID_SUCCESS:
        draft.detailMovie = action.payload.detailMovies;
        draft.dataActor = action.payload.dataActors;
        draft.statusFlags.isGetDataSuccess = true;
        break;
      case GET_DATA_MOVIE_FOLLOW_ID_ERROR:
        draft.statusFlags.isGetDataSuccess = false;
        draft.error = action.error;
        break;
      case RESET_FLAGS_MOVIE:
        draft.statusFlags.isGetDataSuccess = false;
        draft.detailMovie = {};
        break;

      case GET_NEW_DATA:
        draft.statusFlags.isCallNewAPILoading = true;
        break;
      case GET_NEW_DATA_SUCCESS:
        draft.statusFlags.isCallNewAPILoading = false;
        draft.dataMovies = [...state.dataMovies, ...action.payload];
        break;
      case GET_NEW_DATA_ERROR:
        draft.statusFlags.isCallNewAPILoading = false;
        break;
    }
  });

export default moviesPageReducer;
