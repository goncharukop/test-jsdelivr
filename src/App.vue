<template>
  <v-app>
    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',

  components: {
    Main,
  },
}
</script>