<template>
  <v-layout column>
    <v-flex xs6 offset-xs3 class="card">
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Cadastro de Usuário</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Nome" v-model="name" />
          <v-text-field label="Login" v-model="login" />
          <v-text-field label="Senha" type="password" v-model="password" />
          <div class="danger-alert" v-html="error" />
          <v-btn dark class="cyan" @click="register">
            Cadastrar
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      name: '',
      login: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          name: this.name,
          login: this.login,
          password: this.password
        })
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
