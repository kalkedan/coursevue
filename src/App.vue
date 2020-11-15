<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
        <v-btn flat>
          <router-link to="/">Home</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/about">About</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/courses">Courses</router-link>
        </v-btn>
          <v-btn flat>
          <router-link to="/advisors">Advisors</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/login">Login</router-link>
        </v-btn>
      </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
