import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/config/redux/store';
import {
  clearDetails,
  fetchMovieDetails,
} from '~/src/config/redux/slices/movieDetailSlice';
import ActorCell from '~/src/components/ActorCell';

const DetailInfo = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector(
    (state: RootState) => state.details
  );

  useEffect(() => {
    if (id) {
      // @ts-ignore
      dispatch(fetchMovieDetails(id));
    }

    return () => {
      dispatch(clearDetails());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (!details) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${details.backdrop_path}`,
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.overview}>{details.overview}</Text>
      <Text style={styles.label}>
        Release Date: <Text style={styles.value}>{details.release_date}</Text>
      </Text>
      <Text style={styles.label}>
        Rating: <Text style={styles.value}>{details.vote_average}/10</Text>
      </Text>
      <Text style={styles.label}>
        Genres:{' '}
        <Text style={styles.value}>
          {details.genres
            ? details.genres.map((genre) => genre.name).join(', ')
            : 'N/A'}
        </Text>
      </Text>

      <FlatList
        horizontal
        data={details.credits.cast}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActorCell name={item.name} profile_path={item.profile_path} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  overview: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default DetailInfo;
