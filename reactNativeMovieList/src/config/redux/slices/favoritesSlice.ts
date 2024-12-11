import { createSlice } from '@reduxjs/toolkit';
import { setLoading } from './moviesSlice';
import { act } from 'react';

interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface FavoriteState {
  favorites: FavoriteMovie[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },

    addFavorite: (state, action) => {
      const newMovie = action.payload;
      const isAlreadyFavorite = state.favorites.some(
        (movie) => movie.id === newMovie.id
      );

      if (!isAlreadyFavorite) {
        state.favorites.push(newMovie);
      }
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
