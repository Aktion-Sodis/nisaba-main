import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  signIn,
  signOut,
  confirmSignIn,
  getCurrentUser,
  fetchAuthSession,
  GetCurrentUserOutput,
} from '@aws-amplify/auth';

// src/types/LoginState.ts
export enum AuthenticationState {
    LoggedIn = "LOGGED_IN",
    LoggedOut = "LOGGED_OUT",
    PasswordResetRequired = "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED",
}

export const requiresPasswordReset = "RESET_PASSWORD";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<GetCurrentUserOutput | null>(null);
    const authenticationState = ref<AuthenticationState>(AuthenticationState.LoggedOut);
    const loading = ref(false);
    const username = ref<string | null>(null);
    const error = ref<string | null>(null);
    const nextStep = ref<any>(null);

    const login = async (usernameInput: string, password: string) => {
        loading.value = true;
        error.value = null;
        try {
            const signInOutput = await signIn({ username: usernameInput, password });
            console.log("signInOutput", signInOutput);
            if(signInOutput.isSignedIn) { 
                const currentUser = await getCurrentUser();
                authenticationState.value = AuthenticationState.LoggedIn;
                user.value = currentUser;
            }
            else {
                if (signInOutput.nextStep.signInStep === requiresPasswordReset) {
                    authenticationState.value = AuthenticationState.PasswordResetRequired;
                    username.value = usernameInput;
                    nextStep.value = signInOutput.nextStep;
                }
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            error.value = errorMessage;
            console.error("Login error:", err);
        } finally {
            loading.value = false;
        }
    };

    const initialPasswordReset = async (newPassword: string) => {
        loading.value = true;
        error.value = null;

        try {
            const confirmSignInResult = await confirmSignIn({
                challengeResponse: newPassword,
            });
              
            const currentUser = await getCurrentUser();
            authenticationState.value = AuthenticationState.LoggedIn;
            user.value = currentUser;
            nextStep.value = null;
            loading.value = false;
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
            error.value = errorMessage;
            console.error("Password reset error:", err);
            loading.value = false;
            return false;
        } 
    };

    const logout = async () => {
        loading.value = true;
        error.value = null;
        try {
            await signOut();
            authenticationState.value = AuthenticationState.LoggedOut;
            user.value = null;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Logout failed';
            error.value = errorMessage;
            console.error("Logout error:", err);
        } finally {
            loading.value = false;
        }
    };

    const checkAuth = async () => {
        try {
            // This will throw if there's no valid session
            const { tokens } = await fetchAuthSession({
              forceRefresh: true
            });
            const currentUser = await getCurrentUser();
            
            if (tokens && currentUser) {
                authenticationState.value = AuthenticationState.LoggedIn;
                user.value = currentUser;
            }
        } catch (err) {
            console.error("Check auth error:", err);
            authenticationState.value = AuthenticationState.LoggedOut;
            user.value = null;
        }
    };

    return {
        user,
        authenticationState,
        loading,
        username,
        error,
        nextStep,
        login,
        initialPasswordReset,
        logout,
        checkAuth
    };
});