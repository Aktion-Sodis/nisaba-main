<template>
  <div class="d-flex flex-column px-2" v-if="entities.length > 0">
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
    <AddEntityButton class="mt-4" :levelId="levelId" />
  </div>
  <div v-else class="d-flex flex-column mt-8 align-center" style="width: 100%">
    <p>{{ $t('organizationStructure.hasNoEntities') }}</p>
    <AddEntityButton class="mt-4" :levelId="levelId" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { vuexModulesDict } from '../../lib/constants';

import AddEntityButton from './AddEntityButton.vue';
import Entity from './Entity.vue';

export default {
  name: 'EntitiesColumn',
  components: { AddEntityButton, Entity },
  props: {
    levelId: {
      required: true,
    },
    index: { type: Number, required: true },
  },
  computed: {
    ...mapGetters({
      allActiveEntitiesByLevelId: `${vuexModulesDict.entity}/allActiveEntitiesByLevelId`,
      calculateUILocaleString: 'calculateUILocaleString',
    }),
    entities() {
      return this.allActiveEntitiesByLevelId({ levelId: this.levelId });
    },
  },
};
</script>

<style scoped></style>
