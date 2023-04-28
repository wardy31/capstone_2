<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card color="accent text-capitalize">
      <v-toolbar color="primary">
        <v-btn @click="handleDialog" icon large color="accent"
          ><v-icon>close</v-icon></v-btn
        >
        <v-toolbar-title class="accent--text font-weight-bold"
          >Add Station</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <h2 class="font-weight-regular mb-4 mt-4">Station Details</h2>
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
          {{ message }}
        </v-alert>
        <v-row dense>
          <v-col cols="6">
            <v-text-field
              filled
              outlined
              label="Set Location"
              v-model="station.location"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="mt-n4">
          <v-col cols="6">
            <v-select
              outlined
              filled
              :items="[true,false]"
              item-text="name"
              item-value="id"
              v-model="station.required"
              @input="handleRequired"
              label="Contact Trace Required"
            ></v-select>
          </v-col>
        </v-row>
        <v-row dense class="mt-n4">
          <v-col md="2">
            <v-btn
              color="primary"
              block
              :loading="loading"
              class="px-12 py-5 text-capitalize font-weight-bold"
              @click="submit()"
              >Add Station</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  // mounted() {
  //   this.$store.dispatch("clinic/getRole");
  // },
  computed: {
    ...mapState({
     // role: (state) => state.clinic.role,
      loading: (state) => state.station.submit.loading,
      error: (state) => state.station.submit.error,
      message: (state) => state.station.submit.message,
      dialog: (state) => state.station.submit.dialog,
    }),
  },
  data() {
    return {
      station: {
        location: "",
        required:false
      },
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("station/submit", this.station);
    },
    handleDialog() {
      this.$store.state.station.submit.dialog = false;
      this.$store.state.station.submit.error = false;
    },
    handleRequired(data){
      console.log(data);
    }
  },
};
</script>
