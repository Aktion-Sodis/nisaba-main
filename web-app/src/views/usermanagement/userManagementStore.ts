import { get, post } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { UserGroup } from '@/types/UserGroup';
const API_NAME = 'AdminQueries';

interface CognitoUserAttribute {
  Name: string;
  Value: string;
}

interface CognitoUser {
  Username: string;
  Attributes: CognitoUserAttribute[];
  UserCreateDate: string;
  UserLastModifiedDate: string;
  Enabled: boolean;
  UserStatus: string;
  Groups?: string[];
}

export interface User {
  id: string;
  username: string;
  confirmed: boolean;
  groups: string[];
}

interface ListUsersResponse {
  Users: CognitoUser[];
  NextToken?: string;
}

interface CreateUserResponse {
  message: string;
  password?: string;
  user: CognitoUser;
}

interface PasswordResetResponse {
  message: string;
  password?: string;
}

export const useUserManagementStore = defineStore('userManagement', () => {
  const loadingUsers = ref(false);
  const error = ref<string | null>(null);
  const _allUsers = ref<CognitoUser[]>([]);
  const isInitialized = ref(false);

  const getAuthorizationHeader = async () => {
    const { tokens } = await fetchAuthSession();
    return {
      headers: {
        Authorization: tokens?.accessToken.toString() || '',
      },
    };
  };

  const loadUsers = async () => {
    loadingUsers.value = true;
    error.value = null;

    try {
      const options = await getAuthorizationHeader();
      const response = await get({
        apiName: API_NAME,
        path: '/listUsers',
        options,
      });
      const responseData = await response.response;
      const data =
        (await responseData.body.json()) as unknown as ListUsersResponse;
      _allUsers.value = data.Users || [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load users';
      console.error('Error loading users:', err);
    } finally {
      loadingUsers.value = false;
    }
  };

  const init = async () => {
    if (isInitialized.value) return;

    try {
      await loadUsers();
      isInitialized.value = true;
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : 'Failed to initialize user management';
      console.error('Error initializing user management:', err);
    }
  };

  const clear = () => {
    loadingUsers.value = false;
    error.value = null;
    _allUsers.value = [];
    isInitialized.value = false;
  };

  const users = computed(() => {
    return _allUsers.value.map((user) => {
      const email = user.Attributes.find(
        (attr) => attr.Name === 'email'
      )?.Value;
      const phone = user.Attributes.find(
        (attr) => attr.Name === 'phone_number'
      )?.Value;
      const emailVerified =
        user.Attributes.find((attr) => attr.Name === 'email_verified')
          ?.Value === 'true';
      const phoneVerified =
        user.Attributes.find((attr) => attr.Name === 'phone_number_verified')
          ?.Value === 'true';

      return {
        id: user.Username,
        username: email || phone || user.Username,
        confirmed: emailVerified || phoneVerified,
        groups: user.Groups || [],
      };
    });
  });

  const isCreatingUser = ref(false);
  const createUser = async (
    username: string,
    userGroup: UserGroup,
    returnPassword: boolean = false
  ) => {
    isCreatingUser.value = true;
    error.value = null;

    try {
      const options = await getAuthorizationHeader();
      const response = await post({
        apiName: API_NAME,
        path: '/createUser',
        options: {
          ...options,
          body: {
            username,
            returnPassword,
            userGroup,
          },
        },
      });
      const responseData = await response.response;
      const data =
        (await responseData.body.json()) as unknown as CreateUserResponse;

      // Add the new user to the beginning of the users array
      _allUsers.value = [data.user, ..._allUsers.value];

      return {
        success: true,
        password: returnPassword ? data.password : undefined,
      };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to create user';
      console.error('Error creating user:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to create user',
      };
    } finally {
      isCreatingUser.value = false;
    }
  };

  const isDeletingUser = ref(false);
  const deleteUser = async (username: string) => {
    isDeletingUser.value = true;
    error.value = null;

    try {
      const options = await getAuthorizationHeader();
      const response = await post({
        apiName: API_NAME,
        path: '/deleteUser',
        options: {
          ...options,
          body: { username },
        },
      });
      const responseData = await response.response;
      const _data = await responseData.body.json();

      // Remove the deleted user from the users array
      _allUsers.value = _allUsers.value.filter(
        (user) => user.Username !== username
      );
      isDeletingUser.value = false;
      return true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to delete user';
      console.error('Error deleting user:', err);
      isDeletingUser.value = false;
      throw err;
    }
  };

  const isResettingPassword = ref(false);
  const isUpdatingRole = ref(false);

  const updateUserRole = async (username: string, newGroup: string) => {
    isUpdatingRole.value = true;
    error.value = null;

    try {
      const options = await getAuthorizationHeader();

      // First, get current groups for the user
      const currentGroupsResponse = await get({
        apiName: API_NAME,
        path: '/listGroupsForUser',
        options: {
          ...options,
          queryParams: { username },
        },
      });
      const currentGroupsData = await currentGroupsResponse.response;
      const currentGroups = (await currentGroupsData.body.json()) as {
        Groups: { GroupName: string }[];
      };

      // Remove user from all current groups
      for (const group of currentGroups.Groups) {
        await post({
          apiName: API_NAME,
          path: '/removeUserFromGroup',
          options: {
            ...options,
            body: { username, groupname: group.GroupName },
          },
        });
      }

      // Add user to new group
      await post({
        apiName: API_NAME,
        path: '/addUserToGroup',
        options: {
          ...options,
          body: { username, groupname: newGroup },
        },
      });

      // Update local state
      const userIndex = _allUsers.value.findIndex(
        (user) => user.Username === username
      );
      if (userIndex !== -1) {
        _allUsers.value[userIndex].Groups = [newGroup];
      }

      return { success: true };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to update user role';
      console.error('Error updating user role:', err);
      return {
        success: false,
        error:
          err instanceof Error ? err.message : 'Failed to update user role',
      };
    } finally {
      isUpdatingRole.value = false;
    }
  };

  const resetPassword = async (
    username: string,
    returnPassword: boolean = false
  ) => {
    isResettingPassword.value = true;
    error.value = null;

    try {
      const options = await getAuthorizationHeader();
      const response = await post({
        apiName: API_NAME,
        path: '/hardPasswordReset',
        options: {
          ...options,
          body: { username, returnPassword },
        },
      });
      const responseData = await response.response;
      const data =
        (await responseData.body.json()) as unknown as PasswordResetResponse;

      return {
        success: true,
        password: returnPassword ? data.password : undefined,
      };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to reset password';
      console.error('Error resetting password:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to reset password',
      };
    } finally {
      isResettingPassword.value = false;
    }
  };

  return {
    loadingUsers,
    error,
    users,
    isInitialized,
    loadUsers,
    init,
    clear,
    createUser,
    deleteUser,
    updateUserRole,
    resetPassword,
    isResettingPassword,
    isCreatingUser,
    isUpdatingRole,
  };
});
