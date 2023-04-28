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

        <v-checkbox v-model="selected" label="Fever (lagnat)" value="Fever"></v-checkbox>
        <v-checkbox v-model="selected" label="Cough and/or Cold" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="Sore Throat" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="Body Pains" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="Sore Throat" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="Loss of Taste" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="Loss of Smell" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="Vomiting" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="Loss of Smell" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="Difficulty of Breathing" value="Jacob" class="mt-n4"></v-checkbox>
        <v-checkbox v-model="selected" label="No Symptoms" class="mt-n4" value="Fever"></v-checkbox>


                <!-- <v-select
                    :items="['Im Well, No Symptoms','I Have Symptoms']"
                    v-model="followUpData.status"
                    outlined filled
                ></v-select>  -->
      </v-card-text>
      <v-card-actions class="mt-n6">
        <v-spacer></v-spacer>
        <v-btn text plain class="text-capitalize" @click="handleClose"
          >cancel</v-btn
        >
        <v-btn
          color="primary"
          class="text-capitalize"
          @click="submit"
          :loading="loading"
          >Submit</v-btn
        >
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
    };
  },
  methods: {
    handleClose() {
      this.$store.state.followUps.all.dialog = false;
    },
    submit() {
      this.$store.dispatch("followUps/followUp", this.followUpData);
    },
  },
};
</script>
