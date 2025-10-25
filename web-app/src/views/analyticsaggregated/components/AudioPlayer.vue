<template>
  <div class="flex items-center gap-2">
    <div v-if="isLoading" class="flex items-center gap-2">
      <i class="pi pi-spin pi-spinner text-sm"></i>
      <span class="text-sm text-surface-500">Loading...</span>
    </div>
    <div v-else-if="error" class="text-sm text-red-500">
      {{ error }}
    </div>
    <audio
      v-else-if="audioUrl"
      :src="audioUrl"
      controls
      preload="none"
      class="max-w-xs"
    >
      {{ $t('analytics_aggregated.audio_responses.browser_not_supported') }}
    </audio>
    <span v-else class="text-sm text-surface-500">
      {{ $t('analytics_aggregated.audio_responses.not_available') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { getUrl } from '@aws-amplify/storage';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  filePath: string;
}>();

const audioUrl = ref<string | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const loadAudioUrl = async (filePath: string) => {
  try {
    isLoading.value = true;
    error.value = null;
    const url = await getUrl({ path: filePath });
    audioUrl.value = url.url.toString();
  } catch (err) {
    error.value = t('analytics_aggregated.audio_responses.load_error');
    console.error('Error loading audio:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const props = defineProps<{ filePath: string }>();
  loadAudioUrl(props.filePath);
});
</script>
