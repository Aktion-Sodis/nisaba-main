<template>
  <div class="flex items-center gap-2">
    <div v-if="isLoading" class="flex items-center gap-2">
      <i class="pi pi-spin pi-spinner text-sm"></i>
      <span class="text-sm text-surface-500">Loading...</span>
    </div>
    <div v-else-if="error" class="text-sm text-red-500">
      {{ error }}
    </div>
    <div v-else-if="imageUrl" class="flex items-center gap-2">
      <img
        :src="imageUrl"
        :alt="$t('analytics_aggregated.image_responses.image_alt')"
        class="w-16 h-16 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
        @click="handleClick"
      />
      <Button
        :label="$t('analytics_aggregated.image_responses.view_full')"
        icon="pi pi-external-link"
        size="small"
        text
        @click="handleClick"
      />
    </div>
    <span v-else class="text-sm text-surface-500">
      {{ $t('analytics_aggregated.image_responses.not_available') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { getUrl } from '@aws-amplify/storage';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  filePath: string;
}>();

const emit = defineEmits<{
  click: [imageUrl: string];
}>();

const imageUrl = ref<string | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const loadImageUrl = async (filePath: string) => {
  try {
    isLoading.value = true;
    error.value = null;
    const url = await getUrl({ path: filePath });
    imageUrl.value = url.url.toString();
  } catch (err) {
    error.value = t('analytics_aggregated.image_responses.load_error');
    console.error('Error loading image:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleClick = () => {
  if (imageUrl.value) {
    emit('click', imageUrl.value);
  }
};

onMounted(() => {
  loadImageUrl(props.filePath);
});
</script>
