<template>
  <v-data-table
    :headers="headers"
    :items="semesterLists"
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
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Semester</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="semester"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.startDate" label="Start Date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.endDate" label="End Date"></v-text-field>
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
import SemestersServices from "../services/SemesterServices";
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Semester",
        align: "start",

        value: "name",
      },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions", sortable: false },

    ],
    semesterLists: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      startDate: "",
      endDate: ""
    },
    defaultItem: {
      name: "",
      startDate: "",
      endDate: ""
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Semester" : "Edit Semester";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    SemestersServices.getSemesters()
      .then((response) => {
        this.semesterLists = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.semesterLists.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.semesterLists.indexOf(item);
      confirm("Are you sure you want to delete this semester?") &&
        this.semesterLists.splice(index, 1);
      SemestersServices.deleteSemester(item.id)
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

    updateSemester(id, semester) {
      SemestersServices.updateSemester(id, semester)
        .then(() => {
          this.$router.push(semester);
        })
        .catch((error) => {
          this.message = error.response;
        });
    },
    addSemester(semester) {
      console.log(semester)
      SemestersServices.addSemester(semester).then(() => {
        this.$router.push(semester);
        
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.semesterLists[this.editedIndex], this.editedItem);
      } else {
        this.semesterLists.push(this.editedItem);
      }
      if (this.editedItem.id > 0) {
        this.updateSemester(this.editedItem.id, this.editedItem);
      } else {
        this.addSemester(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
