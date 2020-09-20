<template>
  <v-card>
    <v-card-title>
      Course Lists
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="courseList" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import CoursesService from "../services/CoursesService.js";
export default {
  name: "coursesList",
  data() {
    return {
      search: "",
      courseList: [],
      headers: [
        { text: "Department", value: "dept" },
        { text: "Course Number", value: "number" },
        { text: "Course Level", value: "level" },
        { text: "Credit hrs", value: "hours" },
        { text: "Name", value: "name" },
        { text: "Descrption", value: "description" },
      ],
    };
  },

  created() {
    CoursesService.getCourses()
      .then((response) => {
        this.courseList = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
};
</script>

