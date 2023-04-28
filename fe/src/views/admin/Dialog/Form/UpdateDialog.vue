<template>
  <v-dialog :value="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card color="accent text-capitalize">
      <v-toolbar color="primary">
        <v-btn @click="handleDialog" icon large color="accent"
          ><v-icon>close</v-icon></v-btn
        >
        <v-toolbar-title class="accent--text font-weight-bold"
          >Update Form</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <v-card width="420" flat color="transparent">
          <div class="d-flex align-center justify-space-between">
            <h2 class="font-weight-regular mb-4 mt-4">Question Details</h2>
            <v-btn
              color="primary"
              class="px-6 py-5 text-capitalize font-weight-bold"
              small
              text
              @click="addRow()"
            >
              <v-icon>add</v-icon>
              Add Sub Row
            </v-btn>
          </div>

          <v-row dense>
            <v-text-field
              filled
              outlined
              :error-messages="error.question?.length ? error.question : false"
              label="Question Name"
              v-model="question"
            ></v-text-field>
            
            <div v-show="sub_question.split(',').length">
            <div v-for="(subs, index) in arraySub" :key="index">
              <div class="d-flex">
                <v-text-field
                  filled
                  outlined
                  label="Sub List Name"
                  v-model="arraySub[index]"
                ></v-text-field>

                <v-btn
                  class="mt-2 ml-2 text-capitalize"
                  color="error"
                  icon
                  @click="removeSub(index)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          </v-row>
          <v-row dense class="mt-n2">
            <v-col md="2">
              <v-btn
                color="primary"
                block
                :loading="loading"
                class="px-12 py-5 text-capitalize font-weight-bold"
                @click="submit()"
                >Update Form</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["dialog", "updateData"],
  computed: {
    ...mapState({
      loading: (state) => state.questions.update.loading,
      error: (state) => state.questions.update.error,
    }),
  },
  watch: {
    updateData() {
      if (this.updateData) {
        console.log(this.updateData);
        this.id = this.updateData.id
        this.question = this.updateData["question"];
        // this.sub_question = this.updateData["sub_question"];
        this.arraySub = this.updateData["sub_question"].split(',')
      }
    },
  },
  data() {
    return {
      id: null,
      question: "",
      sub_question: "",
      arraySub:[]
    };
  },
  methods: {
    async submit() {
      const subTrim = this.arraySub.filter((e) => e.trim() != "");
      const res = await this.$store.dispatch("questions/update", {
        id:this.id,
        question: this.question,
        sub_question: subTrim.join(),
      });
      if (res) {
        this.question = "";
        this.sub_question = "";
        this.id = null;
        this.$emit("handleDialog");
        this.$emit("snackBar");
        this.$emit("handleUpdateData");
      }
    },
    async handleDialog() {
      this.$emit("handleDialog");
      this.$emit("handleUpdateData");
    },
    removeSub(data) {
      const subs = this.arraySub;
      const filter = subs.filter((e, index) => {
        return index != data;
      });

      this.arraySub = filter;
    },
    async addRow() {
      this.arraySub.push("");
    },
  },
};
</script>
