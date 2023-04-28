<template>
  <v-dialog :value="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card color="accent text-capitalize">
      <v-toolbar color="primary">
        <v-btn @click="handleDialog" icon large color="accent"
          ><v-icon>close</v-icon></v-btn
        >
        <v-toolbar-title class="accent--text font-weight-bold"
          >Add Question</v-toolbar-title
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

          <v-text-field
            filled
            outlined
            :error-messages="error.question?.length ? error.question : false"
            label="Question Name"
            v-model="name"
          ></v-text-field>

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

          <v-btn
            color="primary"
            :loading="loading"
            class="px-12 py-5 text-capitalize font-weight-bold"
            @click="submit()"
            >Add Question</v-btn
          >
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["dialog"],
  computed: {
    ...mapState({
      loading: (state) => state.questions.store.loading,
      error: (state) => state.questions.store.error,
      message: (state) => state.staff.submit.message,
    }),
  },
  data() {
    return {
      name: "",
      arraySub: [],
    };
  },
  methods: {
    async submit() {
      const subTrim = this.arraySub.filter((e) => e.trim() != "");
      const res = await this.$store.dispatch("questions/store", {
        question: this.name,
        sub_question: subTrim.join(),
      });
      console.log(res);
      if (res) {
        this.name = "";
        this.$emit("handleDialog");
        this.$emit("snackBar");
        this.arraySub = [];
      }
    },
    removeSub(data) {
      const subs = this.arraySub;
      const filter = subs.filter((e, index) => {
        return index != data;
      });

      this.arraySub = filter;
    },
    async handleDialog() {
      this.$emit("handleDialog");
      this.name = "";
      this.arraySub = [];
    },
    async addRow() {
      this.arraySub.push("");
    },
  },
};
</script>
