import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/config/redux/store';
import MovieCell from '~/src/components/MovieCell';
import { SafeAreaView } from 'react-native-safe-area-context';

const favoriteMovies = () => {
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  return (
    <SafeAreaView>
      {favoriteMovies.length === 0 ? (
        <Text>No favorite movies yet</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(movie) => movie.id.toString()}
          renderItem={({ item }) => <MovieCell movie={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default favoriteMovies;
