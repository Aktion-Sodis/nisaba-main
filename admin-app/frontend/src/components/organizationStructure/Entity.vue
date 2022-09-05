<template>
  <v-hover v-slot="{ hover }">
    <div
      class="entity-sheet lighten-4 rounded-lg pl-4 pb-1"
      style="margin-bottom: 1px; margin-top: 1px; height: auto"
      :class="[
        hover && !isChosen ? 'lighten-2' : '',
        getLoading ? 'nonClickable' : '',
        isChosen ? 'blue' : 'grey',
      ]"
      elevation="4"
      @click="clickHandler"
    >
      <v-skeleton-loader
        v-if="getLoading"
        class="entitiy-skeleton"
        type="list-item-two-line"
      ></v-skeleton-loader>
      <div :title="entityName" v-else>
        <div style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap" class="mx-4">
          <v-slide-x-transition>
            <v-btn
              class="mx-2"
              plain
              fab
              x-small
              v-if="isChosen && hover"
              style="position: absolute; left: -8px; top: -4px"
            >
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
          </v-slide-x-transition>
          <span style="user-select: none">
            {{ entityName }}
          </span>
          <span v-if="hasDescendants({ id })" style="position: absolute; right: 0">
            <v-icon> mdi-chevron-right </v-icon>
          </span>
        </div>
      </div>
    </div>
  </v-hover>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { vuexModulesDict } from '../../lib/constants';

export default {
  name: 'Entity',
  props: {
    id: {
      required: true,
    },
    levelId: {
      required: true,
    },
    parentEntityId: {
      required: true,
    },
    entityName: { type: String, required: true },
    entityDescription: { type: String, required: true },
    index: { type: Number, required: true },
  },
  computed: {
    ...mapGetters({
      entityHasParent: `${vuexModulesDict.entity}/hasParentByUpperEntityId`,
      hasDescendants: `${vuexModulesDict.entity}/hasDescendantsById`,
      getLoading: `${vuexModulesDict.level}/getLoading`,
      isEntityChosen: `${vuexModulesDict.entity}/isEntityChosen`,
    }),
    isChosen: function () {
      return this.isEntityChosen({ entityId: this.id });
    },
  },
  methods: {
    ...mapActions({
      readData: `${vuexModulesDict.dataModal}/readData`,
      addChosenEntityId: `${vuexModulesDict.entity}/addChosenEntityId`,
    }),
    ...mapMutations({
      removeChosenEntityId: `${vuexModulesDict.entity}/removeChosenEntityId`,
    }),
    clickHandler() {
      this.isChosen
        ? this.readData({ dataId: this.id, dataType: 'ENTITY' })
        : this.addChosenEntityId({ entityId: this.id, levelId: this.levelId });
    },
  },
};
</script>

<style scoped>
.nonClickable {
  pointer-events: none;
}

.entity-sheet {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative !important;
}
</style>
