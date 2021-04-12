<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>MEVN Fullstack</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
         <router-view></router-view>
        <Footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import Footer from './components/Footer'

  export default {
    name: 'MEVN',
    components: {
    Footer,
  },
    data: () => ({ drawer: null }),
  }
</script>