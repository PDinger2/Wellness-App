import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;

      if (!session) {
        router.replace("/LoginScreen");
      }

      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/LoginScreen");
        } else {
          router.replace("/"); // dashboard
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return <Slot />;
}
