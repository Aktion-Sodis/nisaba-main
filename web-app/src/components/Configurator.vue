<template>
  <hr class="my-4 border-t-2 border-surface-300 dark:border-surface-700" />
  <div class="pt-0 pt-sm-3">
    <div class="mt-2 flex flex-col">

      <div class="mt-4 flex justify-between items-center flex-wrap gap-4">
        <label for="language-selector" class="mb-2 break-words">
          {{ $t('form.label.select_language') }}
        </label>
        <language-selector id="language-selector" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSelector from '@/components/elements/LanguageSelector.vue';
</script>
