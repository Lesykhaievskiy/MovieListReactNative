import { View, Text, Button, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../config/redux/slices/favoritesSlice';

const MovieCell = ({ movie }) => {
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addFavorite(movie));
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://image.tmdb.org/t/p/original/' + movie.poster_path,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Button title='Add to favorite' onPress={handleAddToFavorites} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MovieCell;
