<template>
  <v-card
    style="height: 100%; position: relative"
    class="pa-2"
    outlined
    tile
    @click="clickHandler"
  >
    <v-chip class="ml-2" style="position: absolute; top: 16px; z-index: 1">
      <v-icon class="mr-2">
        {{
          interventionType === technology ? "mdi-hammer-wrench" : "mdi-school"
        }}
      </v-icon>
      {{
        calculateUILocaleString({
          languageTexts: interventionName.languageTexts,
        })
      }}
    </v-chip>
    <ImgFromS3 :assumedSrc="deriveImgPath" dataType="survey">
      <template v-slot:v-img="slotProps">
        <v-img height="200px" :src="slotProps.src"> </v-img>
      </template>
    </ImgFromS3>
    <v-card-title>
      {{ calculateUILocaleString({ languageTexts: surveyName.languageTexts }) }}
      <v-spacer></v-spacer>
      <v-chip v-for="tagId in surveyTagIds" :key="tagId" class="ml-2"
        >{{ tagById({ id: tagId }).text }}
      </v-chip>
    </v-card-title>
    <v-card-subtitle class="mt-0">
      {{
        calculateUILocaleString({
          languageTexts: surveyDescription.languageTexts,
        })
      }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { dataTypesDict, vuexModulesDict } from "../../lib/constants";
import { InterventionType } from "../../models";
import ImgFromS3 from "../commons/ImgFromS3.vue";

export default {
  components: { ImgFromS3 },
  name: "Survey",
  props: {
    id: {
      type: String,
      required: true,
    },
    surveyName: {
      type: Object,
      required: true,
    },
    surveyDescription: {
      type: Object,
      required: true,
    },
    surveyTagIds: {
      type: Array,
    },
    surveyContent: {
      type: Array,
    },
    interventionId: {
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      tagById: `${vuexModulesDict.survey}/tagById`,
      calculateUILocaleString: "calculateUILocaleString",
      deriveFilePath: "callDeriveFilePathWithOrganizationId",
      INTERVENTIONById: `${vuexModulesDict.intervention}/INTERVENTIONById`,
    }),
    deriveImgPath() {
      return this.deriveFilePath("interventionSurveyPicPath", {
        interventionID: this.interventionId,
        surveyId: this.id,
      });
    },
    interventionName() {
      return this.INTERVENTIONById({ id: this.interventionId })?.name;
    },
    interventionType() {
      return this.INTERVENTIONById({ id: this.interventionId })
        ?.interventionType;
    },
    technology() {
      return InterventionType.TECHNOLOGY;
    },
  },
  methods: {
    clickHandler() {
      this.readData({ dataId: this.id, dataType: dataTypesDict.survey });
    },
    ...mapActions({
      readData: `${vuexModulesDict.dataModal}/readData`,
    }),
  },
};
</script>

<style scoped>
.iv-edit-icon {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
