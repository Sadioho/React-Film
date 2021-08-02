import axios from 'axios';
import _get from 'lodash/get';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FIND_DATA_MOVIE,
  GET_DATA_MOVIE,
  GET_ID_MOVIE,
  GET_NEW_DATA,
} from './constants';
import {
  getDataMovieSuccess,
  getDataMovieError,
  getDataMovieFollowIdError,
  getDataMovieFollowIdSuccess,
  getDataMoviesNewSuccess,
  getDataMoviesNewError,
} from './actions';
// Individual exports for testing
export function fetchMovies() {
  return axios({
    method: 'GET',
    url:
      'https://api.themoviedb.org/3/movie/popular?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&page=1',
  });
}

export function fetchNewMovies(page) {
  return axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/popular?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&page=${page}`,
  });
}

export function dataMovie(id) {
  return axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US`,
  });
}

export function dataActor(id) {
  return axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US`,
  });
}

export function getFindMovie(data) {
  return axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&query=${data}`,
  });
}

function* callApiMovies() {
  try {
    const response = yield call(fetchMovies);
    const data = _get(response, 'data.results', []);
    yield put(getDataMovieSuccess(data));
  } catch (error) {
    yield put(getDataMovieError(error));
  }
}

function* getIdMovie(data) {
  try {
    const response = yield call(dataMovie, data.data);
    const datav2 = _get(response, 'data', []);
    const response2 = yield call(dataActor, data.data);
    const datav3 = _get(response2, 'data.cast', []);
    const allData = { detailMovies: datav2, dataActors: datav3 };
    yield put(getDataMovieFollowIdSuccess(allData));
  } catch (error) {
    yield put(getDataMovieFollowIdError(error));
  }
}
function* callApiNewMovies(page) {
  try {
    const response = yield call(fetchNewMovies, page.payload);
    const data = _get(response, 'data', []);
    yield put(getDataMoviesNewSuccess(data.results));
  } catch (error) {
    yield put(getDataMoviesNewError(error));
  }
}

function* findMovie(payload) {
  if (payload.payload.length > 0) {
    try {
      const response = yield call(getFindMovie, payload.payload);
      const data = _get(response, 'data.results', []);
      yield put(getDataMovieSuccess(data));
    } catch (error) {
      yield put(getDataMovieError(error));
    }
  } else {
    try {
      const response = yield call(fetchMovies);
      const data = _get(response, 'data.results', []);
      yield put(getDataMovieSuccess(data));
    } catch (error) {
      yield put(getDataMovieError(error));
    }
  }
}

export default function* moviesPageSaga() {
  yield takeLatest(GET_DATA_MOVIE, callApiMovies);
  yield takeLatest(GET_ID_MOVIE, getIdMovie);
  yield takeLatest(GET_NEW_DATA, callApiNewMovies);
  yield takeLatest(FIND_DATA_MOVIE, findMovie);
}
