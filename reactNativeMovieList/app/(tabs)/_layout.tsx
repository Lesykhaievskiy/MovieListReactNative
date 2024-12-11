import React from 'react';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='movieList'
        options={{ title: 'MoviesList', headerShown: false }}
      />
      <Tabs.Screen
        name='favoriteMovies'
        options={{ title: 'Favorites', headerShown: false }}
      />
      <Tabs.Screen
        name='search'
        options={{ title: 'Search', headerShown: false }}
      />
    </Tabs>
  );
};

export default TabsLayout;
