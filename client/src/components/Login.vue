<template>
  <v-layout column>
    <v-flex xs10 offset-xs1 class="card">
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="amber accent-4">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <form @submit.prevent="doLogin" class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field prepend-icon="person" label="Email ou Login" v-model="login" />
          <v-text-field prepend-icon="lock" label="Senha" type="password" v-model="password" />
          <div class="danger-alert" v-html="error" />
          <v-btn type="submit" dark class="amber accent-4">
            Login
          </v-btn>
        </form>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  data () {
    return {
      login: '',
      password: '',
      error: null
    }
  },
  methods: {
    async doLogin () {
      try {
        const response = await UserService.login({
          login: this.login,
          password: this.password
        })

        await Promise.all([
          this.$store.dispatch('setToken', response.data.token),
          this.$store.dispatch('setUser', response.data.user)
        ])

        this.$router.push(this.$route.query.redirect || '/')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.card {
  max-width: 83.33333333333334% !important;
}
</style>
