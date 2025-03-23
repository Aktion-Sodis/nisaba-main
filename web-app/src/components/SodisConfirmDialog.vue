<template>
  <ConfirmDialog class="w-dialog-sm">
    <template #message="slotProps">
      <div class="flex items-center">
        <i
          :class="slotProps.message.icon"
          class="!text-4xl text-surface-700 mr-4"
        />
        <div class="text-oneliner-light" v-html="slotProps.message.message" />
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
</script>
