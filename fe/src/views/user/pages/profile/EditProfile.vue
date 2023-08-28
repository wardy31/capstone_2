<template>
    <v-app>
        <v-main class="accent">
            <Dialog :user="user" />
            <v-container class="ml-md-10">
                <div class="mt-4 mt-lg-12">
                    <h2 class="font-weight-bold">Personal Profile</h2>
                </div>
                <div class="my-8 d-flex" :class="{ 'justify-center': $vuetify.breakpoint.mobile }">
                    <v-avatar color="primary" tile size="160" class="white--text elevation-2">
                        <img :src="`${BaseImage}${user.images_path}`" alt="" srcset="">
                    </v-avatar>
                </div>


                <v-divider></v-divider>
                <div class="mb-2 mt-5">
                    <v-alert type="error" dense text :value="editError" width="320">
                        {{ editMessage }}
                    </v-alert>
                    <v-alert type="success" dense text :value="editSuccess" width="320">
                        {{ editMessage }}
                    </v-alert>
                    <div>
                        <h3 class="gray--text mb-2">Personal Information</h3>
                        <v-btn color="primary" small class="mb-5 text-capitalize py-3" @click="openDialog"><v-icon
                                left>edit</v-icon> Edit
                            Profile</v-btn>
                    </div>
                </div>

                <div class="d-lg-flex mb-2">
                    <h4>Name:</h4>
                    <h4 class="ml-lg-2 font-weight-bold primary--text text-capitalize">{{ `${user.first_name}
                                            ${user.middle_name} ${user.last_name}` }}</h4>
                </div>

                <div class="d-lg-flex  mb-3">
                    <h4>Gender:</h4>
                    <h4 class="ml-lg-2 font-weight-bold primary--text text-capitalize">{{ user.gender }}</h4>
                </div>

                <div class="d-lg-flex mb-3">
                    <h4>Address:</h4>
                    <h4 class="ml-lg-2 font-weight-bold  primary--text text-capitalize">{{ user.address }}</h4>
                </div>

                <div class="d-lg-flex mb-3">
                    <h4>Department:</h4>
                    <h4 class="ml-lg-2 font-weight-bold text-body-1 primary--text text-capitalize">{{ user.department }}
                    </h4>
                </div>

                <div class="d-lg-flex mb-3">
                    <h4>Contact Number:</h4>
                    <h4 class="ml-lg-2 font-weight-bold text-body-1 primary--text">{{ user.contact_number }}</h4>
                </div>

                <div class="d-lg-flex mb-3">
                    <h4>Email:</h4>
                    <h4 class="ml-lg-2 font-weight-bold primary--text">{{ user.email }}</h4>
                </div>

                <div class="d-lg-flex mb-3">
                    <h4>Role:</h4>
                    <h4 class="ml-lg-2 font-weight-bold primary--text text-capitalize">{{ user.classification.name }}</h4>
                </div>
                <div class="d-lg-flex mb-3">
                    <h4>Vaccination Status:</h4>
                    <h4 class="ml-lg-2 font-weight-bold primary--text text-capitalize">{{ user.vaccination_status }}</h4>
                </div>

                <v-divider class="mt-8"></v-divider>
                <div class="mb-6 mt-6">
                    <h3 class="gray--text mb-2">Change Security Password</h3>
                </div>

                <div>
                    <v-card color="transparent" flat width="320">
                        <v-alert :value="success" dense text type="success">
                            {{ message }}
                        </v-alert>
                        <v-text-field outlined label="Current Password" :hide-details="!message.current_password"
                            :error-messages="message.current_password" type="password" dense filled
                            v-model="setPassword.current_password"></v-text-field>
                        <v-text-field outlined label="New Password" type="password" dense filled
                            :hide-details="!message.password" :error-messages="message.password"
                            v-model="setPassword.password" class="mt-2"></v-text-field>
                        <v-text-field outlined label="Confirm New Password" type="password" dense filled
                            :error="message.password" class="mt-2"
                            v-model="setPassword.password_confirmation"></v-text-field>

                        <div class="mt-n2">
                            <v-btn class="primary text-capitalize px-8 py-4" @click="changePassword" :loading="loading">
                                <h5>Change Password</h5>
                            </v-btn>
                        </div>
                    </v-card>
                </div>

                <v-divider class="mt-8"></v-divider>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Dialog from './EditProfileDialog.vue'
export default {
    components: { Dialog },
    computed: {
        ...mapState({
            user: state => state.user.credentials.data,
            error: state => state.user.password.error,
            success: state => state.user.password.success,
            loading: state => state.user.password.loading,
            message: state => state.user.password.message,
            editMessage: state => state.user.updateProfile.message,
            editError: state => state.user.updateProfile.error,
            editSuccess: state => state.user.updateProfile.success
        })
    },
    data() {
        return {
            setPassword: {
                password: "",
                password_confirmation: "",
                current_password: ""
            },
            BaseImage: process.env.VUE_APP_IMAGE_URL
        }
    },
    methods: {
        openDialog() {
            this.$store.state.user.updateProfile.dialog = true
        },
        changePassword() {
            this.$store.dispatch('user/changePassword', this.setPassword)
        }
    }
}
</script>

<style scoped>
.bg {
    background-color: #f8f0f0;
}

.adj {
    width: 280px;
}</style>