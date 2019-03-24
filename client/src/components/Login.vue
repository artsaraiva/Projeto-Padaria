<template>
  <v-layout column>
    <v-flex xs6 offset-xs3 class="card">
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="amber accent-4">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Login" v-model="login" />
          <v-text-field label="Senha" type="password" v-model="password" />
          <div class="danger-alert" v-html="error" />
          <v-btn dark class="amber accent-4" @click="doLogin">
            Login
          </v-btn>
        </div>
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
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
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
  max-width: 50% !important;
}
</style>
