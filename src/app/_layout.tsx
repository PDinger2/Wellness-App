import { Slot, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UserProvider } from "@/components/context/userContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }

      setReady(true);
      SplashScreen.hideAsync();
    };

    init();
  }, []);

  if (!ready) return null;

  return(
  <SafeAreaProvider>
    <UserProvider>
      <Slot />
    </UserProvider>
  </SafeAreaProvider>
  
  );
}
