import { getUrl } from '@aws-amplify/storage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getUser } from '../graphql/queries';
import { deriveS3Path } from '../utils/s3Paths';

import { User } from '@/API';
import { createUser } from '@/graphql/mutations';
import { amplifyDataClient } from '@/utils/amplifyDataClient';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const userImageUrl = ref<string | null>(null);
  const isLoading = ref(false);

  const getUserAsync = async (id: string): Promise<User | null> => {
    // If user exists, return it immediately
    if (user.value) {
      return user.value;
    }

    // If not loading, initialize
    if (!isLoading.value) {
      await initialize(id);
    } else {
      // Wait for loading to complete
      while (isLoading.value) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return user.value;
  };

  const initialize = async (id: string) => {
    try {
      isLoading.value = true;
      const { data } = await amplifyDataClient.graphql({
        query: getUser,
        variables: { id },
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
  };

  const createUserInitialSetup = async (
    id: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const { data } = await amplifyDataClient.graphql({
        query: createUser,
        variables: { input: { id, firstName, lastName, permissions: [] } },
      });
      user.value = data.createUser;
      isLoading.value = false;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const loadUserImage = async (userId: string) => {
    try {
      const s3Path = deriveS3Path('userPicPath', { userID: userId });
      const url = await getUrl({ path: s3Path });
      userImageUrl.value = url.url.toString();
    } catch (error) {
      console.error('Error loading user image:', error);
      userImageUrl.value = null;
    }
  };

  const clear = () => {
    user.value = null;
    userImageUrl.value = null;
    isLoading.value = false;
  };

  return {
    user,
    userImageUrl,
    isLoading,
    getUserAsync,
    initialize,
    loadUserImage,
    clear,
    createUserInitialSetup,
  };
});
