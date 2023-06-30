<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <v-card
      class="auth-card pa-4 pt-7"
      width="450"
    >
      <v-card-item class="justify-center">
        <template #prepend>
          <div class="d-flex align-center">
            <img src="@/assets/NisabaSmall.png" size="50" alt="Logo" class="logo-image">
          </div>
        </template>

      </v-card-item>

      <v-card-text class="pt-2">
        <h5 class="text-h5 mb-1">
            {{ $t("login.welcome-title") }}
        </h5>
        <p class="mb-0">
            {{ $t("login.welcome-subtitle") }}
        </p>
      </v-card-text>

      <v-card-text>
        <v-form @submit.prevent="$router.push('/')">
          <v-row>
            <!-- email -->
            <v-col cols="12">
                <v-text-field
                    :label="$t('login.email-label')"
                    v-model="email"
                    variant="outlined"
                    :rules="[required]"
                    :readonly="loading"
                    class="mb-2"
                    clearable
                ></v-text-field>
            </v-col>

            <!-- password -->
            <v-col cols="12">

                <v-text-field
                    :label="$t('login.password-label')"
                    v-model="password"
                    variant="outlined"
                    :readonly="loading"
                    class="mb-2"
                    clearable
                    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    hint="At least 8 characters"
                    counter
                    @click:append-inner="show = !show"
                ></v-text-field>

              <!-- remember me checkbox -->
            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <v-checkbox v-model="rememberMe" :label="$t('login.remember-me-label')" class="mr-2" color="primary"></v-checkbox>
            </div>

              <!-- login button -->
              <v-btn
                block
                type="submit"
                color="primary"
                class="login-btn"
              >
              {{ $t("login.login-label") }}
              </v-btn>
            </v-col>

          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import { useAuthStore } from '@/store/authentication';

export default {
    name: 'AuthLogin',
    data: () => ({
        rememberMe: false,
        form: false,
        email: null,
        password: null,
        loading: false,
        show: false,                       
        rules: {          
            required: value => !!value || 'Required.',          
            min: v => v.length >= 8 || 'Min 8 characters',          
            emailMatch: () => `The email and password you entered don't match`,        
        },
    }),

    methods: {
      login() {
        //   this.loading = true
          
        //   setTimeout(async () => {
        //     const authStore = useAuthStore()
        //     await authStore.signIn(this.email, this.password)

        //     this.$router.push('/')

        //   }, 1000)
      },
      required (v) {
          return !!v || 'Field is required'
      },
    },
}
</script>

<style scoped>
.logo-image {
  width: 50px; /* Set the desired width */
  height: 50px; /* Set the desired height */
}
.login-btn {
    border-radius: 5px;
    height: 40px !important;
}
</style>
