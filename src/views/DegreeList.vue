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
      :items="advisors"
      :search="search"
      sort-by="advisorid"
    ></v-data-table>
  </v-card>
</template>

<script>
import DegreeServices from "../services/DegreeServices";
export default {
    data: () => ({
        dialogue: false,
        search: "",
        headers: [
            {
                text: "Degree Name",
                align: "start",
                value: "name",
            },
            
                {text: "Degree", value: "degree"},
                {text: "Hours", value: "hours"},
                {text: "Department", value: "dept"},
            
        ],
        degreeLists: [],
        editedIndex: -1,
        editedItem: {
            degree: "",
            hours: "",
            dept: ""
        },
        defaultItem: {
            degree: "",
            hours: "",
            dept: ""
        },
    }),

    computed: {
        formTitle(){
            return this.editedIndex === -1 ? "New Degree" : "Edit Degree";
        },

    },

    watch: {
        dialog(val) {
            val || this.close();
        },
    },

    created() {
        DegreeServices.getDegrees()
            .then((response) => {
                this.degreeLists = response.data;
            })
            .catch((error) => {
                console.log("There was an error:", error.response);
            });
    },

    methods: {
        editDegree(item) {
            this.editedIndex = this.degreeLists.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
      const index = this.degreeLists.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.degreeLists.splice(index, 1);
      DegreeServices.deleteCourse(item.id)
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

    updateDegree(degreeid, degree) {
      AdvisorServices.updateCourse(degreeid, degree)
        .then(() => {
          this.$router.push(course);
        })
        .catch((error) => {
          this.message = error.response;
        });
    },

    addDegree(degree){
        console.log(degree)
        AdvisorServices.addDegree(degree).then(() => {
            this.$router.push(degree);
        });
    },

    save() {
        if(this.editedIndex > -1){
            Object.assign(this.degreeLists[this.editedIndex], this.editedItem)
        }
        else {
            this.degreeLists.push(this.editedItem);
        }
        if(this.editedItem.id > 0){
            this.updateAdvisor(this.editedItem.id, this.editedItem);
        }
        else {
            this.addDegree(this.editedItem);
        }
        this.close();
    },
    },

    
};
</script>