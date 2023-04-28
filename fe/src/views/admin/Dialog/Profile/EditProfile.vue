<template>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card color="accent text-capitalize">
        <v-toolbar color="primary"> 
          <v-btn @click="handleDialog" icon large color="accent"><v-icon>close</v-icon></v-btn>
          <v-toolbar-title class="accent--text font-weight-bold">Edit Profile</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <h2 class="font-weight-regular mb-4 mt-4">Personal Information</h2>
          
          <v-row dense>
            <v-col>
              <v-text-field filled outlined label="First Name" v-model="clinic.first_name" :error-messages="error?.first_name ? error?.first_name : false "></v-text-field>
            </v-col>
            <v-col>
              <v-text-field filled outlined label="Middle Name" v-model="clinic.middle_name" :error-messages="error?.middle_name ? error?.middle_name : false "></v-text-field>
            </v-col>
            <v-col>
              <v-text-field filled outlined label="Last Name" v-model="clinic.last_name" :error-messages="error?.last_name ? error?.last_name : false "></v-text-field>
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
                :error-messages="error?.gender ? error?.gender : false "
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
              <v-text-field filled outlined label="Address" v-model="clinic.address" :error-messages="error?.address ? error.address : false"></v-text-field>
            </v-col>
          </v-row>
          <v-row dense class="mt-n3">
            <v-col cols="4">
              <v-text-field filled outlined maxlength="11" :rules="[(value) => value.length <=11]" label="Contact Number" v-model="clinic.contact_number" :error-messages="error?.contact_number ? error?.contact_number : false "></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field filled outlined label="Email" v-model="clinic.email" :error-messages="error?.email ? error?.email : false "></v-text-field>
            </v-col>
          </v-row>
          <v-row dense class="mt-n4">
            <v-col md="2">
              <v-btn
                color="primary"
                block
                :loading="loading"
                class="px-12 py-5 text-capitalize font-weight-bold"
                @click="editProfile()">Edit Profile</v-btn
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
    props:['profile'],
    computed:{
      ...mapState({
        role:state => state.clinic.role,
        loading:state => state.staff.update.loading,
        error:state => state.staff.update.error,
        message:state => state.staff.submit.message,
      })
    },
    watch:{
        profile(){
            console.log('profile watch',this.profile);
            if(this.profile){
                this.dialog = true
                this.clinic.id = this.profile.id
                this.clinic.first_name = this.profile.first_name
                this.clinic.middle_name = this.profile.middle_name
                this.clinic.last_name = this.profile.last_name
                this.clinic.gender = this.profile.gender
                this.clinic.address = this.profile.address
                this.clinic.role = this.profile.role_id
                this.clinic.contact_number = this.profile.contact_number
                this.clinic.email = this.profile.email
            }
        }
    },
    data() {
      return {
        dialog:false,
        clinic:{
              id:null,
              first_name:this.profile?.first_name, 
              middle_name:this.profile?.middle_name,
              last_name:this.profile?.last_name,
              gender:this.profile?.gender,
              role:this.profile?.role,
              address:this.profile?.address,
              contact_number:this.profile?.contact_number,
              email:this.profile?.email
          }
      }
    },
    methods:{
      submit(){
          this.$store.dispatch('staff/createClinic',this.clinic)
      },
      handleDialog(){
        this.dialog = false
        this.$emit('handleProfile')
      },
      async editProfile(){
        const res =await this.$store.dispatch('staff/editProfile',this.clinic)
        if(res){
           this.handleDialog()
           this.$emit('snackBar')
           this.$store.dispatch('clinic/loadUser')
        }
      }
    }
  };
  </script>
  