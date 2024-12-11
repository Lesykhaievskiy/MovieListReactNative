import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '~/src/config/redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}