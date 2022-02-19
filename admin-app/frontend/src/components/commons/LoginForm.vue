<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="[rules.required]"
      :label="$t('login.email')"
      :disabled="loading"
      required
      outlined
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required]"
      :type="showPassword ? 'text' : 'password'"
      :label="$t('login.password')"
      @click:append="showPassword = !showPassword"
      :disabled="loading"
      outlined
    ></v-text-field>
    <div class="d-flex justify-space-between">
      <v-checkbox
        class="my-0"
        v-model="rememberMe"
        :label="$t('login.rememberMe')"
        :disabled="loading"
        @click="showToBeImplementedFeedback"
      ></v-checkbox>
      <div class="mt-1" @click="showToBeImplementedFeedback" style="cursor: pointer">
        <p class="py-0">{{ $t('login.forgotPassword') }}</p>
      </div>
    </div>
    <v-btn :disabled="loading" type="submit" block large color="primary" class="text-none">
      <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
      <span v-else>
        {{ $t('login.signIn') }}
      </span>
    </v-btn>
    <v-btn
      type="submit"
      block
      outlined
      large
      color="grey"
      class="mt-2 text-none"
      :disabled="loading"
      @click.prevent="showToBeImplementedFeedback"
    >
      <GoogleIcon />
      {{ $t('login.withGoogle') }}
    </v-btn>
    <div class="d-flex justify-end mt-4">
      <p>
        {{ $t('login.dontHaveAnAccount') }}
        <span>
          {{ $t('login.askYourAdmin') }}
        </span>
      </p>
    </div>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GoogleIcon from './GoogleIcon.vue';

export default {
  components: { GoogleIcon },
  name: 'LoginForm',
  data() {
    return {
      email: null,
      password: null,
      showPassword: false,
      rules: {
        required: (value) => !!value || this.requiredi18n,
      },
      rememberMe: true,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({}),
    requiredi18n() {
      return this.$t('general.form.required');
    },
  },
  methods: {
    ...mapActions({
      showToBeImplementedFeedback: 'FEEDBACK_UI/showToBeImplementedFeedback',
      signIn: 'auth/signIn',
    }),
    async submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        const signInStatus = await this.signIn({
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        });
        if (signInStatus === 'success') {
          this.$router.push({ name: 'Home' });
          return;
        }
        if (signInStatus === 'failed') {
          this.loading = false;
          // TODO: handle error
          return;
        }
        if (signInStatus === 'completeUserInfo') {
          this.$router.push({ name: 'CompleteUserInfo' });
        }
      }
    },
  },
};
</script>
