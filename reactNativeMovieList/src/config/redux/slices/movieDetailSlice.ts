import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '~/src/services/api';

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/movie/${id}`, {
        params: {
          append_to_response: 'credits',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieDetailSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    details: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDetails: (state) => {
      (state.details = null), (state.loading = false), (state.error = null);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearDetails } = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
