<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <!-- <v-btn flat>
          <router-link to="/">Home</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/about">About</router-link>
        </v-btn> -->
    </v-toolbar>

    <v-content>
      <!-- <CoursesList /> -->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import CoursesList from "./components/CoursesList";

export default {
  name: "App",

  components: {
    // CoursesList,
  },

  data: () => ({
    //
  }),
};
</script>
