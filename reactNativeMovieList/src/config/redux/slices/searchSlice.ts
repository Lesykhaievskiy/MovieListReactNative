import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '~/src/services/api';

export const fetchSearchMovie = createAsyncThunk(
  'search/fetchSearchMovie',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get('/search/movie', {
        params: {
          query: query,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'searchResults',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearSearchResults: (state) => {
      state.error = null;
      state.loading = false;
      state.movies = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovie.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchSearchMovie.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
