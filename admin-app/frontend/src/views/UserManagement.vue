<template>
  <div>
    <h1 class="ml-8">
      {{ $t("userManagement.title") }}
    </h1>
    <v-container class="mt-8">
      <v-form ref="form" @submit.prevent="submit" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="phoneNumber"
                :rules="[rules.required, rules.isPhoneNumber]"
                :label="$t('Login.phoneNumber')"
                :disabled="loading"
                required
                outlined
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="group"
                :items="groups"
                item-text="name"
                item-value="id"
                :label="$t('userManagement.groupLabel')"
                :disabled="loading"
                required
                outlined
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                :disabled="loading"
                type="submit"
                block
                large
                color="primary"
                class="text-none"
              >
                <v-progress-circular indeterminate v-if="loading" />
                <span v-else>
                  {{ $t("userManagement.sendInvitation") }}
                </span>
              </v-btn>
            </v-col>
            <v-col cols="12" v-if="finalPassword">
              <v-alert type="success" border="left" class="mt-4">
                {{ $t("userManagement.password", { finalPassword }) }}
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  routeNamesDict,
  vuexModulesDict,
  typesDictionary,
} from "../lib/constants";
import { formValidators } from "../lib/utils";

export default {
  name: routeNamesDict.UserManagement,
  components: {},
  data() {
    return {
      loading: false,
      phoneNumber: null,
      finalPassword: null,
      group: "admin",
      groups: [
        {
          id: "admin",
          name: "Admin-App",
        },
        {
          id: "analytics",
          name: "Analytics-App",
        },
        {
          id: "mobile",
          name: "Mobile-App",
        },
      ],
      rules: {
        required: formValidators.required,
        isPhoneNumber: formValidators.isPhoneNumber,
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
          text: this.$t("general.form.invalidForm"),
        });
        return;
      }
      this.loading = true;
      const finalPassword = await this.createUser({
        phoneNumber: this.phoneNumber,
        group: this.group,
      });
      this.finalPassword = finalPassword;
      this.loading = false;
    },
  },
};
</script>

<style scoped></style>
