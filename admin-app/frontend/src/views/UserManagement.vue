<template>
  <div>
    <h1 class="ml-8">
      {{ $t('userManagement.title') }}
    </h1>
    <v-container class="mt-8">
      <v-form ref="form" @submit.prevent="submit" lazy-validation>
        <div class="d-flex flex-column flex-sm-row">
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.isEmail]"
            :label="$t('Login.email')"
            :disabled="loading"
            required
            outlined
          ></v-text-field>
        </div>
        <v-btn :disabled="loading" type="submit" block large color="primary" class="text-none">
          <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
          <span v-else>
            {{ $t('userManagement.sendInvitation') }}
          </span>
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { routeNamesDict, vuexModulesDict, typesDictionary } from '../lib/constants';
import { formValidators } from '../lib/utils';

export default {
  name: routeNamesDict.UserManagement,
  components: {},
  data() {
    return {
      loading: false,
      email: null,
      rules: {
        required: formValidators.required,
        isEmail: formValidators.isEmail,
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      showFeedbackForDuration: `${vuexModulesDict.feedback}/showFeedbackForDuration`,
      createUser: `${vuexModulesDict.user}/createUser`,
    }),
    async submit() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        this.showFeedbackForDuration({
          type: typesDictionary.error,
          text: this.$t('general.form.invalidForm'),
        });
        return;
      }
      this.loading = true;
      await this.createUser({
        email: this.email,
      });
      this.loading = false;
    },
  },
};
</script>

<style scoped></style>
