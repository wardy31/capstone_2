<template>
  <v-app>
    <v-main class="bg">
      <v-app-bar color="transparent" flat class="mb-8">
        <div class="primary--text font-weight-bold size">Unitrace</div>
      </v-app-bar>

      <v-container>
        <div class="">
          <v-row v-if="isMobile">
            <v-col cols="12">
              <div class="text-center mt-12">
                <v-img src="../assets/download.png" class="rounded-lg" contain max-height="380"></v-img>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="mt-16">
                <h1 class="primary--text">Download The App</h1>
                <h6 class="secondary--text">University Contact Tracing</h6>

                <div class="mt-6">
                  <div class="text-justify textSize">
                    Downloading the unitrace app is a simple yet powerful way to contribute to the university to
                    slow the spread of infectious diseases. By taking just a few minutes to download and set up the app,
                    you can help protect yourself, your loved ones, and your community.
                  </div>

                  <div class="mt-5">
                    <v-btn color="primary" :loading="downloadLoading" href="https://node.lnucontacttracing.online/api/download" class="font-weight-bold text-capitalize py-5">
                      <v-icon class="mr-2">cloud_download</v-icon>
                      Download App
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="6">
              <div class="mt-16">
                <h1 class="primary--text">Download The App</h1>
                <h5 class="secondary--text">Leyte Normal University Contact Tracing</h5>

                <div class="mt-6">
                  <div class="text-justify textSize">
                    Downloading the unitrace app is a simple yet powerful way to contribute to the university to
                    slow the spread of infectious diseases. By taking just a few minutes to download and set up the app,
                    you can help protect yourself, your loved ones, and your community.
                  </div>

                  <div class="mt-5">
                    <v-btn color="primary" :loading="downloadLoading" href="https://node.lnucontacttracing.online/api/download" large class="font-weight-bold text-capitalize">
                      <v-icon class="mr-2">cloud_download</v-icon>
                      Download App
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="6">
              <v-img src="../assets/download.png" class="rounded-lg ml-12" contain max-height="410"></v-img>
            </v-col>
          </v-row>
        </div>
      </v-container>
      <!-- <div class="view2" id="system">
        <v-container>
          <div class="text-center mt-12">
            <h2 class="white--text">Software Requirements</h2>

            <div class="white--text mt-8">Android must be at least API26</div>
            <div class="white--text mt-2">Camera atleast 480p Quality</div>
            <div class="white--text mt-2">Android</div>
          </div>
        </v-container>
      </div> -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({ isMobile: false,downloadLoading:false,nodeUrl:process.env.VUE_APP_NODE }),

  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },

  mounted() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
};
</script>

<style>
* {
  scroll-behavior: smooth;
}

.bg {
  /* background-color: #141e61; */
  background-color: whitesmoke;
}

.size {
  font-size: 22px;
}

.textSize {
  font-size: 17px;
}

.viewH {
  height: 100vh;
}

.view2 {
  background-color: #141e61;
  height: 100vh;
}
</style>
