import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUrl } from '@aws-amplify/storage';
import { deriveS3Path } from '../utils/s3Paths';
import { User } from '@/models';
import { DataStore } from '@aws-amplify/datastore';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const userImageUrl = ref<string | null>(null);
  const isLoading = ref(true);

  async function initialize(id: string) {
    try {
      const userQuery = await DataStore.query(User, id);
      if (userQuery) {
        user.value = userQuery;
        loadUserImage(id);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function loadUserImage(userId: string) {
    try {
      const s3Path = deriveS3Path('userPicPath', { userID: userId });
      const url = await getUrl({ path: s3Path });
      userImageUrl.value = url.url.toString();
    } catch (error) {
      console.error('Error loading user image:', error);
      userImageUrl.value = null;
    }
  }

  return {
    user,
    userImageUrl,
    isLoading,
    initialize,
    loadUserImage,
  };
});
