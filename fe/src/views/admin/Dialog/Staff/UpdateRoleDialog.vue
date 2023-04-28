<template>
  <v-dialog v-model="dialog" width="auto" persistent>
    <v-card>
      <v-card-title class="primary accent--text font-weight-bold mb-6"
        >Change Role Status</v-card-title
      >
      <v-card-text>
        <v-select
          :items="roleData"
          v-model="roles.role_id"
          label="Role"
          item-text="name"
          item-value="id"
          filled
          outlined
        ></v-select>
        
      </v-card-text>
      <v-card-actions class="mt-n8">
        <v-spacer></v-spacer>
        <v-btn color="black" text plain class="text-capitalize px-5" @click="cancel()">Cancel</v-btn>
        <v-btn color="primary" :loading="loading" class="text-capitalize px-5" @click="changeRole">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("clinic/getRole");
  },
  props: ["role"],
  computed: {
    ...mapState({
      roleData: (state) => state.clinic.role,
      loading: (state) => state.staff.role.loading,
      dialog: (state) => state.staff.role.dialog,
    }),
  },
  data() {
    return {
      roles: {
        id: this.role.id,
        role_id: this.role.role_id,
      },
    };
  },
  methods:{
    changeRole(){
        this.$store.dispatch("staff/changeRole",this.roles);
    },
    cancel(){
        this.$emit('reset')
        this.roles.id = null
        this.roles.role_id = null
        this.$store.state.staff.role.dialog = false
    }
  }
};
</script>
