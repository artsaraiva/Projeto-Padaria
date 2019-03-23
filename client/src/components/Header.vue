<template>
  <v-toolbar fixed dark class="amber accent-4">
    <v-toolbar-title>
      <router-link class="home" tag="span" :to="{ name: 'root' }">
        Padaria
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn flat dark :to="{ name: 'register' }">
        Cadastrar
      </v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark :to="{ name: 'login' }">
        Entrar
      </v-btn>
      <v-tooltip bottom v-if="$store.state.isUserLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn flat dark v-on="on" v-html="$store.state.user.name" @click="logout"></v-btn>
        </template>
        <span>Sair</span>
      </v-tooltip>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: aquamarine;
}
</style>
