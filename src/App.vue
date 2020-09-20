<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <CoursesList />
    </v-main>
  </v-app>
</template>

<script>
import CoursesList from "./components/CoursesList";

export default {
  name: "App",

  components: {
    CoursesList,
  },

  data: () => ({
    //
  }),
};
</script>
