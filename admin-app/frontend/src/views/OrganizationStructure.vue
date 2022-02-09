<template>
  <div style="overflow-x: scroll; width: 100%">
    <h1 class="ml-8">{{ $t('organizationStructure.title') }}</h1>
    <div class="my-8 d-flex">
      <div
        v-for="(level, index) in levels"
        :key="level.levelId"
        class="column-wrapper d-flex flex-column px-16"
        :class="level.upperLevelId === null || 'dotted-left-border'"
      >
        <v-btn
          plain
          rounded
          class="text-none black--text"
          @click="callVuexActionThenFillEntityModalForm(level)"
        >
          <span class="text-h5">
            {{ level.name }}
          </span>
          <v-icon dense class="edit-level-icon"> mdi-pencil-outline </v-icon>
        </v-btn>
        <div style="width: 100%">
          <div
            class="d-flex justify-space-around"
            style="width: 100%"
            v-if="level.allowedInterventions.length > 0"
          >
            <v-tooltip
              top
              v-for="interventionId in level.allowedInterventions"
              :key="interventionId"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-avatar v-bind="attrs" v-on="on">
                  <v-icon> mdi-hammer-wrench </v-icon>
                </v-avatar>
              </template>
              <span>{{ interventionById(interventionId).name }}</span>
            </v-tooltip>
          </div>
          <div v-else style="height: 48px; overflow: hidden">
            <p class="caption">
              {{ $t('organizationStructure.hasNoInterventions') }}
            </p>
          </div>
        </div>
        <EntitiesColumn :levelId="level.levelId" :index="index" />
      </div>
      <div class="column-wrapper dotted-left-border d-flex align-center justify-center">
        <LevelModal v-if="showLevelModal" />
        <EntityModal v-if="showEntityModal" />
        <v-btn rounded x-large color="primary" @click="clickOnAddNewLevel">
          <v-icon class="mr-2"> mdi-plus </v-icon>
          {{ $t('organizationStructure.addNewLevel') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import LevelModal from '../components/organizationStructure/LevelModal.vue';
import EntityModal from '../components/organizationStructure/EntityModal.vue';
import EntitiesColumn from '../components/organizationStructure/EntitiesColumn.vue';

export default {
  name: 'OrganizationStructure',
  components: { LevelModal, EntityModal, EntitiesColumn },
  data() {
    return {
      showLevelModal: false,
      showEntityModal: false,
    };
  },
  computed: {
    ...mapGetters({
      levels: 'entities/sortedLevels',
      interventionById: 'iv/interventionById',
      levelModalIsDisplayed: 'os/getLevelModalIsDisplayed',
      entityModalIsDisplayed: 'os/getEntityModalIsDisplayed',
    }),
  },
  watch: {
    levelModalIsDisplayed: 'destroyLevelModalAfterDelay',
    entityModalIsDisplayed: 'destroyEntityModalAfterDelay',
  },
  methods: {
    ...mapActions({
      clickOnEntity: 'entities/clickOnEntity',
      clickOnAddNewLevel: 'os/clickOnAddNewLevel',
      clickOnEditLevel: 'os/clickOnEditLevel',
    }),
    async destroyLevelModalAfterDelay(newValue) {
      // If closed, wait for 500, if still closed, destroy component instance
      if (newValue) {
        this.showLevelModal = true;
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!this.levelModalIsDisplayed) this.showLevelModal = false;
    },
    async destroyEntityModalAfterDelay(newValue) {
      // If closed, wait for 500, if still closed, destroy component instance
      if (newValue) {
        this.showEntityModal = true;
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!this.levelModalIsDisplayed) this.showLevelModal = false;
    },

    callVuexActionThenFillEntityModalForm(level) {
      this.clickOnEditLevel(level.levelId);

      /* TODO: This is bad, bad practice. */
      const levelModal = this.$children.find((c) => c.$options.name === 'LevelModal');
      levelModal.levelName = level.name || '';
      levelModal.levelDescription = level.description || '';
      levelModal.levelAllowedInterventions = level.allowedInterventions || [];
      levelModal.levelIsSubordinateTo = level.upperLevelId || null;
    },
  },
};
</script>

<style scoped>
.column-wrapper {
  min-width: 24rem;
}

.dotted-left-border {
  border-left: 4px rgb(0, 0, 0, 0.2) dotted;
}

.edit-level-icon {
  transform: translate(4px, -8px);
}
</style>
