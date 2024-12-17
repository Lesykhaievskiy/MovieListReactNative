import {
  AnyAction,
  AsyncThunk,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import MovieCell from '~/src/components/MovieCell';
import {
  fetchSearchMovie,
  clearSearchResults,
} from '~/src/config/redux/slices/searchSlice';
import { RootState } from '~/src/config/redux/store';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector(
    (state: RootState) => state.searchResults.movies
  );

  const handleSearch = () => {
    if (query.trim()) {
      // @ts-ignore
      dispatch(fetchSearchMovie(query));
      console.log(searchResults);
    }
  };

  const handleClear = () => {
    setQuery('');
    dispatch(clearSearchResults());
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder='Search for a movie...'
      />
      <Button title='Search' onPress={handleSearch} />
      <Button title='Clear' onPress={handleClear} />

      {searchResults ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCell movie={item} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : (
        <Text>No results</Text>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
