<template>
  <v-app>
    <v-main class="primary">
      <v-container v-if="faceLoading">
        <v-card width="800" class="rounded-lg elevation-6 accent mx-auto my-auto">
          <v-card-title class="primary--text">
            <h3>Create Account</h3>
          </v-card-title>

          <h5 class="mx-4 mb-2 secondary--text">* User Registration.</h5>
          <div class="text-center mt-16  pb-16">
            <h2 class="mt-16 mb-8">Loading Please Wait ....</h2>
            <v-progress-circular :size="$vuetify.breakpoint.mobile ? 60 : 70" :width="10" color="primary"
              indeterminate></v-progress-circular>
          </div>
        </v-card>
      </v-container>

      <v-container v-else>
        <v-card class="rounded-lg elevation-6 accent mx-auto my-auto" width="800">
          <v-card-title class="primary--text">
            <h3>Create Account</h3>
          </v-card-title>
          <h5 class="mx-4 mb-2 secondary--text">* User Registration.</h5>
          <v-divider></v-divider>
          <div class="mx-4 mx-lg-12 mt-6">
            <h4 class="mb-2">Personal Information</h4>

            <v-row dense>
              <v-col cols="12" lg="4"><v-text-field label="First Name" hide-details="auto" filled dense outlined
                  :error-messages="message.first_name" v-model="clinic.first_name"></v-text-field></v-col>
              <v-col cols="12" lg="4"><v-text-field label="Middle Name" hide-details="auto" filled dense outlined
                  :error-messages="message.middle_name" v-model="clinic.middle_name"></v-text-field></v-col>
              <v-col cols="12" lg="4"><v-text-field label="Last Name" hide-details="auto" filled dense outlined
                  :error-messages="message.last_name" v-model="clinic.last_name"></v-text-field></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" lg="6"><v-text-field label="Department" hide-details="auto"
                  :error-messages="message.department" v-model="clinic.department" filled dense
                  outlined></v-text-field></v-col>
              <v-col cols="12" lg="3"> <v-select class="text-capitalize"
                  :items="[{ name: `student`, id: 1 }, { name: `employee`, id: 2 }, { name: `visitor`, id: 3 }]"
                  item-text="name" item-value="id" hide-details="auto" :error-messages="message.classification_id"
                  v-model="clinic.classification_id" outlined dense filled label="Classification" />
              </v-col>
              <v-col cols="12" lg="3"> <v-select :items="['Male', 'Female']" v-model="clinic.gender" outlined dense filled
                  hide-details="auto" :error-messages="message.gender" label="Gender" />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" lg="5"><v-text-field label="Address" filled dense outlined hide-details="auto"
                  :error-messages="message.address" v-model="clinic.address"></v-text-field></v-col>
              <v-col cols="12" lg="7"> <v-select :items="['Partially Vaccinated', 'Fully Vaccinated', 'Booster']"
                  v-model="clinic.vaccination_status" hide-details="auto" :error-messages="message.vaccination_status"
                  outlined dense filled label="Vaccination Status" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" lg="6"><v-text-field type="number" label="Contact Number" filled dense outlined
                  hide-details="auto" :error-messages="message.contact_number"
                  v-model="clinic.contact_number"></v-text-field></v-col>
              <v-col cols="12" lg="6"><v-text-field label="Email" filled dense outlined v-model="clinic.email"
                  hide-details="auto" :error-messages="message.email"></v-text-field></v-col>
            </v-row>

            <h4 class="mt-6">Upload Face Image</h4>
            <h5 class="secondary--text mb-2">*This is for face recognition</h5>
            <v-row dense>
              <v-col> <v-file-input accept="image/*" :loading="loading_1" @change="handleImage" v-model="clinic.upload_1"
                  :prepend-icon="false" prepend-inner-icon="image" outlined dense filled placeholder="Upload 1"
                  hide-details="auto" :error-messages="message.upload_1"></v-file-input>
              </v-col>
              <v-col>
                <v-file-input accept="image/*" :loading="loading_2" :prepend-icon="false" @change="handleImage2"
                  prepend-inner-icon="image" v-model="clinic.upload_2" outlined dense filled placeholder="Upload 2"
                  hide-details="auto" :error-messages="message.upload_2"></v-file-input>
              </v-col>
            </v-row>

            <h4 class="mt-6 mb-2">Security Information</h4>
            <v-row dense>
              <v-col cols="12" lg="6"><v-text-field label="Username" filled dense outlined prepend-inner-icon="person"
                  :error-messages="message.username" hide-details="auto" v-model="clinic.username"></v-text-field></v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" lg="6"><v-text-field label="Password" filled dense outlined type="password"
                  prepend-inner-icon="vpn_key" hide-details="auto" :error-messages="message.password"
                  v-model="clinic.password"></v-text-field></v-col>
              <v-col cols="12" lg="6"><v-text-field label="Confirm Password" filled dense outlined type="password"
                  prepend-inner-icon="vpn_key" hide-details="auto" :error="message.password"
                  v-model="clinic.password_confirmation"></v-text-field></v-col>
            </v-row>
            <v-snackbar color="error" v-model="snackBar1" bottom right>
              <v-icon class="mr-2">error</v-icon> No Face was Detected
            </v-snackbar>
            <v-snackbar color="error" v-model="snackBar2" bottom right>
              <v-icon class="mr-2">error</v-icon> No Face was Detected
            </v-snackbar>

            <div class="mt-6 pb-2" v-if="$vuetify.breakpoint.mobile">
              <v-btn color="primary" @click="submit" :loading="loading" :block="$vuetify.breakpoint.mobile"
                class="pa-5 px-4 mr-8 mb-1 text-capitalize">Create
                Account</v-btn>

              <v-btn text plain to="/" :block="$vuetify.breakpoint.mobile" class="text-capitalize">Cancel</v-btn>
            </div>
            <v-card-actions class="mt-6" v-else>
              <v-spacer></v-spacer>
              <v-btn text plain to="/" :block="$vuetify.breakpoint.mobile" class="text-capitalize">Cancel</v-btn>

              <v-btn color="primary" @click="submit" :loading="loading" :block="$vuetify.breakpoint.mobile"
                class="pa-5 px-4 text-capitalize">Create
                Account</v-btn>

            </v-card-actions>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
