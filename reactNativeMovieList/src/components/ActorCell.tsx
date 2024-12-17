import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface ActorProps {
  name: string;
  profile_path: string;
}

const ActorCell = (actor: ActorProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: actor.profile_path
            ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
            : 'https://via.placeholder.com/100x150',
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{actor.name}</Text>
    </View>
  );
};

export default ActorCell;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 100,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});
