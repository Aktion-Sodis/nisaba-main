import {
  signIn,
  signOut,
  confirmSignIn,
  getCurrentUser,
  fetchAuthSession,
  GetCurrentUserOutput,
  AuthUser,
} from '@aws-amplify/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserStore } from './user';

// src/types/LoginState.ts
export enum AuthenticationState {
  LoggedIn = 'LOGGED_IN',
  LoggedOut = 'LOGGED_OUT',
  PasswordResetRequired = 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED',
  ProfileSetupRequired = 'PROFILE_SETUP_REQUIRED',
}

export const useAuthStore = defineStore('auth', () => {
  const { t } = useI18n();
  const user = ref<AuthUser | null>(null);
  

  const authenticationState = ref<AuthenticationState>(
    AuthenticationState.LoggedOut
  );
  const loading = ref(false);
  const username = ref<string | null>(null);
  const error = ref<string | null>(null);
  const pendingUserId = ref<string | null>(null);

  const userStore = useUserStore();

  const login = async (usernameInput: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const signInOutput = await signIn({ username: usernameInput, password });
      console.log('signInOutput', signInOutput);
      if (signInOutput.isSignedIn) {
        const currentUser = await getCurrentUser();
        user.value = currentUser;
        try {
          const userData = await userStore.getUserAsync(currentUser.userId);
          if (userData === null) {
            pendingUserId.value = currentUser.userId;
            authenticationState.value =
              AuthenticationState.ProfileSetupRequired;
          } else {
            authenticationState.value = AuthenticationState.LoggedIn;
          }
        } catch (err) {
          error.value = t('login.errors.load_user_data_failed');
          authenticationState.value = AuthenticationState.LoggedOut;
          user.value = null;
        }
      } else {
        if (
          signInOutput.nextStep.signInStep ===
          AuthenticationState.PasswordResetRequired
        ) {
          authenticationState.value = AuthenticationState.PasswordResetRequired;
          username.value = usernameInput;
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('login.errors.login_failed');
      error.value = errorMessage;
      console.error('Login error:', err);
    } finally {
      loading.value = false;
    }
  };

  const initialPasswordReset = async (
    newPassword: string,
    firstName: string,
    lastName: string
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const _confirmSignInResult = await confirmSignIn({
        challengeResponse: newPassword,
      });

      const currentUser = await getCurrentUser();
      user.value = currentUser;
      try {
        await userStore.createUserInitialSetup(
          currentUser.userId,
          firstName,
          lastName
        );
        authenticationState.value = AuthenticationState.LoggedIn;
        return true;
      } catch (err) {
        error.value = 'Failed to create user profile. Please try again.';
        authenticationState.value = AuthenticationState.ProfileSetupRequired;
        user.value = null;
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Password reset failed';
      error.value = errorMessage;
      console.error('Password reset error:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const setupProfile = async (firstName: string, lastName: string) => {
    if (!pendingUserId.value) {
      error.value = 'No pending user ID found. Please try logging in again.';
      return false;
    }

    loading.value = true;
    error.value = null;

    try {
      await userStore.createUserInitialSetup(
        pendingUserId.value,
        firstName,
        lastName
      );
      authenticationState.value = AuthenticationState.LoggedIn;
      pendingUserId.value = null;
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Profile setup failed';
      error.value = errorMessage;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await signOut();
      authenticationState.value = AuthenticationState.LoggedOut;
      user.value = null;
      pendingUserId.value = null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      error.value = errorMessage;
      console.error('Logout error:', err);
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = async () => {
    try {
      // This will throw if there's no valid session
      const { tokens } = await fetchAuthSession({
        forceRefresh: true,
      });
      const currentUser = await getCurrentUser();

      if (tokens && currentUser) {
        user.value = currentUser;
        try {
          const userData = await userStore.getUserAsync(currentUser.userId);
          if (userData === null) {
            pendingUserId.value = currentUser.userId;
            authenticationState.value =
              AuthenticationState.ProfileSetupRequired;
          } else {
            authenticationState.value = AuthenticationState.LoggedIn;
          }
        } catch (err) {
          error.value =
            'Failed to load user data. Please try logging in again.';
          authenticationState.value = AuthenticationState.LoggedOut;
          user.value = null;
        }
      }
    } catch (err) {
      authenticationState.value = AuthenticationState.LoggedOut;
      user.value = null;
      pendingUserId.value = null;
    }
  };

  return {
    user,
    authenticationState,
    loading,
    username,
    error,
    login,
    initialPasswordReset,
    setupProfile,
    logout,
    checkAuth,
  };
});
