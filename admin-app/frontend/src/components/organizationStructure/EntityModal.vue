<template>
  <v-dialog v-model="isEntityModalDisplayed" max-width="800px" persistent @keydown.esc="escHandler">
    <v-card class="px-0 pt-0 px-md-4 pt-md-4">
      <v-form lazy-validation>
        <v-card-title>
          <h2 v-if="edit && entityInFocus">
            {{ $t('organizationStructure.entityModal.modalTitle.edit') }}
            <i>
              {{ calculateUILocaleString({ languageTexts: entityInFocus.name.languageTexts }) }}
            </i>
          </h2>
          <h2 v-else-if="create">
            {{ $t('organizationStructure.entityModal.modalTitle.create') }}
          </h2>
          <h2 v-else-if="read">
            {{ $t('organizationStructure.entityModal.modalTitle.read') }}
          </h2>
        </v-card-title>
        <v-card-subtitle v-if="edit">
          {{ $t('organizationStructure.entityModal.modalDescription.edit') }}
        </v-card-subtitle>
        <v-card-subtitle v-else-if="create">
          {{ $t('organizationStructure.entityModal.modalDescription.create') }}
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" class="pb-0 px-0 mb-3 px-sm-3">
                <h2 v-if="read && entityInFocus">
                  {{ calculateUILocaleString({ languageTexts: entityInFocus.name.languageTexts }) }}
                </h2>

                <LocaleTextBox
                  v-else
                  labelPrefixI18nSelector="organizationStructure.entityModal.name"
                  :initVal="name"
                  @res="nameUpdatedHandler"
                >
                  <template v-slot:text-input="slotProps">
                    <v-text-field
                      :counter="name.length > entityDescriptionMaxChar - 20"
                      autofocus
                      required
                      outlined
                      dense
                      :label="slotProps.label"
                      v-model="slotProps.model"
                      @input="slotProps.inputHandler"
                    ></v-text-field>
                  </template>
                </LocaleTextBox>

                <div
                  v-if="read && entityInFocus"
                  class="d-flex flex-column justify-center"
                  style="min-height: 10rem"
                >
                  <h3>
                    {{
                      calculateUILocaleString({
                        languageTexts: entityInFocus.description.languageTexts,
                      })
                    }}
                  </h3>
                </div>
                <LocaleTextBox
                  v-else
                  labelPrefixI18nSelector="organizationStructure.entityModal.description"
                  :initVal="description"
                  @res="descriptionUpdatedHandler"
                >
                  <template v-slot:text-input="slotProps">
                    <v-textarea
                      :label="slotProps.label"
                      v-model="slotProps.model"
                      @input="slotProps.inputHandler"
                      required
                      outlined
                      dense
                    ></v-textarea>
                  </template>
                </LocaleTextBox>
                <div v-if="read && entityInFocus" style="min-height: 5rem">
                  <h3 v-if="entityInFocus.parentEntityID">
                    {{ $t('organizationStructure.entityModal.upperEntity') }}:

                    {{
                      calculateUILocaleString({
                        languageTexts: ENTITYById({ id: entityInFocus.parentEntityID }).name
                          .languageTexts,
                      })
                    }}
                  </h3>
                </div>
                <v-select
                  v-else-if="allEntitiesOfUpperLevel.length > 0"
                  v-model="parentEntityID"
                  :items="allEntitiesOfUpperLevel"
                  item-value="id"
                  :label="$t('organizationStructure.entityModal.upperEntityLabel')"
                  dense
                  outlined
                  persistent-hint
                >
                  <template v-slot:item="data">
                    {{
                      calculateUILocaleString({
                        languageTexts: data.item.name.languageTexts,
                      })
                    }}
                  </template>
                  <template v-slot:selection="data">
                    {{
                      calculateUILocaleString({
                        languageTexts: data.item.name.languageTexts,
                      })
                    }}
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" class="pt-0 px-0 px-sm-3">
                <ImgFromS3 v-if="read" :assumedSrc="deriveImgPath" dataType="entity">
                  <template v-slot:v-img="slotProps">
                    <v-img max-height="200px" :src="slotProps.src"> </v-img>
                  </template>
                </ImgFromS3>
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
            {{ read ? $t('general.close') : $t('general.cancel') }}
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
            :disabled="isFormInvalid"
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
import { Entity } from '../../models';
import { emptyMutableI18nString, mutableI18nString } from '../../lib/classes';
import ImgFromS3 from '../commons/ImgFromS3.vue';

const entityDescriptionMaxChar = Math.max(
  parseInt(process.env.VUE_APP_ENTITY_DESCRIPTION_MAX_CHAR, 10),
  0,
);

