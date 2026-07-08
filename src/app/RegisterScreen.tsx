import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Spacing, MaxContentWidth, BottomTabInset } from "@/constants/theme";

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister() {
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // If email verification is enabled in Supabase:
    setMessage("Check your email to confirm your account");

    // If verification is disabled, auto-login:
    // router.replace("/");
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Create Account</ThemedText>
          <ThemedText type="small">Sign up to get started</ThemedText>
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

          <ThemedText type="smallBold" style={{ marginTop: Spacing.three }}>
            Confirm Password
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          {error.length > 0 && (
            <ThemedText type="small" style={{ color: "red" }}>
              {error}
            </ThemedText>
          )}

          {message.length > 0 && (
            <ThemedText type="small" style={{ color: "#4CAF50" }}>
              {message}
            </ThemedText>
          )}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <ThemedText type="smallBold" style={styles.buttonText}>
              Sign Up
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/LoginScreen")}
            style={{ marginTop: Spacing.two }}
          >
            <ThemedText type="small">
              Already have an account? Log in
            </ThemedText>
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
