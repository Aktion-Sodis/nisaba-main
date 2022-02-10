<template>
  <v-dialog
    v-model="isInterventionModalDisplayed"
    max-width="1200px"
    persistent
    @keydown.esc="escHandler"
  >
    <v-card class="px-4 pt-4">
      <v-form lazy-validation>
        <v-card-title>
          <h2 v-if="edit">
            {{ $t('interventions.interventionModal.modalTitle.edit') }}
            <i>{{ interventionInFocus.name }}</i>
          </h2>
          <h2 v-else-if="create">
            {{ $t('interventions.interventionModal.modalTitle.create') }}
          </h2>
          <h2 v-else>
            {{ $t('interventions.interventionModal.modalTitle.read') }}
          </h2>
        </v-card-title>
        <v-card-subtitle v-if="edit">
          {{ $t('interventions.interventionModal.modalDescription.edit') }}
        </v-card-subtitle>
        <v-card-subtitle v-else-if="create">
          {{ $t('interventions.interventionModal.modalDescription.create') }}
        </v-card-subtitle>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <h2 v-if="read && interventionInFocus">
                  {{ interventionInFocus.name }}
                </h2>
                <v-text-field
                  v-else
                  v-model="name"
                  :label="$t('interventions.interventionModal.name')"
                  required
                  outlined
                  dense
                ></v-text-field>

                <h3 v-if="read && interventionInFocus" class="py-12">
                  {{ interventionInFocus.description }}
                </h3>
                <v-textarea
                  v-else
                  v-model="description"
                  :counter="description.length > interventionDescriptionMaxChar - 20"
                  :rules="[rules.maxChar]"
                  :label="$t('interventions.interventionModal.description')"
                  required
                  outlined
                  dense
                ></v-textarea>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" max-height="200px">
                  <v-btn v-if="!read" fab class="iv-edit-icon" color="primary" @click="selectImg">
                    <v-icon color="darken-2"> mdi-pencil-outline </v-icon>
                  </v-btn>
                  <input
                    v-if="!read"
                    type="file"
                    accept="image/png, image/jpeg"
                    ref="img-upload"
                    style="display: none"
                  />
                </v-img>
              </v-col>
              <v-col cols="12" md="6">
                <div v-if="read && interventionInFocus">
                  <v-card-title>
                    {{ $t('baseData.tags') }}
                  </v-card-title>
                  <v-chip v-for="tagId in interventionInFocus.tagIds" :key="tagId">
                    {{ tagById({ tagId }).name }}
                  </v-chip>
                </div>
                <v-select
                  v-else
                  v-model="tagIds"
                  :items="allInterventionTags"
                  item-value="tagId"
                  item-text="name"
                  deletable-chips
                  chips
                  dense
                  :label="$t('baseData.tags')"
                  multiple
                  outlined
                ></v-select>

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
                <p v-else-if="read">{{ $t('interventions.interventionModal.noDocuments') }}</p>

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
                <p v-else-if="read">{{ $t('interventions.interventionModal.noImages') }}</p>

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
                <p v-else-if="read">{{ $t('interventions.interventionModal.noVideos') }}</p>

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
                  {{ $t('interventions.interventionModal.noSurveys') }}
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
          <v-btn x-large v-if="read" color="primary" text @click="editHandler"> Edit </v-btn>
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
import { modalModesDict } from '../../store/constants';

const interventionDescriptionMaxChar = Math.max(
  parseInt(process.env.VUE_APP_INTERVENTION_DESCRIPTION_MAX_CHAR, 10),
  0,
);

export default {
  name: 'InterventionModal',
  data() {
    return {
      interventionDescriptionMaxChar,
      rules: {
        maxChar: (value) => value.length <= interventionDescriptionMaxChar || this.maxCharExceededi18n,
      },
      interventionId: null,
      name: '',
      description: '',
      tagIds: [],
      contents: [],
    };
  },
  watch: { interventionDraft: 'prefillComponentDataFromInterventionDraft' },
  mounted() {
    this.prefillComponentDataFromInterventionDraft();
  },
  computed: {
    ...mapGetters({
      interventionModalMode: 'interventionsUI/getInterventionModalMode',
      isInterventionModalDisplayed: 'interventionsUI/getIsInterventionModalDisplayed',
      interventionIdInFocus: 'interventionsUI/getInterventionIdInFocus',
      interventionDraft: 'interventionsUI/getInterventionDraft',
      interventionInFocus: 'interventionsUI/interventionInFocus',

      allInterventionTags: 'interventionsData/getInterventionTags',
      tagById: 'interventionsData/interventionTagById',
      interventionContentTagById: 'interventionsData/interventionContentTagById',
    }),
    maxCharExceededi18n() {
      return this.$t('general.form.maxCharExceeded', {
        maxChar: interventionDescriptionMaxChar,
      });
    },
    interventionFormIsInvalid() {
      return !!this.name;
    },
    allDocumentsOfIntervention() {
      const res = this.interventionInFocus.contents.filter((c) => c.type === 'MarkdownDocument') || [];
      return res;
    },
    allVideosOfIntervention() {
      return this.interventionInFocus.contents.filter((c) => c.type === 'Video') || [];
    },
    allImagesOfIntervention() {
      return this.interventionInFocus.contents.filter((c) => c.type === 'Image') || [];
    },
    edit() {
      return this.interventionModalMode === modalModesDict.edit;
    },
    create() {
      return this.interventionModalMode === modalModesDict.create;
    },
    read() {
      return this.interventionModalMode === modalModesDict.read;
    },
  },
  methods: {
    ...mapActions({
      saveInterventionHandler: 'interventionsUI/saveInterventionHandler',
      deleteInterventionHandler: 'interventionsUI/deleteInterventionHandler',
      abortReadInterventionHandler: 'interventionsUI/abortReadInterventionHandler',
      abortNewInterventionHandler: 'interventionsUI/abortNewInterventionHandler',
      abortEditInterventionHandler: 'interventionsUI/abortEditInterventionHandler',
      editInterventionHandler: 'interventionsUI/editInterventionHandler',
      showToBeImplementedFeedback: 'feedbackModule/showToBeImplementedFeedback',
    }),
    ...mapMutations({
      setInterventionDraft: 'interventionsUI/setInterventionDraft',
    }),
    deleteHandler() {
      if (this.read) return;
      this.deleteInterventionHandler();
    },
    closeHandler() {
      if (this.read) this.abortReadInterventionHandler();
      else if (this.create) this.abortNewInterventionHandler();
      else if (this.edit) this.abortEditInterventionHandler();
    },
    editHandler() {
      this.editInterventionHandler({ interventionId: this.interventionIdInFocus });
    },
    escHandler() {
      this.closeInterventionModal();
    },
    async submitHandler() {
      this.setInterventionDraft({
        interventionId: this.interventionIdInFocus,
        name: this.name,
        description: this.description,
        tagIds: this.tagIds,
        contents: this.contents,
      });
      await this.$nextTick();
      this.saveInterventionHandler();
    },
    selectImg() {
      this.showToBeImplementedFeedback();
      const imgInput = this.$refs['img-upload'];
      imgInput.click();
      console.log('TODO: do something with', imgInput);
    },
    prefillComponentDataFromInterventionDraft() {
      this.name = this.interventionDraft?.name ?? '';
      this.description = this.interventionDraft?.description ?? '';
      this.tagIds = this.interventionDraft?.tagIds ?? [];
      this.contents = this.interventionDraft?.contents ?? [];
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
