<template>
  <v-snackbar v-model="isFeedbackShown" :color="type" :timeout="duration" class="feedback-snackbar">
    <v-alert border="left" :type="type" class="feedback-alert" prominent>
      {{ text }}
    </v-alert>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Feedback',
  computed: {
    ...mapGetters({
      type: 'feedbackModule/getType',
      text: 'feedbackModule/getText',
      isDisplayed: 'feedbackModule/getIsDisplayed',
      duration: 'feedbackModule/getDuration',
    }),
  },
  methods: {
    ...mapMutations({
      setIsDisplayed: 'feedbackModule/setIsDisplayed',
    }),
  },
  watch: {
    isDisplayed(newValue) {
      if (newValue) this.isFeedbackShown = true;
    },
    isFeedbackShown(newValue) {
      if (!newValue) this.setIsDisplayed({ newValue: false });
    },
  },
  data() {
    return {
      isFeedbackShown: false,
    };
  },
};
</script>

<style>
.feedback-alert {
  margin: 0 !important;
}

.feedback-snackbar > .v-snack__wrapper > .v-snack__content {
  padding: 0 0 !important;
}
</style>
