<template>
    <v-dialog v-model="dialog" width="auto" @click:outside="closeDialog"  transition="dialog-bottom-transition">
        <v-card >
            <v-card-title class="primary accent--text">Edit Profile</v-card-title>
            <v-card-text>
                <div class="mx-4 my-4">
                    <v-text-field class="text-capitalize mb-n4" label="First Name" v-model="credentials.first_name" outlined></v-text-field>                    
                    <v-text-field class="text-capitalize mb-n4" label="Middle Name" v-model="credentials.middle_name" outlined></v-text-field>                    
                    <v-text-field class="text-capitalize mb-n4" label="Last Name" v-model="credentials.last_name" outlined></v-text-field>                    
                    <v-select class="text-capitalize mb-n4" outlined label="Gender" v-model="credentials.gender" :items="['male','female']"></v-select>                  
                    <v-text-field class="text-capitalize mb-n4" label="Address" v-model="credentials.address" outlined></v-text-field>                    
                    <v-text-field class="text-capitalize mb-n4" label="Department" v-model="credentials.department" outlined></v-text-field>                    
                    <v-text-field class="text-capitalize mb-n4" label="Contact Number"  v-model="credentials.contact_number" outlined></v-text-field>     
                    <v-select outlined dense label="Vaccination Status" :items="['partial vaccinated', 'fully vaccinated', 'booster']" v-model="credentials.vaccination_status" />                                                   
                </div>
            </v-card-text>

            <v-card-actions class="mt-n10 mx-4">
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog" text plain class="text-capitalize">cancel</v-btn>
                <v-btn @click="update" :loading="editLoading" color="primary" class="text-capitalize px-4">Update </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

    export default{
        props:['user'],
        data(){
            return{
                credentials:{
                    id:this.user.id,
                    first_name: this.user.first_name,
                    middle_name:this.user.middle_name,
                    last_name:this.user.last_name,
                    gender:this.user.gender,
                    address:this.user.address,
                    contact_number:this.user.contact_number,
                    email:this.user.email,
                    department:this.user.department,
                    vaccination_status:this.user.vaccination_status
                }
            }
        },
        computed:{
            ...mapState({
                dialog: state => state.user.updateProfile.dialog,
                editLoading: state => state.user.updateProfile.loading
            })
        },
        methods:{
            closeDialog(){
                this.$store.state.user.updateProfile.dialog = false
            },
            update(){
                this.$store.dispatch('user/updateProfile',this.credentials)
            }
        }
    }
</script>