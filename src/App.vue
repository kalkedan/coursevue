<!--<NavBar :key="$route.fullPath" /> -->



<template>
  <v-app>
    <!-- Add NavBar -->
    <NavBar :key="$route.fullPath" />
    <!-- <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn text exact link :to="{name:'home'}">Home</v-btn>
      <v-btn text exact link :to="{name:'about'}">About</v-btn>
      <v-btn text exact link :to="{name:'courses'}">Courses</v-btn>
      <v-btn text exact link :to="{name:'advisors'}">Advisors</v-btn>
      <v-btn text exact link :to="{name:'login'}">Login</v-btn>
    </v-app-bar> -->

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
