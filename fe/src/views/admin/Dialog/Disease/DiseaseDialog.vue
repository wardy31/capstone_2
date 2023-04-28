<template>
  <v-dialog :value="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card color="accent text-capitalize">
      <v-toolbar color="primary">
        <v-btn @click="handleDialog" icon large color="accent"
          ><v-icon>close</v-icon></v-btn
        >
        <v-toolbar-title class="accent--text font-weight-bold"
          >Add Disease Classification</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <h2 class="font-weight-regular mb-4 mt-4">Disease Details</h2>

        <v-row dense>
          <v-col sm="5">
            <v-text-field
              filled
              outlined
              :error-messages="error.name?.length ? error.name : false"
              label="Disease Name"
              v-model="name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense class="mt-n2">
          <v-col md="2">
            <v-btn
              color="primary"
              block
              :loading="loading"
              class="px-12 py-5 text-capitalize font-weight-bold"
              @click="submit()"
              >Add Disease</v-btn
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
  props: ['dialog'],
  computed: {
    ...mapState({
      loading: (state) => state.disease.store.loading,
      error: (state) => state.disease.store.error,
      message: (state) => state.staff.submit.message,
    }),
  },
  data() {
    return {
        name:""
    };
  },
  methods: {
    async submit() {
      const res = await this.$store.dispatch("disease/store", {name:this.name});
      console.log(res);
      if(res){
        this.name = ""
        this.$emit('handleDialog')        
        this.$emit('snackBar')
      }
    },
    async handleDialog() {
     this.$emit('handleDialog')
    },
  },
};
</script>