import { mapState } from 'vuex';
import * as faceapi from 'face-api.js'

export default {
  mounted() {
    const run = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights')
      await faceapi.nets.faceRecognitionNet.loadFromUri('/weights')
      await faceapi.nets.tinyFaceDetector.loadFromUri('/weights')
      console.log(faceapi.nets);
      this.faceLoading = false
    }

    run()
  },
  computed: {
    ...mapState({
      loading: state => state.register.submit.loading,
      error: state => state.register.submit.error,
      message: state => state.register.submit.message
    })
  },
  data() {
    return {
      faceLoading: true,
      snackBar1: false,
      snackBar2: false,
      loading_1: false,
      loading_2: false,
      error_1: false,
      error_2: false,
      clinic: {
        first_name: "",
        middle_name: "",
        last_name: "",
        address: "",
        deparment: "",
        gender: "",
        contact_number: "",
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        vaccination_status: "",
        classification_id: "",
        upload_1: null,
        upload_2: null
      }
    }
  },
  methods: {
    async submit() {
      const fd = new FormData()

      fd.append('first_name', this.clinic.first_name)
      fd.append('middle_name', this.clinic.middle_name)
      fd.append('last_name', this.clinic.last_name)
      fd.append('vaccination_status', this.clinic.vaccination_status)
      fd.append('gender', this.clinic.gender)
      fd.append('address', this.clinic.address)
      fd.append('email', this.clinic.email)
      fd.append('department', this.clinic.department)
      fd.append('contact_number', this.clinic.contact_number)
      fd.append('classification_id', this.clinic.classification_id)
      fd.append('username', this.clinic.username)
      fd.append('password', this.clinic.password)
      fd.append('password_confirmation', this.clinic.password_confirmation)
      fd.append('upload_1', this.clinic.upload_1)
      fd.append('upload_2', this.clinic.upload_2)

      const res = await this.$store.dispatch('register/createUser', fd)

      if (res) {
        this.clinic.first_name = ""
        this.clinic.middle_name = ""
        this.clinic.last_name = ""
        this.clinic.vaccination_status = ""
        this.clinic.gender = ""
        this.clinic.address = ""
        this.clinic.email = ""
        this.clinic.department = ""
        this.clinic.contact_number = ""
        this.clinic.classification_id = ""
        this.clinic.username = ""
        this.clinic.password = ""
        this.clinic.password_confirmation = ""
        this.clinic.upload_1 = ""
        this.clinic.upload_2 = ""

        this.$router.push('/')
      }

    },
    async handleImage(e) {
      console.log('e', e)

      this.loading_1 = true
      const image = await faceapi.bufferToImage(e)
      const result = await faceapi.detectSingleFace(image)

      if (!result) {
        this.clinic.upload_1 = ""
        this.snackBar1 = true
        this.loading_1 = false
      }

      this.loading_1 = false
      console.log('result', result);
    },
    async handleImage2(e) {
      console.log('e', e)

      this.loading_2 = true
      const image = await faceapi.bufferToImage(e)
      const result = await faceapi.detectSingleFace(image)

      if (!result) {
        this.clinic.upload_2 = ""
        this.snackBar2 = true
        this.loading_2 = false
      }

      this.loading_2 = false
      console.log('result', result);
    }

  }
};
</script>
  