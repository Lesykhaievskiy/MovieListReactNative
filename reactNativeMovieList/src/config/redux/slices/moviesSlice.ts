import { createReducer, createSlice } from '@reduxjs/toolkit';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.movies = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPopularMovies, setLoading } = moviesSlice.actions;
export default moviesSlice.reducer;
