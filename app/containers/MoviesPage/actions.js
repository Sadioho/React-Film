/*
 *
 * MoviesPage actions
 *
 */

import {
  FIND_DATA_MOVIE,
  GET_DATA_MOVIE,
  GET_DATA_MOVIE_ERROR,
  GET_DATA_MOVIE_FOLLOW_ID_ERROR,
  GET_DATA_MOVIE_FOLLOW_ID_SUCCESS,
  GET_DATA_MOVIE_SUCCESS,
  GET_ID_MOVIE,
  GET_NEW_DATA,
  GET_NEW_DATA_ERROR,
  GET_NEW_DATA_SUCCESS,
  RESET_FLAGS_MOVIE,
} from './constants';

export function getDataMovies() {
  return {
    type: GET_DATA_MOVIE,
  };
}

export function getDataMovieSuccess(payload) {
  return {
    type: GET_DATA_MOVIE_SUCCESS,
    payload,
  };
}

export function getDataMovieError(error) {
  return {
    type: GET_DATA_MOVIE_ERROR,
    error,
  };
}

export function getIdMovie(data) {
  return {
    type: GET_ID_MOVIE,
    data,
  };
}

export function getDataMovieFollowIdSuccess(payload) {
  return {
    type: GET_DATA_MOVIE_FOLLOW_ID_SUCCESS,
    payload,
  };
}

export function getDataMovieFollowIdError(error) {
  return {
    type: GET_DATA_MOVIE_FOLLOW_ID_ERROR,
    error,
  };
}

export function resetFlagsMovie() {
  return {
    type: RESET_FLAGS_MOVIE,
  };
}

export function getDataMoviesNew(payload) {
  return {
    type: GET_NEW_DATA,
    payload,
  };
}

export function getDataMoviesNewSuccess(payload) {
  return {
    type: GET_NEW_DATA_SUCCESS,
    payload,
  };
}

export function getDataMoviesNewError(error) {
  return {
    type: GET_NEW_DATA_ERROR,
    error,
  };
}

export function findDataMoive(data) {
  return {
    type: FIND_DATA_MOVIE,
    data,
  };
}
