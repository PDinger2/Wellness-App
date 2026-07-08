import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Spacing, MaxContentWidth, BottomTabInset } from "@/constants/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/"); // this loads app/index.tsx
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Welcome Back</ThemedText>
          <ThemedText type="small">Log in to continue</ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedText type="smallBold">Email</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <ThemedText type="smallBold" style={{ marginTop: Spacing.three }}>
            Password
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error.length > 0 && (
            <ThemedText type="small" style={{ color: "red" }}>
              {error}
            </ThemedText>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <ThemedText type="smallBold" style={styles.buttonText}>
              Log In
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("/RegisterScreen")}>
            <ThemedText type="small">Don't have an account? Sign up</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.four,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    gap: Spacing.one,
    marginBottom: Spacing.four,
  },
  form: { gap: Spacing.two },
  input: {
    width: "100%",
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.four,
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: 16,
  },
  button: {
    marginTop: Spacing.four,
    backgroundColor: "#4CAF50",
    paddingVertical: Spacing.three,
    borderRadius: Spacing.four,
    alignItems: "center",
  },
  buttonText: { color: "#fff" },
});
