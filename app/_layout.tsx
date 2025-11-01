import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import { COLORS } from '@/constants/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="surah/[id]"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: COLORS.text,
            headerTitleStyle: { fontFamily: 'Inter_600SemiBold' },
            title: 'Sure Detayı',
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTransparent: false,
            headerBlurEffect: 'dark',
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
