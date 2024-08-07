<template>
  <v-dialog
    v-model="isInterventionModalDisplayed"
    max-width="1200px"
    persistent
    @keydown.esc="escHandler"
  >
    <v-card class="px-0 pt-0 px-md-4 pt-md-4">
      <v-form lazy-validation>
        <v-card-title>
          <h2 v-if="edit">
            {{ $t('interventions.modal.modalTitle.edit') }}
            <i>
              {{
                calculateUILocaleString({
                  languageTexts: interventionInFocus.name.languageTexts,
                })
              }}
            </i>
          </h2>
          <h2 v-else-if="create">
            {{ $t('interventions.modal.modalTitle.create') }}
          </h2>
          <h2 v-else>
            {{ $t('interventions.modal.modalTitle.read') }}
          </h2>
        </v-card-title>
        <v-card-subtitle v-if="edit">
          {{ $t('interventions.modal.modalDescription.edit') }}
        </v-card-subtitle>
        <v-card-subtitle v-else-if="create">
          {{ $t('interventions.modal.modalDescription.create') }}
        </v-card-subtitle>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" class="pb-0 px-0 px-sm-3">
                <v-card-title class="pt-0 pt-sm-2">
                  {{ $t('interventions.modal.name') }}
                </v-card-title>
                <h2 v-if="read && interventionInFocus">
                  {{
                    calculateUILocaleString({
                      languageTexts: interventionInFocus.name.languageTexts,
                    })
                  }}
                </h2>
                <LocaleTextBox
                  v-else
                  labelPrefixI18nSelector="interventions.modal.name"
                  :initVal="name"
                  @res="nameUpdatedHandler"
                >
                  <template v-slot:text-input="slotProps">
                    <v-text-field
                      :label="slotProps.label"
                      v-model="slotProps.model"
                      autofocus
                      required
                      outlined
                      dense
                      @input="slotProps.inputHandler"
                    ></v-text-field>
                  </template>
                </LocaleTextBox>

                <v-card-title class="pt-4">
                  {{ $t('interventions.modal.description') }}
                </v-card-title>
                <div
                  v-if="read && interventionInFocus"
                  class="d-flex flex-column justify-center"
                  style="min-height: 10rem"
                >
                  <h3>
                    {{
                      calculateUILocaleString({
                        languageTexts: interventionInFocus.description.languageTexts,
                      })
                    }}
                  </h3>
                </div>

                <LocaleTextBox
                  v-else
                  labelPrefixI18nSelector="interventions.modal.description"
                  :initVal="description"
                  @res="descriptionUpdatedHandler"
                >
                  <template v-slot:text-input="slotProps">
                    <v-textarea
                      autofocus
                      required
                      outlined
                      dense
                      :label="slotProps.label"
                      v-model="slotProps.model"
                      @input="slotProps.inputHandler"
                    ></v-textarea>
                  </template>
                </LocaleTextBox>
              </v-col>

              <v-col cols="12" sm="6" class="pt-6 pt-sm-3 px-0 px-sm-3">
                <v-card-title class="pt-0 pt-sm-2">
                  {{ $t('interventions.type.title') }}:

                  <div v-if="read && interventionInFocus">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-avatar v-bind="attrs" v-on="on">
                          <v-icon>
                            {{
                              interventionInFocus.interventionType === InterventionType.TECHNOLOGY
                                ? 'mdi-hammer-wrench'
                                : 'mdi-school'
                            }}
                          </v-icon>
                        </v-avatar>
                      </template>
                      <span>{{
                        $t(`interventions.type.types.${interventionInFocus.interventionType}`)
                      }}</span>
                    </v-tooltip>
                  </div>

                  <v-btn-toggle v-else v-model="typeIndex" mandatory class="ml-2">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                          <v-icon>mdi-hammer-wrench</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('interventions.type.types.TECHNOLOGY') }}</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                          <v-icon>mdi-school</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('interventions.type.types.EDUCATION') }}</span>
                    </v-tooltip>
                  </v-btn-toggle>
                </v-card-title>

                <v-card-title class="pt-0 pt-sm-2">
                  {{ $t('interventions.modal.image') }}
                </v-card-title>

                <ImgFromS3
                  :assumedSrc="assumedSrc"
                  :key="rerenderImgFromS3"
                  dataType="intervention"
                >
                  <template v-slot:v-img="slotProps">
                    <v-img max-height="200px" :src="slotProps.src">
                      <v-btn
                        v-if="!read"
                        fab
                        class="iv-edit-icon"
                        color="primary"
                        @click="selectImg"
                      >
                        <v-icon color="darken-2"> mdi-pencil-outline </v-icon>
                      </v-btn>

                      <FileInput
                        v-if="!read"
                        ref="img-upload"
                        style="display: none"
                        :acceptedType="'image/png'"
                      />
                    </v-img>
                  </template>
                </ImgFromS3>

                <!-- <v-card-title>
                  {{ $t('baseData.tags') }}
                </v-card-title>

                <div v-if="read && interventionInFocus">
                  <v-chip v-for="tagId in interventionInFocus.tags" :key="tagId">
                    {{
                      calculateUILocaleString({
                        languageTexts: tagById({ id: tagId }).text.languageTexts,
                      })
                    }}
                  </v-chip>
                </div>
                <v-select
                  v-else
                  v-model="tagIds"
                  :items="allInterventionTags"
                  item-value="id"
                  deletable-chips
                  chips
                  dense
                  :label="$t('baseData.tags')"
                  multiple
                  outlined
                >
                  <template v-slot:selection="data">
                    {{
                      calculateUILocaleString({
                        languageTexts: data.item.text.languageTexts,
                      })
                    }}
                  </template>
                  <template v-slot:item="data">
                    {{
                      calculateUILocaleString({
                        languageTexts: data.item.text.languageTexts,
                      })
                    }}
                  </template>
                </v-select> -->

                <v-card-title>
                  {{ $t('baseData.documents') }}
                  <v-btn
                    v-if="!read"
                    fab
                    x-small
                    color="primary lighten-2"
                    class="ml-2"
                    @click="showToBeImplementedFeedback"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
                <v-expansion-panels
                  accordion
                  v-if="interventionInFocus && allDocumentsOfIntervention.length > 0"
                >
                  <v-expansion-panel v-for="doc in allDocumentsOfIntervention" :key="doc.id">
                    <v-expansion-panel-header outlined>
                      <div class="d-flex justify-start">
                        <v-icon> mdi-file-document-outline </v-icon>
                        <p class="mb-0 pt-1 ml-2 text-subtitle-1">
                          {{ doc.name }}
                        </p>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <p style="transform: translateY(-12px)" class="mb-0">
                        {{ doc.description }}
                      </p>
                      <v-chip v-for="tagId in doc.tags" :key="tagId" class="mr-2">
                        {{ interventionContentTagById(tagId).name }}
                      </v-chip>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <p v-else-if="read">{{ $t('interventions.modal.noDocuments') }}</p>

                <v-card-title>
                  {{ $t('baseData.images') }}
                  <v-btn
                    v-if="!read"
                    fab
                    x-small
                    color="primary lighten-2"
                    class="ml-2"
                    @click="showToBeImplementedFeedback"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
                <div v-if="interventionInFocus && allImagesOfIntervention.length > 0">
                  <v-row>
                    <v-col
                      v-for="img in allImagesOfIntervention"
                      :key="img.id"
                      class="d-flex child-flex"
                      cols="3"
                    >
                      <v-img
                        src="https://picsum.photos/id/11/500/300"
                        lazy-src="https://picsum.photos/id/11/10/6"
                        aspect-ratio="1"
                      >
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                  </v-row>
                </div>
                <p v-else-if="read">{{ $t('interventions.modal.noImages') }}</p>

                <v-card-title>
                  {{ $t('baseData.videos') }}
                  <v-btn
                    v-if="!read"
                    fab
                    x-small
                    color="primary lighten-2"
                    class="ml-2"
                    @click="showToBeImplementedFeedback"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
                <div v-if="interventionInFocus && allVideosOfIntervention.length > 0">
                  <div v-for="vid in allVideosOfIntervention" :key="vid.id">
                    <video width="50"></video>
                  </div>
                </div>
                <p v-else-if="read">{{ $t('interventions.modal.noVideos') }}</p>

                <v-card-title>
                  {{ $t('baseData.surveys') }}
                  <v-btn
                    v-if="!read"
                    fab
                    x-small
                    color="primary lighten-2"
                    class="ml-2"
                    @click="showToBeImplementedFeedback"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
                <p v-if="read">
                  {{ $t('interventions.modal.noSurveys') }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn x-large v-if="edit" @click="deleteHandler" color="warning" text>
            {{ $t('general.delete') }}
            <v-icon large> mdi-delete </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn x-large color="secondary" text @click="closeHandler">
            {{ read ? 'Close' : $t('general.cancel') }}
          </v-btn>
          <v-btn x-large v-if="read" color="primary" text @click="editHandler">
            {{ $t('general.edit') }}
          </v-btn>
          <v-btn
            x-large
            v-if="!read"
            type="submit"
            color="primary"
            text
            @click.prevent="submitHandler"
            :disabled="!interventionFormIsInvalid"
          >
            {{ $t('general.save') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { modalModesDict, dataTypesDict, vuexModulesDict } from '../../lib/constants';
import LocaleTextBox from '../commons/form/LocaleTextBox.vue';
import { Intervention, InterventionType } from '../../models';
import { emptyMutableI18nString, mutableI18nString } from '../../lib/classes';
import FileInput from '../commons/form/FileInput.vue';
import ImgFromS3 from '../commons/ImgFromS3.vue';

const interventionDescriptionMaxChar = Math.max(
  parseInt(process.env.VUE_APP_INTERVENTION_DESCRIPTION_MAX_CHAR, 10),
  0,
);

export default {
  name: 'InterventionModal',
  components: { LocaleTextBox, FileInput, ImgFromS3 },
  data() {
    return {
      interventionDescriptionMaxChar,
      InterventionType,
      rules: {
        maxChar: (value) => value.length <= interventionDescriptionMaxChar || this.maxCharExceededi18n,
      },
      id: null,
      name: emptyMutableI18nString(),
      typeIndex: 0,
      types: [InterventionType.TECHNOLOGY, InterventionType.EDUCATION],
      description: emptyMutableI18nString(),
      // tagIds: [],
      levelIds: [],
      contents: [],
      rerenderImgFromS3: false,
    };
  },
  watch: {
    interventionDraft: 'prefillComponentDataFromInterventionDraft',
    imageFile() {
      this.rerenderImgFromS3 = !this.rerenderImgFromS3;
    },
  },
  mounted() {
    if (!this.read) this.prefillComponentDataFromInterventionDraft();
  },
  computed: {
    ...mapGetters({
      dataModalMode: `${vuexModulesDict.dataModal}/getMode`,
      isDataModalDisplayed: `${vuexModulesDict.dataModal}/getIsDisplayed`,
      dataType: `${vuexModulesDict.dataModal}/getDataType`,
      dataIdInFocus: `${vuexModulesDict.dataModal}/getDataIdInFocus`,
      interventionDraft: `${vuexModulesDict.dataModal}/getDataDraft`,
      INTERVENTIONById: `${vuexModulesDict.intervention}/INTERVENTIONById`,
      LEVELById: `${vuexModulesDict.level}/LEVELById`,

      imageFile: `${vuexModulesDict.dataModal}/getImageFile`,

      interventionContentTagById: `${vuexModulesDict.intervention}/interventionContentTagById`,

      calculateUILocaleString: 'calculateUILocaleString',
      deriveFilePath: 'callDeriveFilePathWithOrganizationId',
    }),
    isInterventionModalDisplayed() {
      return this.isDataModalDisplayed && this.dataType === dataTypesDict.intervention;
    },
    maxCharExceededi18n() {
      return this.$t('general.form.maxCharExceeded', {
        maxChar: interventionDescriptionMaxChar,
      });
    },
    deriveImgPath() {
      if (this.create) return null;
      return this.deriveFilePath('interventionPicPath', { interventionID: this.dataIdInFocus });
    },
    interventionInFocus() {
      return this.INTERVENTIONById({ id: this.dataIdInFocus });
    },
    interventionFormIsInvalid() {
      return !!this.name;
    },
    allDocumentsOfIntervention() {
      // const res = this.interventionInFocus.contents.filter((c) => c.type === 'MarkdownDocument') || [];
      // return res;
      return [];
    },
    allVideosOfIntervention() {
      // return this.interventionInFocus.contents.filter((c) => c.type === 'Video') || [];
      return [];
    },
    allImagesOfIntervention() {
      // return this.interventionInFocus.contents.filter((c) => c.type === 'Image') || [];
      return [];
    },
    edit() {
      return this.dataModalMode === modalModesDict.edit;
    },
    create() {
      return this.dataModalMode === modalModesDict.create;
    },
    read() {
      return this.dataModalMode === modalModesDict.read;
    },
    type() {
      return this.types[this.typeIndex];
    },
    assumedSrc() {
      if (this.imageFile && !this.read) return this.imageFile;
      return this.deriveImgPath;
    },
  },
  methods: {
    ...mapActions({
      saveInterventionHandler: `${vuexModulesDict.dataModal}/saveData`,
      deleteInterventionHandler: `${vuexModulesDict.dataModal}/deleteData`,
      abortReadInterventionHandler: `${vuexModulesDict.dataModal}/abortReadData`,
      abortNewInterventionHandler: `${vuexModulesDict.dataModal}/abortCreateData`,
      abortEditInterventionHandler: `${vuexModulesDict.dataModal}/abortEditData`,
      editInterventionHandler: `${vuexModulesDict.dataModal}/editData`,
      showToBeImplementedFeedback: `${vuexModulesDict.feedback}/showToBeImplementedFeedback`,
    }),
    ...mapMutations({
      setDraft: `${vuexModulesDict.dataModal}/setDraft`,
    }),
    deleteHandler() {
      if (this.read) return;
      this.deleteInterventionHandler({ dataType: dataTypesDict.intervention });
    },
    closeHandler() {
      if (this.read) this.abortReadInterventionHandler();
      else if (this.create) this.abortNewInterventionHandler({ dataType: dataTypesDict.intervention });
      else if (this.edit) {
        this.abortEditInterventionHandler({
          dataId: this.dataIdInFocus,
          dataType: dataTypesDict.intervention,
        });
      }
    },
    editHandler() {
      this.editInterventionHandler({
        dataId: this.dataIdInFocus,
        dataType: dataTypesDict.intervention,
      });
    },
    escHandler() {
      this.closeHandler();
    },
    async submitHandler() {
      const originalVersion = this.edit
        ? this.INTERVENTIONById({ id: this.dataIdInFocus })._version
        : null;
      this.setDraft(
        new Intervention({
          name: this.name,
          description: this.description,
          interventionType: this.type,
          tags: [],
          surveys: [], // TODO
          levels: [],
          contents: this.contents, // TODO
        }),
      );
      await this.$nextTick();
      this.saveInterventionHandler({ dataType: dataTypesDict.intervention, originalVersion });
    },
    selectImg() {
      const imgInput = this.$refs['img-upload'];
      imgInput.$el.click();
    },
    prefillComponentDataFromInterventionDraft() {
      this.name = mutableI18nString({ languageTexts: this.interventionDraft?.name.languageTexts });
      this.description = mutableI18nString({
        languageTexts: this.interventionDraft?.description.languageTexts,
      });
      // this.tagIds = this.interventionDraft?.tagIds ?? [];
      this.contents = this.interventionDraft?.contents ?? [];
    },
    nameUpdatedHandler(res) {
      this.name = res;
    },
    descriptionUpdatedHandler(res) {
      this.description = res;
    },
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
