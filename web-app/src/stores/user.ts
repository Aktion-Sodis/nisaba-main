import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUrl } from '@aws-amplify/storage';
import { deriveS3Path } from '../utils/s3Paths';
import { User } from '@/API';
import { getUser, listSurveys } from '../graphql/queries';
import { amplifyDataClient } from '@/utils/amplifyDataClient';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const userImageUrl = ref<string | null>(null);
  const isLoading = ref(true);

  const initialize = async (id: string) => {
    try {
      const { data } = await amplifyDataClient.graphql({
        query: getUser,
        variables: { id }
      });
      
      if (data.getUser) {
        user.value = data.getUser;
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
