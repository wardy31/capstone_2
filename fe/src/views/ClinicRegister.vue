<template>
  <v-app>
    <v-main class="primary">
      <v-container>
        <v-card class="rounded-lg elevation-6 accent mx-auto my-auto" width="800">
          <v-card-title class="primary--text"
            ><h3>Create Account</h3></v-card-title
          >
          <h5 class="mx-4 mb-8 secondary--text">* Clinic Registration.</h5>
          <div class="mx-16">
            <v-alert type="error" dense text  :value="error">
                {{message}}
            </v-alert>
            <v-row justify="center" dense>
              <v-col
                ><v-text-field
                  label="First Name"
                  filled
                  dense
                  outlined
                  v-model="clinic.first_name"
                ></v-text-field
              ></v-col>
              <v-col
                ><v-text-field
                  label="Middle Name"
                  filled
                  dense
                  outlined
                  v-model="clinic.middle_name"
                ></v-text-field
              ></v-col>
              <v-col
                ><v-text-field
                  label="Last Name"
                  filled
                  dense
                  outlined
                  v-model="clinic.last_name"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col
                ><v-text-field label="Age" v-model="clinic.age" filled dense outlined></v-text-field
              ></v-col>
              <v-col
                > <v-select
                    :items="['Male','Female']"
                    v-model="clinic.gender"
                    outlined dense filled
                    label="Gender"
                />
              </v-col>
              <v-col
                ><v-text-field
                  label="Contact Number"
                  filled
                  dense
                  outlined
                  v-model="clinic.contact_number"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="5"
                ><v-text-field
                  label="Address"
                  filled
                  dense
                  outlined
                  v-model="clinic.address"
                ></v-text-field
              ></v-col>
              <v-col cols="4"
                ><v-text-field
                  label="Email"
                  filled
                  dense
                  outlined
                  v-model="clinic.email"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3"
                ><v-text-field
                  label="Username"
                  filled
                  dense
                  outlined
                  v-model="clinic.username"
                ></v-text-field
              ></v-col>
              <v-col cols="3"
                ><v-text-field
                  label="Password"
                  filled
                  dense
                  outlined
                  type="password"
                  v-model="clinic.password"
                ></v-text-field 
              ></v-col>
              <v-col cols="3"
                ><v-text-field
                  label="Confirm Password"
                  filled
                  dense
                  outlined
                  type="password"
                  v-model="clinic.password_confirmation"
                ></v-text-field
              ></v-col>

            </v-row>
            
        </div>
          <v-card-actions
            >
            <v-spacer></v-spacer>
            <v-btn text plain to="clinic-login" class=" text-capitalize">Cancel</v-btn>
            <v-btn color="primary" @click="submit" :loading="loading" class="pa-5 px-12 text-capitalize">Create Account</v-btn>
            </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed:{
    ...mapState({
        loading: state => state.register.submit.loading,
        error: state => state.register.submit.error,
        message: state => state.register.submit.message
    })
  },
  data() {
    return {
        clinic:{
            first_name:"", 
            middle_name:"",
            last_name:"",
            age:"",
            gender:"",
            contact_number:"",
            username:"",
            password:"",
            password_confirmation:"",
            email:""
        }
    
    //   gender: [
    //     { value: "male", label: "Male" },
    //     { value: "female", label: "Female" },
    //   ],
    }
  },
  methods:{
    submit(){
        this.$store.dispatch('register/createClinic',this.clinic)
    }
  }
};
</script>
