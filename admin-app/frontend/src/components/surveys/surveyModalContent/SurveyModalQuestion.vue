<template>
  <v-card class="px-4 pt-4">
    <v-form ref="form" lazy-validation>
      <v-card-title>
        <h2>
          {{ surveyName }}
        </h2>
      </v-card-title>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "SurveyModalQuestion",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      surveyName: "ivGui/getSurveyNameCurrentlyBeingEdited",
    }),
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
  },
};
</script>
