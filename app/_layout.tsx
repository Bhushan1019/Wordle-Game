import { Stack, useRouter } from "expo-router";
import {
  useFonts,
  FrankRuhlLibre_800ExtraBold,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_900Black,
} from "@expo-google-fonts/frank-ruhl-libre";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  Appearance,
  Platform,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/cache";
import Logo from "@/assets/images/nyt-logo.svg";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  // const [dark] = useMMKVBoolean('dark-mode', storage);

  // useEffect(() => {
  //   if (Platform.OS !== 'web') {
  //     Appearance.setColorScheme(dark ? 'dark' : 'light');
  //   }
  // }, [dark]);

  let [fontsLoaded] = useFonts({
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="login"
                  options={{
                    presentation: "modal",
                    headerShadowVisible: false,
                    headerTitle: () => <Logo width={100} height={30} />,
                    // headerLeft: () => (
                    //   <TouchableOpacity onPress={() => router.back()}>
                    //     <Ionicons
                    //       name="close"
                    //       size={26}
                    //       color={Colors.light.gray}
                    //     />
                    //   </TouchableOpacity>
                    // ),
                  }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
