<template>
  <div class="relative w-full">
    <Skeleton v-if="!initialLoaded" class="w-full h-48 rounded-lg" />
    <FileUpload
      v-else-if="editable"
      mode="advanced"
      :auto="true"
      :multiple="false"
      :custom-upload="true"
      accept="image/jpeg,image/png"
      :max-file-size="100000000"
      class="w-full"
      @select="handleFileSelect"
    >
      <template #header="{ chooseCallback }">
        <div class="flex justify-end gap-2 w-full -mb-4">
          <Button
            :label="
              imageExists
                ? t('utils.actions.image_replace')
                : t('utils.actions.image_choose')
            "
            icon="pi pi-pencil"
            @click="chooseCallback"
          />
          <Button
            v-if="imageExists"
            icon="pi pi-trash"
            severity="danger"
            @click="handleRemove"
          />
        </div>
      </template>
      <template v-if="!imageExists" #empty>
        <div
          class="flex items-center justify-center flex-col h-48 border border-surface-300 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-600 focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md transition-colors duration-200"
        >
          <i class="pi pi-cloud-upload text-4xl text-gray-400 mb-2"></i>
          <span class="text-gray-500">
            {{ t('utils.actions.image_placeholder') }}
          </span>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div v-if="uploadProgress !== null" class="w-full">
            <ProgressBar :value="uploadProgress" show-value />
          </div>
          <Message
            v-if="errorMessage"
            severity="error"
            :closable="true"
            @close="errorMessage = null"
          >
            {{ errorMessage }}
          </Message>
          <div v-if="imageUrl && imageExists" class="relative">
            <div
              class="border border-surface-300 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-600 focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md transition-colors duration-200"
            >
              <img
                :key="refreshKey"
                :src="imageUrl"
                class="w-full h-48 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </template>
    </FileUpload>
    <div v-else>
      <div v-if="imageUrl && imageExists" class="relative">
        <img
          :key="refreshKey"
          :src="imageUrl"
          class="w-full h-48 object-contain rounded-lg"
        />
      </div>
      <div
        v-else
        class="border border-surface-300 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-600 focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md p-4 flex items-center justify-center h-48 transition-colors duration-200"
      >
        <div class="flex flex-col items-center">
          <i class="pi pi-image text-4xl text-gray-400 mb-2"></i>
          <span class="text-gray-500">No image available</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUrl, uploadData, remove, list } from '@aws-amplify/storage';
import type { TransferProgressEvent } from '@aws-amplify/storage';
import FileUpload from 'primevue/fileupload';
import { useConfirm } from 'primevue/useconfirm';
import { computed, ref, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps<{
  path: string;
  editable?: boolean;
}>();

const imageUrl = ref<string | null>(null);
const confirm = useConfirm();
const uploadProgress = ref<number | null>(null);
const refreshKey = ref<number>(0);
const imageExists = computed(() => !!imageUrl.value);
const initialLoaded = ref(false);
const errorMessage = ref<string | null>(null);

const loadImage = async () => {
  if (!props.path) {
    imageUrl.value = null;
    return;
  }

  try {
    const url = await getUrl({ path: props.path });
    imageUrl.value = url.url.toString();

    // Verify actual existence
    const result = await list({ path: props.path });
    if (result.items.length === 0) {
      imageUrl.value = null;
    }
  } catch (error) {
    console.error('Error loading image:', error);
    imageUrl.value = null;
  } finally {
    if (!initialLoaded.value) {
      initialLoaded.value = true;
    }
  }
};

const compressImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    if (file.size <= 2000000 && file.type === 'image/png') {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        const maxDimension = 1500; // Maximum dimension to prevent too large canvas

        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Get image data and reduce color depth
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Convert to 6-bit color depth (64 colors per channel)
        for (let i = 0; i < data.length; i += 4) {
          // RGB channels
          for (let j = 0; j < 3; j++) {
            // Convert to 6-bit (0-63) and back to 8-bit (0-255)
            data[i + j] = Math.round(data[i + j] / 4) * 4;
          }
          // Alpha channel (keep at 8-bit for better transparency)
        }

        // Put the modified image data back
        ctx.putImageData(imageData, 0, 0);

        // Convert to PNG blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }
          resolve(blob);
        }, 'image/png');
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

const handleFileSelect = async (event: any) => {
  const file = event.files[0];
  if (!file) return;

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    errorMessage.value =
      'Invalid file type. Please upload a JPEG or PNG image.';
    return;
  }

  try {
    errorMessage.value = null;
    uploadProgress.value = 10;
    const compressedBlob = await compressImage(file);
    uploadProgress.value = 30;

    // Create and set local URL immediately
    imageUrl.value = URL.createObjectURL(compressedBlob);

    await uploadData({
      path: props.path,
      data: compressedBlob,
      options: {
        contentType: 'image/png',
        onProgress: (event: TransferProgressEvent) => {
          if (event.transferredBytes && event.totalBytes) {
            uploadProgress.value =
              30 +
              Number(
                ((event.transferredBytes / event.totalBytes) * 70).toFixed(0)
              ) *
                70;
          }
        },
      },
    });

    refreshKey.value++;
  } catch (error) {
    console.error('Upload failed:', error);
    errorMessage.value =
      error instanceof Error ? error.message : 'Failed to upload image';
    if (imageUrl.value?.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl.value);
    }
    imageUrl.value = null;
  } finally {
    uploadProgress.value = null;
  }
};

const handleRemove = () => {
  confirm.require({
    message: 'Are you sure you want to remove this image?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: t('utils.actions.cancel_delete'),
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: t('utils.actions.confirm_delete'),
      icon: 'pi pi-trash',
      severity: 'danger',
    },
    accept: async () => {
      try {
        errorMessage.value = null;
        await remove({ path: props.path });
        uploadProgress.value = null;
        // Set URL to null directly after successful removal
        imageUrl.value = null;
        refreshKey.value++;
      } catch (error) {
        console.error('Removal failed:', error);
        errorMessage.value =
          error instanceof Error ? error.message : 'Failed to remove image';
      }
    },
  });
};

watch(
  () => props.path,
  async () => {
    await loadImage();
    refreshKey.value++;
  },
  { immediate: true }
);

// Clean up URL when component is unmounted
onUnmounted(() => {
  if (imageUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl.value);
  }
});
</script>
