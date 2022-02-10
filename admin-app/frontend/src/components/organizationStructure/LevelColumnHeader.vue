<template>
  <div style="width: 100%" class="d-flex flex-column align-center">
    <v-btn plain rounded class="text-none black--text" @click="clickOnLevelHandler">
      <span class="text-h5">
        {{ name }}
      </span>
    </v-btn>
    <div style="width: 100%">
      <div
        class="d-flex justify-space-around"
        style="width: 100%"
        v-if="allowedInterventions.length > 0"
      >
        <v-tooltip top v-for="interventionId in allowedInterventions" :key="interventionId">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar v-bind="attrs" v-on="on">
              <v-icon> mdi-hammer-wrench </v-icon>
            </v-avatar>
          </template>
          <span>{{ interventionById({ interventionId }).name }}</span>
        </v-tooltip>
      </div>
      <div v-else style="height: 48px; overflow: hidden">
        <p class="caption">
          {{ $t('organizationStructure.hasNoInterventions') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { validate as uuidValidate } from 'uuid';
import { mapGetters } from 'vuex';

export default {
  name: 'LevelColumnHeader',
  props: {
    allowedInterventions: {
      type: Array,
      required: true,
      validator: (i) => i.every((e) => uuidValidate(e)),
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      interventionById: 'interventionsData/interventionById',
    }),
  },
  methods: {
    clickOnLevelHandler() {},
  },
};
</script>
