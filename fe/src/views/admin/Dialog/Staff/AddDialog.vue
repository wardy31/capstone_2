<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card color="accent text-capitalize">
      <v-toolbar color="primary"> 
        <v-btn @click="handleDialog" icon large color="accent"><v-icon>close</v-icon></v-btn>
        <v-toolbar-title class="accent--text font-weight-bold">Add Staff</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <h2 class="font-weight-regular mb-4 mt-4">Personal Details</h2>
        <v-alert
          type="info"
          icon=""
          border="left"
          text
          :value="true"
          class="mb-6"
        >
          The Username and Password will automatically generate.
        </v-alert>
        
        <v-alert type="error" :value="error">
          {{message}}hahaha
        </v-alert>
        <v-row dense>
          <v-col>
            <v-text-field filled outlined label="First Name" v-model="clinic.first_name"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field filled outlined label="Middle Name" v-model="clinic.middle_name"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field filled outlined label="Last Name" v-model="clinic.last_name"></v-text-field>
          </v-col>
        </v-row>

        <v-row dense class="mt-n3">
          <v-col cols="3">
            <v-select
              outlined
              filled
              :items="['male', 'female']"
              v-model="clinic.gender"
              label="Gender"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              outlined
              filled
              :items="role"
              item-text="name"
              item-value="id"
              v-model="clinic.role"
              label="Role"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field filled outlined label="Address" v-model="clinic.address"></v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="mt-n3">
          <v-col cols="4">
            <v-text-field filled outlined label="Contact Number" v-model="clinic.contact_number"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field filled outlined label="Email" v-model="clinic.email"></v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="mt-n4">
          <v-col md="2">
            <v-btn
              color="primary"
              block
              :loading="loading"
              class="px-12 py-5 text-capitalize font-weight-bold"
              @click="submit()">Add Staff</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  mounted(){
  this.$store.dispatch('clinic/getRole')
  },
  computed:{
    ...mapState({
      role:state => state.clinic.role,
      loading:state => state.staff.submit.loading,
      error:state => state.staff.submit.error,
      message:state => state.staff.submit.message,
      dialog:state => state.staff.submit.dialog
    })
  },
  data() {
    return {
      clinic:{
            first_name:"", 
            middle_name:"",
            last_name:"",
            gender:"",
            role:null,
            address:"",
            contact_number:"",
            email:""
        }
    }
  },
  methods:{
    submit(){
        this.$store.dispatch('staff/createClinic',this.clinic)
    },
    handleDialog(){
      this.$store.state.staff.submit.dialog = false
    }
  }
};
</script>
