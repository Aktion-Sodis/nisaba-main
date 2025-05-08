<template>
  <Card>
    <template #content>
      <div class="flex w-full justify-end">
        <Button
          label="Add Question"
          icon="pi pi-plus"
          @click="surveyDetailStore.addEmptyQuestion"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useSurveyDetailStore } from '@/views/surveydetail/surveyDetailStore';

const surveyDetailStore = useSurveyDetailStore();
</script>
