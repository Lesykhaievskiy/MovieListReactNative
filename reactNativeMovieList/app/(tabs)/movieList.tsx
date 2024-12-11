import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/config/redux/store';
import {
  setLoading,
  setPopularMovies,
} from '~/src/config/redux/slices/moviesSlice';
import { fetchMovies } from '~/src/services/movieService';
import api from '~/src/services/api';
import MovieCell from '~/src/components/MovieCell';
import { SafeAreaView } from 'react-native-safe-area-context';

const movieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);

  useEffect(() => {
    const getMovies = async () => {
      dispatch(setLoading(true));
      try {
        const moviesData = await fetchMovies();
        dispatch(setPopularMovies(moviesData));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getMovies();
  }, [dispatch]);

  return (
    <SafeAreaView>
      <FlatList
        data={movies}
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={({ item }) => <MovieCell movie={item} />}
      />
    </SafeAreaView>
  );
};

export default movieList;
