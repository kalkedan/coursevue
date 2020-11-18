<!--<NavBar :key="$route.fullPath" /> -->



<template>
  <v-app>
    <!-- Add NavBar -->
    <NavBar :key="$route.fullPath" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import NavBar from '@/components/NavBar';
import Utils from '@/config/utils.js';
export default {
  name: "App",

  components: {
    NavBar
  },

  data() {
    return {
      user : {}
    }
  },

  created() {
    this.user = Utils.getStore('user');
  }

  // data: () => ({
  //   //
  // }),
};
</script>
