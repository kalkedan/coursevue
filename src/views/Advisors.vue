<template>
  <v-data-table
    :headers="headers"
    :items="advisorLists"
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
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Advisor</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.dept" label="Department"></v-text-field>
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
import AdvisorsServices from "../services/AdvisorsServices";
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "First Name",
        align: "start",

        value: "firstName",
      },
      { text: "Last Name", value: "lastName" },
      { text: "Email", value: "email" },
      { text: "Department", value: "dept" },
    ],
    advisorLists: [],
    editedIndex: -1,
    editedItem: {
      firstName: "",
      lastName: "",
      email: "",
      dept: ""
    },
    defaultItem: {
      firstName: "",
      lastName: "",
      email: "",
      dept: ""
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Advisor" : "Edit Advisor";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    AdvisorsServices.getAdvisors()
      .then((response) => {
        this.advisorLists = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.advisorLists.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.advisorLists.indexOf(item);
      confirm("Are you sure you want to delete this advisor?") &&
        this.advisorLists.splice(index, 1);
      AdvisorsServices.deleteAdvisor(item.id)
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

    updateAdvisor(id, advisor) {
      AdvisorsServices.updateAdvisor(id, advisor)
        .then(() => {
          this.$router.push(advisor);
        })
        .catch((error) => {
          this.message = error.response;
        });
    },
    addAdvisor(advisor) {
      console.log(advisor)
      AdvisorsServices.addAdvisor(advisor).then(() => {
        this.$router.push(advisor);
        
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.advisorLists[this.editedIndex], this.editedItem);
      } else {
        this.advisorLists.push(this.editedItem);
      }
      if (this.editedItem.id > 0) {
        this.updateAdvisor(this.editedItem.id, this.editedItem);
      } else {
        this.addAdvisor(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