export default {
  name: 'EntityModal',
  components: {
    LocaleTextBox,
    ImgFromS3,
  },
  data() {
    return {
      entityDescriptionMaxChar,
      rules: {
        maxChar: (value) => value.length <= entityDescriptionMaxChar || this.maxCharExceededi18n,
      },
      name: emptyMutableI18nString(),
      description: emptyMutableI18nString(),
      parentEntityID: null,
    };
  },
  watch: { entityDraft: 'prefillComponentDataFromEntityDraft' },
  mounted() {
    this.prefillComponentDataFromEntityDraft();
  },
  computed: {
    ...mapGetters({
      upperLevelById: `${vuexModulesDict.level}/upperLevelById`,
      LEVELById: `${vuexModulesDict.level}/LEVELById`,

      dataType: `${vuexModulesDict.dataModal}/getDataType`,
      modalMode: `${vuexModulesDict.dataModal}/getMode`,
      isModalDisplayed: `${vuexModulesDict.dataModal}/getIsDisplayed`,
      dataIdInFocus: `${vuexModulesDict.dataModal}/getDataIdInFocus`,
      entityDraft: `${vuexModulesDict.dataModal}/getDataDraft`,

      hasDescendants: `${vuexModulesDict.entity}/hasDescendantsById`,
      ENTITYById: `${vuexModulesDict.entity}/ENTITYById`,
      allEntitiesOfLevel: `${vuexModulesDict.entity}/allEntitiesByLevelId`,

      getCreatingEntityInLevelId: 'getCreatingEntityInLevelId',
      calculateUILocaleString: 'calculateUILocaleString',
      deriveFilePath: 'callDeriveFilePathWithOrganizationId',
    }),
    entityInFocus() {
      return this.dataIdInFocus ? this.ENTITYById({ id: this.dataIdInFocus }) : null;
    },
    isEntityModalDisplayed() {
      return this.isModalDisplayed && this.dataType === dataTypesDict.entity;
    },
    allEntitiesOfUpperLevel() {
      let id;
      if (this.create) {
        id = this.getCreatingEntityInLevelId;
      } else if (this.read) {
        id = this.entityInFocus?.entityLevelId;
      } else {
        id = this.entityDraft?.entityLevelId;
      }
      const currentLevel = this.LEVELById({
        id,
      });
      if (!currentLevel) return [];
      return this.allEntitiesOfLevel({ entityLevelId: currentLevel.parentLevelID });
    },
    edit() {
      return this.modalMode === modalModesDict.edit;
    },
    create() {
      return this.modalMode === modalModesDict.create;
    },
    read() {
      return this.modalMode === modalModesDict.read;
    },
    maxCharExceededi18n() {
      return this.$t('general.form.maxCharExceeded', {
        maxChar: entityDescriptionMaxChar,
      });
    },
    isFormInvalid() {
      return !this.name;
    },
    areThereChanges() {
      return (
        this.name !== this.entityDraft.name.en
        || this.description !== this.entityDraft.description
        || this.parentEntityID !== this.entityDraft.parentEntityID
      );
    },
    deriveImgPath() {
      return this.deriveFilePath('entityPicPath', { entityID: this.dataIdInFocus });
    },
  },
  methods: {
    ...mapActions({
      saveData: `${vuexModulesDict.dataModal}/saveData`,
      deleteData: `${vuexModulesDict.dataModal}/deleteData`,
      abortReadData: `${vuexModulesDict.dataModal}/abortReadData`,
      abortCreateData: `${vuexModulesDict.dataModal}/abortCreateData`,
      abortEditData: `${vuexModulesDict.dataModal}/abortEditData`,
      editData: `${vuexModulesDict.dataModal}/editData`,

      showFeedbackForDuration: `${vuexModulesDict.feedback}/showFeedbackForDuration`,
    }),
    ...mapMutations({
      setDraft: `${vuexModulesDict.dataModal}/setDraft`,
    }),
    escHandler() {
      this.closeHandler();
    },
    deleteHandler() {
      if (this.read) return;
      if (this.hasDescendants({ id: this.dataIdInFocus })) {
        this.showFeedbackForDuration({
          type: 'warning',
          text: 'Cannot delete an entity with descendants.',
        });
        return;
      }
      this.deleteData({ dataType: dataTypesDict.entity });
    },
    closeHandler() {
      if (this.read) this.abortReadData();
      else if (this.create) this.abortCreateData({ dataType: dataTypesDict.entity });
      else if (this.edit) this.abortEditData({ dataId: this.dataIdInFocus, dataType: dataTypesDict.entity });
    },
    editHandler() {
      this.editData({ dataId: this.dataIdInFocus, dataType: dataTypesDict.entity });
    },
    async submitHandler() {
      if (this.allEntitiesOfUpperLevel.length > 0 && this.parentEntityID === null) return;
      this.setDraft(
        new Entity({
          name: this.name,
          description: this.description,
          entityLevelId: this.edit
            ? this.entityInFocus.entityLevelId
            : this.getCreatingEntityInLevelId,
          parentEntityID: this.parentEntityID ?? null,
          appliedInterventions: [], //
          customData: [], // TODO
        }),
      );
      await this.$nextTick();
      const originalVersion = this.entityInFocus != null ? this.entityInFocus._version : 0;
      this.saveData({
        dataType: dataTypesDict.entity,
        originalVersion,
      });
    },
    prefillComponentDataFromEntityDraft() {
      this.name = mutableI18nString({ languageTexts: this.entityDraft?.name.languageTexts });
      this.description = mutableI18nString({
        languageTexts: this.entityDraft?.description.languageTexts,
      });
      this.parentEntityID = this.entityDraft?.parentEntityID ?? null;
      this.contents = this.entityDraft?.contents ?? [];
    },
    descriptionUpdatedHandler(res) {
      this.description = res;
    },
    nameUpdatedHandler(res) {
      this.name = res;
    },
  },
};
</script>
