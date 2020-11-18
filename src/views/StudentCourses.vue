<template>
  <v-data-table
    :headers="headers"
    :items="StudentCourseLists"
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
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Student Course</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.courseName" label="courseName">Course ID</v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="semester-name">Semester Name</v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.grade" label="grade">Grade</v-text-field>
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

        <v-dialog v-model="dialog2" max-width="500px">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Select Student</v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="myStudent" label="Student ID"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="selectStudent">Save</v-btn>
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
import StudentCourseServices from "../services/StudentCourseServices";
import StudentsServices from "../services/StudentsServices";
import Utils from '@/config/utils';
export default {
  data: () => ({
    myStudent: -1,
    dialog: false,
    dialog2: false,
    search: "",
    headers: [
      {
        text: "Course Id",
        align: "start",
        value: "courseId",
      },
      { text: "Course Dept", value: "courses.dept" },
      { text: "Course Name", value: "courses.name" },
      {text: "Semester", value: "semesters.name"},
      {text: "Grade", value: "studentCourse.grade"}
    ], 
    StudentCourseLists: [],
    editedIndex: -1,
    editedItem: {
      courseId: "",
      courses: "",
      name: "",
      grade: "",
    },
    defaultItem: {
      courseId: "",
      courses: "",
      name: "",
      grade: ""
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Student Course" : "Edit Student Course";
    },
    formStudent() {
        return this.editedIndex === -1 ? "Select Student" : "Select Student";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialog2(val) {
      val || this.close();
    },
  },
  created() {
    // StudentCourseServices.getStudentCourses()
    //   .then((response) => {
    //     this.StudentCourseLists = response.data;
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("There was an error:", error.response);
    //   });
    let email = Utils.getStore("user").email;
    let user = StudentServices.getStudentByEmail(email);
    let id = user.id;
    StudentCourseServices.getStudentCoursesByEmail(email)
      .then((response) => {
        this.StudentCourseLists = response.data;
        console.log("response.data" + response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.StudentCourseLists.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.StudentCourseLists.indexOf(item);
      confirm("Are you sure you want to delete this StudentCourse?") &&
        this.StudentCourseLists.splice(index, 1);
      StudentCourseServices.deleteStudentCourse(item.id)
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
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    updateStudentCourses(id, StudentCourse, grade) {
      StudentCourseServices.updateStudentCourse(id, StudentCourse, grade)
        .then(() => {
          this.$router.push(StudentCourse);
        })
        .catch((error) => {
          this.message = error.response;
        });
    },
    addStudentCourse(StudentCourse) {
      console.log(StudentCourse)
      StudentCourseServices.addStudentCourse(StudentCourse).then(() => {
        this.$router.push(StudentCourse);
        
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.StudentCourseLists[this.editedIndex], this.editedItem);
      } else {
        this.StudentCourseLists.push(this.editedItem);
      }
      if (this.editedItem.id > 0) {
        this.updateStudentCourse(this.editedItem.id, this.editedItem);
      } else {
        this.addStudentCourse(this.editedItem);
      }
      this.close();
    },
    selectStudent() {
      StudentCourseServices.getStudentCourses(this.myStudent)
      .then((response) => {
        console.log(this.myStudent);
        this.StudentCourseLists = response.data;
        // this.$router.push(StudentCourses);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
      this.close();
    },
    getStudentCourses(id) {
      console.log(id);
      StudentCourseServices.getStudentCourses(id)
      .then((response) => {
        this.StudentCourseLists = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
    },
    getStudentCoursesByEmail(email) {
      StudentCourseServices.getStudentCoursesByEmail(email)
      .then((response) => {
        this.StudentCourseLists = response.data;
      })
    }
  },
};
</script>