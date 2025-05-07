<template>
  <div class="relative w-full">
    <FileUpload
      v-if="editable"
      mode="advanced"
      :auto="true"
      :custom-upload="true"
      accept="image/jpeg,image/png"
      :multiple="false"
      :max-file-size="2000000"
      class="w-full"
      @select="handleFileSelect"
    >
      <template #empty>
        <div
          class="flex items-center justify-center flex-col h-48 border border-surface-300 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-600 focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md transition-colors duration-200"
        >
          <i class="pi pi-cloud-upload text-4xl text-gray-400 mb-2"></i>
          <span class="text-gray-500">Drag and drop files here to upload</span>
        </div>
      </template>
      <template #content="{ files }">
        <div v-if="imageUrl && imageExists" class="relative group">
          <img :src="imageUrl" class="w-full h-48 object-cover rounded-lg" />
        </div>
      </template>
    </FileUpload>
    <div v-else>
      <div v-if="imageUrl && imageExists" class="relative">
        <img :src="imageUrl" class="w-full h-48 object-cover rounded-lg" />
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
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import { useConfirm } from 'primevue/useconfirm';
import { ref, watch } from 'vue';

const props = defineProps<{
  path: string;
  editable?: boolean;
}>();

const imageUrl = ref<string | null>(null);
const imageExists = ref<boolean>(false);
const confirm = useConfirm();

const loadImage = async () => {
  if (!props.path) {
    imageUrl.value = null;
    imageExists.value = false;
    return;
  }

  try {
    const url = await getUrl({ path: props.path });
    imageUrl.value = url.url.toString();

    // Check if the file exists in S3 using list
    const result = await list({ path: props.path });
    imageExists.value = result.items.length > 0;
  } catch (error) {
    console.error('Error loading image:', error);
    imageUrl.value = null;
    imageExists.value = false;
  }
};

const compressImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    if (file.size <= 2000000) {
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
        const maxDimension = 2048; // Maximum dimension to prevent too large canvas

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

        // Convert to blob with quality adjustment
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
            resolve(blob);
          },
          file.type,
          0.7 // Quality factor (0.7 is a good balance between quality and size)
        );
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

  // Validate file type
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    console.error('Invalid file type. Only JPG and PNG are allowed.');
    return;
  }

  try {
    const compressedBlob = await compressImage(file);
    await uploadData({
      path: props.path,
      data: compressedBlob,
      options: {
        contentType: file.type,
      },
    });
    await loadImage();
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const handleUpdate = () => {
  // Trigger file selection dialog
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/jpeg,image/png';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      handleFileSelect({ files: [file] });
    }
  };
  input.click();
};

const handleRemove = () => {
  confirm.require({
    message: 'Are you sure you want to remove this image?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await remove({ path: props.path });
        imageUrl.value = null;
      } catch (error) {
        console.error('Error removing file:', error);
      }
    },
  });
};

watch(() => props.path, loadImage, { immediate: true });
</script>
