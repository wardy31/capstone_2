<template>
  <v-dialog :value="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card color="accent text-capitalize">
      <v-toolbar color="primary">
        <v-btn @click="handleDialog" icon large color="accent"
          ><v-icon>close</v-icon></v-btn
        >
        <v-toolbar-title class="accent--text font-weight-bold"
          >Update Disease Classification</v-toolbar-title
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
              >Update Disease</v-btn
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
  props: ['dialog','updateData'],
  computed: {
    ...mapState({
      loading: (state) => state.disease.update.loading,
      error: (state) => state.disease.update.error,
    }),
  },
  watch:{
    updateData(){
      if(this.updateData){
        this.name = this.updateData['name']
        this.id = this.updateData['id']
      }
    }
  },
  data() {
    return {
        id:null,
        name:""
    };
  },
  methods: {
    async submit() {
      const res = await this.$store.dispatch("disease/update", {id:this.id,name:this.name});
      if(res){
        this.name = ""
        this.id = null
        this.$emit('handleDialog')        
        this.$emit('snackBar')
        this.$emit('handleUpdateData')
      }
    },
    async handleDialog() {
     this.$emit('handleDialog')
    },
  },
};
</script>
