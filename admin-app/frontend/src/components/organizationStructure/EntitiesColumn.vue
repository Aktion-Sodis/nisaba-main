<template>
  <div
    class="d-flex flex-column px-2"
    style="height: calc(100% - 72px); overflow-y: scroll"
    v-if="entities.length > 0"
  >
    <Entity
      v-for="entity in entities"
      :key="entity.id"
      :id="entity.id"
      :parentEntityId="entity.parentEntityID"
      :levelId="levelId"
      :entityName="calculateUILocaleString({ languageTexts: entity.name.languageTexts })"
      :entityDescription="
        calculateUILocaleString({ languageTexts: entity.description.languageTexts })
      "
      :index="index"
    />
  </div>
  <div v-else class="d-flex flex-column mt-8 align-center" style="width: 100%">
    <p>
      {{ $t('organizationStructure.hasNoEntities', { parentName: nameOfParentEntity, levelName }) }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { vuexModulesDict } from '../../lib/constants';

import Entity from './Entity.vue';

export default {
  name: 'EntitiesColumn',
  components: { Entity },
  props: {
    levelId: {
      required: true,
    },
    levelName: {
      required: true,
    },
    parentLevelId: {
      required: true,
    },
    index: { type: Number, required: true },
  },
  computed: {
    ...mapGetters({
      allActiveEntitiesByLevelId: `${vuexModulesDict.entity}/allActiveEntitiesByLevelId`,
      calculateUILocaleString: 'calculateUILocaleString',
      chosenEntityByLevelId: `${vuexModulesDict.entity}/chosenEntityByLevelId`,
    }),
    entities() {
      return this.allActiveEntitiesByLevelId({ levelId: this.levelId });
    },
    nameOfParentEntity() {
      const chosenEntityIdFromUpperLevel = this.chosenEntityByLevelId({
        levelId: this.parentLevelId,
      });
      console.log('chosenEntityIdFromUpperLevel', chosenEntityIdFromUpperLevel);
      return this.calculateUILocaleString({
        languageTexts: chosenEntityIdFromUpperLevel.name.languageTexts,
      });
    },
  },
};
</script>

<style scoped></style>
