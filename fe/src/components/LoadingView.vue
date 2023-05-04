<template>
  <div class="text-center">
    <h2 class="mb-12" v-if="$vuetify.breakpoint.mobile"><b class="primary--text">Loading</b> Please Wait ...</h2>
    <h1 class="mb-12" v-else><b class="primary--text">Loading</b> Please Wait ...</h1>
    <v-progress-circular
      :size="$vuetify.breakpoint.mobile ? 60 : 100"
      :width="10"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>
