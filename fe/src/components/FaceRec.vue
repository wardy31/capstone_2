<template>
  <v-app>
    <div class="ma-auto">
      <img
        id="class0"
        width="300"
        height="280"
        :src="require('@/assets/obama.jpg')"
        class="mr-8"
      />
      <img
        id="test"
        width="300"
        height="280"
        :src="require('@/assets/refe.jpg')"
      />
    </div>
  </v-app>
</template>

<script>

export default {
  mounted() {
    this.init();
  },
  data() {
    return {};
  },
  methods: {

  },
};
</script>
