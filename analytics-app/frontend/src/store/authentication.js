import { defineStore } from 'pinia'
import { Auth, DataStore } from 'aws-amplify'
import { Organization } from '@/models';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    organization: null,
    isLoggedIn: false,
  }),

  persist: {
    key: 'auth',
    storage: sessionStorage,
  },

  getters: {
    getOrganizationName() {
      try {
        return this.organization.nameVerbose
      } catch (error) {
        return import.meta.env.VITE_APP_SOCIETY_VERBOSE_NAME
      }
    },

    getLoggedIn() {
      return this.isLoggedIn
    },

    getUserName() {
      return this.user?.username || ''
    },
  },

  actions: {
    async setUser() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        this.user = user
        this.isLoggedIn = true
      } catch (error) {
        this.user = null
        this.isLoggedIn = false
      }
    },

    async signIn(email, password) {
      try {
        console.log(this.isLoggedIn)
        const user = await Auth.signIn(email, password);
        const organizationID = user["attributes"]["custom:organization_id"]

        this.user = user
        this.isLoggedIn = true

        const apiOrganization = await DataStore.query(Organization, organizationID);
        this.organization = apiOrganization

        console.log('user', this.user)
        console.log('organization', this.organization)
      } catch (error) {
        // Error handling
      }
    },

    async signOut() {
      try {
        await Auth.signOut()
        this.user = null
        this.organization = null
        this.isLoggedIn = false
        console.log(this.isLoggedIn)
      } catch (error) {
        // Error handling
      }
    },

  },
})