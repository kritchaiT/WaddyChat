import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const { theme, isDark } = useTheme();

    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!username.trim()) return;

        setIsLoading(true);
        try {
            // Simulate auth/login
            await AsyncStorage.setItem("user-session", username);
            // In a real app we would use Context to set user
            // For now just navigate to Main
            navigation.replace("Main");
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.content}
            >
                <View style={styles.header}>
                    {/* Logo placeholder - you can replace with an actual Image */}
                    <View style={[styles.logoContainer, { backgroundColor: theme.primary }]}>
                        <ThemedText style={styles.logoText}>W</ThemedText>
                    </View>
                    <ThemedText type="hero" style={styles.title}>
                        Welcome Back
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Enter your username to sign in
                    </ThemedText>
                </View>

                <View style={styles.form}>
                    <View style={[styles.inputContainer, {
                        backgroundColor: isDark ? theme.backgroundSecondary : "#F5F5F5",
                        borderColor: theme.border,
                        borderWidth: 1
                    }]}>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Username"
                            placeholderTextColor={theme.textSecondary}
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: theme.primary, opacity: username.trim() ? 1 : 0.7 }
                        ]}
                        onPress={handleLogin}
                        disabled={!username.trim() || isLoading}
                    >
                        <ThemedText style={[styles.buttonText, { color: theme.buttonText }]}>
                            {isLoading ? "Logging in..." : "Login"}
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: Spacing.xl,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: Spacing["4xl"],
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: BorderRadius.xl,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Spacing.xl,
    },
    logoText: {
        color: "#FFFFFF",
        fontSize: 40,
        fontWeight: "bold",
    },
    title: {
        marginBottom: Spacing.sm,
        textAlign: "center",
    },
    subtitle: {
        textAlign: "center",
        opacity: 0.7,
    },
    form: {
        gap: Spacing.lg,
    },
    inputContainer: {
        height: Spacing.inputHeight,
        borderRadius: BorderRadius.sm,
        paddingHorizontal: Spacing.md,
        justifyContent: "center",
    },
    input: {
        fontSize: 16,
        height: "100%",
    },
    button: {
        height: Spacing.buttonHeight,
        borderRadius: BorderRadius.sm,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Spacing.sm,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 16,
    },
});
