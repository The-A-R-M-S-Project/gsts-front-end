<template>
  <v-footer padless color="purple" class="font-weight-medium">
    <v-card class="flex" flat tile>
      <v-card-title class="purple lighten-1">
        <v-row>
          <v-col cols="12" md="4">
            <span class="footer-text white--text">
              GSTS (Graduate Student Tracking System) is platform for tracking Masters students' reports.
              This platform is run by CEDAT (College of Engineering, Design, Art and Technology), Makerere University.
            </span>
          </v-col>
          <v-col cols="12" md="4">
            <v-row align="start" justify="center">
              <v-btn text target="_blank" href="https://www.mak.ac.ug/" dark>Makerere University</v-btn>
            </v-row>
            <v-row align="start" justify="center">
              <v-btn text target="_blank" href="https://cedat.mak.ac.ug/" dark>CEDAT</v-btn>
            </v-row>
            <v-row align="start" justify="center">
              <v-btn text target="_blank" href="https://intranet.mak.ac.ug/" dark>Intranet</v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row align="start" justify="center">
              <v-col cols="12">
                <div class="text-center footer-text white--text">
                  <div>CEDAT building annex</div>
                  <div>Makerere University</div>
                  <div>
                    <v-icon dark class="pr-2">mdi-phone</v-icon>Phone: 0414 238 2938
                  </div>
                  <div>
                    <v-icon dark class="pr-2">mdi-email</v-icon>Email:
                    <strong>gsts@cedat.mak.ac.ug</strong>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-row>
            <v-col cols="12">
              <v-divider dark class="mx-auto"></v-divider>
              <div class="footer-text mt-2 text-center white--text">Follow us</div>
              <div class="text-center">
                <v-btn
                  v-for="icon in icons"
                  :key="icon.name"
                  :href="icon.link"
                  class="mx-2 text-center"
                  dark
                  icon
                  target="_blank"
                >
                  <v-icon size="24px">{{ icon.name }}</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-row>
      </v-card-title>

      <v-card-text class="purple py-4 white--text text-center">
        Copyright &copy; {{ new Date().getFullYear() }} -
        <strong>Makerere University | GSTS (Graduate Student Tracking System)</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "gsts-footer",
  data() {
    return {
      icons: [
        { name: "mdi-facebook", link: "https://www.facebook.com/Makerere" },
        { name: "mdi-twitter", link: "https://twitter.com/MakerereU" },
        {
          name: "mdi-linkedin",
          link: "https://www.linkedin.com/school/makerere/",
        },
        { name: "mdi-google-plus", link: "https://google.com/+MakAcUgKampala" },
      ],
    };
  },
};
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal !important;
  line-height: 1.2rem;
}
.footer-text {
  font-size: 0.8rem;
}
</style>