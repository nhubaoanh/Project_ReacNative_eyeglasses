import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  
  return (
    <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
