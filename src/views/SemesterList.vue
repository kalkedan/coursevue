<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="semesters"
      :search="search"
      sort-by="semesterid"
    ></v-data-table>
  </v-card>
</template>

<script>
import AdvisorServices from "../services/SemesterServices";
export default {
    data: () => ({
        dialogue: false,
        search: "",
        headers: [
            {
                text: "Semester",
                align: "start",
                value: "name",
            },
            
                {text: "Advisor", value: "firstName" + "lastName"},
                {text: "email", value: "email"},
                {text: "Department", value: "dept"},
            
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
        formTitle(){
            return this.editedIndex === -1 ? "New Advisor" : "Edit Advisor";
        },

    },

    watch: {
        dialog(val) {
            val || this.close();
        },
    },

    created() {
        AdvisorServices.getAdvisors()
            .then((response) => {
                this.advisorLists = response.data;
            })
            .catch((error) => {
                console.log("There was an error:", error.response);
            });
    },

    methods: {
        editAdvisor(item) {
            this.editedIndex = this.advisorLists.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
      const index = this.advisorLists.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.advisorLists.splice(index, 1);
      AdvisorServices.deleteCourse(item.id)
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

    updateAdvisor(advisorid, advisor) {
      AdvisorServices.updateCourse(advisorid, advisor)
        .then(() => {
          this.$router.push(course);
        })
        .catch((error) => {
          this.message = error.response;
        });
    },

    addAdvisor(advisor){
        console.log(advisor)
        AdvisorServices.addAdvisor(advisor).then(() => {
            this.$router.push(advisor);
        });
    },

    save() {
        if(this.editedIndex > -1){
            Object.assign(this.advisorLists[this.editedIndex], this.editedItem)
        }
        else {
            this.advisorLists.push(this.editedItem);
        }
        if(this.editedItem.id > 0){
            this.updateAdvisor(this.editedItem.id, this.editedItem);
        }
        else {
            this.addAdvisor(this.editedItem);
        }
        this.close();
    },
    },

    
};
</script>