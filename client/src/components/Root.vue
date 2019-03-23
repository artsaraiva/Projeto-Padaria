<template>
  <v-layout column class="main">
    <v-img :src="image" class="logo"/>
  </v-layout>
</template>

<script>
import image from '../assets/logo.png'

export default {
  data: function () {
    return {
      image: image
    }
  }
}
</script>

<style scoped>
.main {
  width: 75%;
  height: 75%;
}
.logo {
  width: 45%;
  height: 45%;
}
</style>
