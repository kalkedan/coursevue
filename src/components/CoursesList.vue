<template>
  <v-data-table
    :headers="headers"
    :items="courseLists"
    :search="search"
    sort-by="dept"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Course</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Course name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.dept" label="dept"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.number" label="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.level" label="level"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.hours" label="hours"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import CoursesServices from "../services/CoursesServices";
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Course Name",
        align: "start",

        value: "name",
      },
      { text: "Department", value: "dept" },
      { text: "Course Number", value: "number" },
      { text: "Course Level", value: "level" },
      { text: "Credit hrs", value: "hours" },
      { text: "Descrption", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    courseLists: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      dept: 0,
      number: 0,
      level: 0,
      hours: 0,
      description:0
    },
    defaultItem: {
      name: "",
      dept: 0,
      number: 0,
      level: 0,
      hours: 0,
      description:0
      
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Course" : "Edit Course";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    CoursesServices.getCourses()
      .then((response) => {
        this.courseLists = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.courseLists.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.courseLists.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.courseLists.splice(index, 1);
      CoursesServices.deleteCourse(item.id)
        .then((response) => {
          this.errors = response.data;
          this.$router.push(item);
        })
        .catch((error) => {
          this.errors = error.data;
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    updateCourse(id, course) {
      CoursesServices.updateCourse(id, course)
        .then(() => {
          this.$router.push(course);
        })
        .catch((error) => {
          this.message = error.response;
        });
    },
    addCourse(course) {
      console.log(course)
      CoursesServices.addCourse(course).then(() => {
        this.$router.push(course);
        
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.courseLists[this.editedIndex], this.editedItem);
      } else {
        this.courseLists.push(this.editedItem);
      }
      if (this.editedItem.id > 0) {
        this.updateCourse(this.editedItem.id, this.editedItem);
      } else {
        this.addCourse(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
