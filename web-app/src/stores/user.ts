import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { getUrl } from '@aws-amplify/storage';
import { deriveS3Path } from '../utils/s3Paths';
import { User } from '@/models';
import { DataStore } from '@aws-amplify/datastore';
import { AuthenticationState, useAuthStore } from './auth';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const userImageUrl = ref<string | null>(null);
  const isLoading = ref(true);
  const authStore = useAuthStore();

  const initialize = async (id: string) => {
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

  const loadUserImage = async (userId: string) => {
    try {
      const s3Path = deriveS3Path('userPicPath', { userID: userId });
      const url = await getUrl({ path: s3Path });
      userImageUrl.value = url.url.toString();
    } catch (error) {
      console.error('Error loading user image:', error);
      userImageUrl.value = null;
    }
  }

  const clear = () => {
    user.value = null;
    userImageUrl.value = null;
    isLoading.value = true;
  }

  return {
    user,
    userImageUrl,
    isLoading,
    initialize,
    loadUserImage,
    clear,
  };
});
