<template>
  <div>
    <h1 class="ml-8">
      {{ $t("interventions.title") }}
    </h1>
    <sub class="ml-8">
      {{ $t("interventions.subtitle") }}
    </sub>
    <v-container class="mt-8">
      <v-row>
        <v-col cols="12" sm="6" md="4" xl="3">
          <DataCreationButtonCard
            :dataType="dataTypesDict.intervention"
            subtitleI18nSelector="interventions.newIntervention"
          >
            <template v-slot:creation-button="slotProps">
              <v-btn
                fab
                x-large
                color="primary"
                @click="slotProps.clickHandler"
              >
                <v-icon dark> mdi-wrench </v-icon>
              </v-btn>
            </template>
          </DataCreationButtonCard>
        </v-col>
        <v-col
          v-for="intervention in interventions"
          :key="intervention.id"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <Intervention
            :id="intervention.id"
            :interventionName="intervention.name"
            :interventionDescription="intervention.description"
            :interventionTagIds="intervention.tagIds"
            :interventionContent="intervention.content"
          />
        </v-col>
        <v-col
          v-for="index in ['s1', 's2', 's3']"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <InterventionSkeleton v-if="loading" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { waitForMilliseconds } from "../lib/utils";
import {
  dataTypesDict,
  routeNamesDict,
  vuexModulesDict,
} from "../lib/constants";

import Intervention from "../components/interventions/Intervention.vue";
import InterventionSkeleton from "../components/interventions/InterventionSkeleton.vue";
import DataCreationButtonCard from "../components/commons/DataCreationButtonCard.vue";

export default {
  name: routeNamesDict.Interventions,
  components: {
    Intervention,
    DataCreationButtonCard,
    InterventionSkeleton,
  },
  data() {
    return {
      showInterventionModal: false,
    };
  },
  computed: {
    ...mapGetters({
      interventions: `${vuexModulesDict.intervention}/getInterventions`,
      loading: `${vuexModulesDict.intervention}/getLoading`,
      isInterventionModalDisplayed: `${vuexModulesDict.dataModal}/getIsDisplayed`,
    }),
    currentLocale() {
      return this.$i18n.locale;
    },
    dataTypesDict() {
      return dataTypesDict;
    },
  },
  watch: {
    isInterventionModalDisplayed: "destroyInterventionModalAfterDelay",
  },
  methods: {
    // If closed, wait for 500, if still closed, destroy component instance
    async destroyInterventionModalAfterDelay(newValue) {
      if (newValue) {
        this.showInterventionModal = true;
        return;
      }
      await waitForMilliseconds(500);
      if (!this.isInterventionModalDisplayed)
        this.showInterventionModal = false;
    },
  },
};
</script>

<style scoped></style>
