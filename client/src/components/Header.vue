<template>
  <v-toolbar fixed dark class="cyan">
    <v-toolbar-title cass="mr-4">
      <span class="home" @click="navigateTo({ name: 'root' })">Padaria</span>
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn flat dark @click="navigateTo({ name: 'register' })">
        Cadastrar
      </v-btn>
      <v-btn flat dark>
        Entrar
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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
