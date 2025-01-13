import { defineStore } from 'pinia';
import {
  signIn,
  signOut,
  confirmSignIn,
  getCurrentUser,
} from '@aws-amplify/auth';

// src/types/LoginState.ts
export enum AuthenticationState {
    LoggedIn = "LOGGED_IN",
    LoggedOut = "LOGGED_OUT",
    PasswordResetRequired = "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED",
}

export const requiresPasswordReset = "RESET_PASSWORD";

export const useAuthStore = defineStore('auth', {
    state: () => ({
      user: null as any,
      authenticationState: AuthenticationState.LoggedOut,
      loading: false,
      username: null as string | null,
      error: null as string | null,
      nextStep: null as any,
    }),
    actions: {
      async login(username: string, password: string) {
        this.loading = true;
        this.error = null;
        try {
          const signInOutput = await signIn({ username, password });
          console.log("signInOutput", signInOutput);
            if(signInOutput.isSignedIn) { 
                this.authenticationState = AuthenticationState.LoggedIn;
                this.user = await getCurrentUser();
            }
            else {
                if (signInOutput.nextStep.signInStep === requiresPasswordReset) {
                    this.authenticationState = AuthenticationState.PasswordResetRequired;
                    this.username = username;
                    this.nextStep = signInOutput.nextStep;
                }
            }
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'Login failed';
          console.error("Login error:", error);
        } finally {
          this.loading = false;
        }
      },
      async initialPasswordReset(newPassword: string) {
        this.loading = true;
        this.error = null;

        try {
            const userAttributes = {
                username: this.username,
            }

            const confirmSignInResult = await confirmSignIn({
                challengeResponse: newPassword,
              });
              
          this.authenticationState = AuthenticationState.LoggedIn;
          this.user = await getCurrentUser();
          this.nextStep = null;
          this.loading= false;
          //navigate to home route
          
          return true;
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'Password reset failed';
          console.error("Password reset error:", error);
          this.loading = false;
          return false;
        } 
      },

      async logout() {
        this.loading = true;
        this.error = null;
        try {
          await signOut();
          this.authenticationState = AuthenticationState.LoggedOut;
          this.user = null;
        } catch (error) {
          this.error = error instanceof Error ? error.message : 'Logout failed';
          console.error("Logout error:", error);
        } finally {
          this.loading = false;
        }
      },



      
    }
  });