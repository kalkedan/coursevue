<template>
  <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Save successful!</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.first"
              :rules="rules.name"
              color="purple darken-2"
              label="First name"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.last"
              :rules="rules.name"
              color="blue darken-2"
              label="Last name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
                v-model="form.email"
                :rules="rules.name"
                color="blue darken-2"
                label="Email"
                required
              ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
          type="submit"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Utils from '@/config/utils'
import StudentServices from '@/services/StudentsServices'
// import CoursesList from './CoursesList.vue';
  export default {
  // components: { CoursesList },
    data () {
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        email: ''
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          // age: [
          //   val => val < 10 || `I don't believe you!`,
          // ],
          // animal: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
        snackbar: false,
        terms: false,
        defaultForm,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last //&&
          // this.form.favoriteAnimal &&
          // this.form.terms
        )
      },
    },

    created() {
      let user = Utils.getStore("user");
      let str = user.name.split(" ");
      let fName = str[0];
      let lName = str[1];
      console.log(fName);
      if(user != null) {
        this.form.first = fName;
        this.form.last = lName;
        this.form.email = user.email;
      }
    },


    methods: {
      resetForm () {
        let email = Utils.getStore("user").email;
        let user = StudentServices.getStudentByEmail(email);
        let id = user.id;
        console.log(id);
        console.log(user);
        StudentServices.updateStudent(id, user);
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
      cancel() {
        this.$router.push({name: 'home'});
      }
    },
  }
</script>