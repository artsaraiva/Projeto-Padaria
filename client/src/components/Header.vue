<template>
  <v-toolbar fixed dark class="amber accent-4">
    <v-toolbar-title>
      <router-link class="home" tag="span" :to="{ name: 'sales' }">
        Padaria
      </router-link>
      <v-btn flat dark :to="{ name: 'users' }">
        Usuários
      </v-btn>
      <v-btn flat dark :to="{ name: 'products' }">
        Produtos
      </v-btn>
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark :to="{ name: 'login' }">
        Entrar
      </v-btn>
      <v-tooltip bottom v-if="$store.state.isUserLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn flat dark v-on="on" v-html="$store.state.user.name" @click="logout" />
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
  color: darkgoldenrod;
}
</style>
