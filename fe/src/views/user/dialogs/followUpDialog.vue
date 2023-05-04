<template>
  <v-dialog v-model="dialog" width="auto" @click:outside="handleClose">
    <v-card>
      <v-card-title class="primary accent--text">Follow Up</v-card-title>
      <v-card-text class="mt-3">
        <v-alert type="error" dense text :value="error">
          {{ message }}
        </v-alert>
        <h3 class="black--text mt-3">
          Are you experiencing one (1) or more of the follow symptoms?
        </h3>
        <h3 class="black--text mb-4">
          if not check No Symptoms.
        </h3>

        <div v-for="(status, index) in status" :key="status.id">
          <v-checkbox v-model="resultBox[index]" :label="status.title" :value="status.title"
            @click="handleCheck"></v-checkbox>
        </div>
        <!-- <v-select
                    :items="['Im Well, No Symptoms','I Have Symptoms']"
                    v-model="followUpData.status"
                    outlined filled
                ></v-select>  -->
      </v-card-text>
      <v-card-actions class="mt-n6">
        <v-spacer></v-spacer>
        <v-btn text plain class="text-capitalize" @click="handleClose">cancel</v-btn>
        <v-btn color="primary" class="text-capitalize" @click="submit" :loading="loading">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      loading: (state) => state.followUps.all.loading,
      dialog: (state) => state.followUps.all.dialog,
      error: (state) => state.followUps.all.error,
      message: (state) => state.followUps.all.message,
    }),
  },
  data() {
    return {
      followUpData: {
        status: "",
      },
      resultBox: [],
      status: [
        { id: 1, status: false, title: "Fever(Lagnat)" },
        { id: 2, status: false, title: "Cough and/or Cold" },
        { id: 3, status: false, title: "Sore Throat" },
        { id: 4, status: false, title: "Body Pains" },
        { id: 5, status: false, title: "Loss of Taste" },
        { id: 6, status: false, title: "Loss of Smell" },
        { id: 7, status: false, title: "Vomiting" },
        { id: 8, status: false, title: "Difficulty of Breathing" },
        { id: 9, status: false, title: "No Symptoms" },
      ]
    };
  },
  methods: {
    handleClose() {
      this.$store.state.followUps.all.dialog = false;
    },
    submit() {
      const filter = this.resultBox.filter(f => f)
      this.$store.dispatch("followUps/followUp", {form:filter.join(',')});
    },
  },
};
</script>
 