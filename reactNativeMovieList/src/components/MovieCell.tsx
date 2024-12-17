import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../config/redux/slices/favoritesSlice';
import { router } from 'expo-router';

const MovieCell = ({ movie }) => {
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addFavorite(movie));
    Alert.alert('Success', `Movie "${movie.title}" added to favorite`);
  };

  const handlePushDetailScreen = () => {
    router.push({ pathname: '/[id]', params: { id: movie.id } });
  };

  return (
    <Pressable onPress={() => handlePushDetailScreen()}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/original/' + movie.poster_path,
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text numberOfLines={2} style={styles.overview}>
            {movie.overview}
          </Text>
          <Button title='Add to favorite' onPress={handleAddToFavorites} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOverview: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});

export default MovieCell;
