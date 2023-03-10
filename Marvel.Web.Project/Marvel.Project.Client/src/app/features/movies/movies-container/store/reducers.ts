import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Movie } from '../models/movie.model';
import * as actions from './actions';

export const featureName = 'Movies';
export const MoviesAdapter = createEntityAdapter<Movie>({});

export interface MovieState extends EntityState<Movie> {
  moviesResults?: Movie[];
  movie?: Movie;
}

export const initialState: MovieState = {
  ...MoviesAdapter.getInitialState(),
  moviesResults: undefined,
  movie: undefined,
};

export const movieReducer = createReducer(
  initialState,
  on(
    actions.addMovie,
    actions.loadMovie,
    actions.loadMovies,
    actions.queryMovies,
    (state): MovieState => ({
      ...state,
    })
  ),
  on(
    actions.loadMovieSuccess,
    (state, { movie }): MovieState => MoviesAdapter.setOne(movie, { ...state })
  ),
  on(
    actions.loadMoviesSuccess,
    (state, { movies }): MovieState =>
      MoviesAdapter.setAll(movies, { ...state })
  ),
  on(
    actions.queryMoviesSuccess,
    (state, { movies }): MovieState => ({ ...state, moviesResults: movies })
  ),
  on(
    actions.queryMovieSuccess,
    (state, { movie }): MovieState => ({ ...state, movie: movie })
  ),

  on(
    actions.addMovieSuccess,
    (state, { movie }): MovieState => MoviesAdapter.addOne(movie, { ...state })
  ),
  on(
    actions.updateMovieSuccess,
    (state, { movie }): MovieState =>
      MoviesAdapter.upsertOne(movie, { ...state })
  ),
  on(
    actions.deleteMovieSuccess,
    (state, { movie }): MovieState =>
      MoviesAdapter.removeOne(movie.id ?? '', { ...state })
  )
);
