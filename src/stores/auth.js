import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    accessToken: null,
    expiresAt: null
  }),

  actions: {
    login() {
      this.isAuthenticated = true
      this.user = this.$auth.user
      this.accessToken = this.$auth.tokenManager.getAccessToken()
      this.expiresAt = this.$auth.tokenManager.getAccessTokenExpirationDate()
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      this.accessToken = null
      this.expiresAt = null
    }
  },

  getters: {
    isAuthenticated() {
      return this.isAuthenticated
    },

    user() {
      return this.user
    },

    accessToken() {
      return this.accessToken
    },

    expiresAt() {
      return this.expiresAt
    }
  },

  // Use the Auth0 plugin to access the authentication information
  // and trigger the actions to update the state of the store.
  // Note that you need to add the `auth` plugin to your Vue app.
  // See the Auth0 documentation for more information.
  use: [useAuth0]
})
