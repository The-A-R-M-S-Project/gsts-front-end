<template>
  <div style="height: 100vh;">
    <Navigation />
    <v-container class="container">
      <v-row align="center" justify="center">
        <v-col md="6" class="px-5">
          <v-hover v-slot:default="{ hover }">
            <v-card class="mx-auto" color="grey lighten-4" max-width="900" height="625">
              <v-img :src="getImageURL('ece.jpg')" height="625">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                    style="height: 100%;"
                  >School of engineering</div>
                </v-expand-transition>
              </v-img>
              <v-btn
                absolute
                class="white--text floating-btn"
                text
                right
                bottom
                to="/ECE-dashboard"
              >
                <v-icon large color="yellow">mdi-desktop-mac-dashboard</v-icon>
              </v-btn>
            </v-card>
          </v-hover>
        </v-col>
        <v-col md="6" class="px-5">
          <v-row no-gutters>
            <v-col>
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="900" height="255">
                  <v-img :src="getImageURL('BE.jpg')" height="255">
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                        style="height: 100%;"
                      >School of built environment</div>
                    </v-expand-transition>
                  </v-img>
                  <v-btn
                    absolute
                    class="white--text floating-btn"
                    text
                    right
                    bottom
                    to="/BE-dashboard"
                  >
                    <v-icon large color="yellow">mdi-desktop-mac-dashboard</v-icon>
                  </v-btn>
                </v-card>
              </v-hover>
            </v-col>
            <v-col>
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="900" height="330">
                  <v-img :src="getImageURL('FA.jpg')" height="330">
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                        style="height: 100%;"
                      >School of fine art</div>
                    </v-expand-transition>
                  </v-img>
                  <v-btn
                    absolute
                    class="white--text floating-btn"
                    text
                    right
                    bottom
                    to="/FA-dashboard"
                  >
                    <v-icon large color="yellow">mdi-desktop-mac-dashboard</v-icon>
                  </v-btn>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
export default {
  name: "principal-dashboard",
  data() {
    return {
      schools: [
        {
          name: "School of engineering",
          image: "ece.jpg",
          path: "/ECE-dashboard"
        },
        {
          name: "School of built environment",
          image: "BE.jpg",
          path: "/BE-dashboard"
        },
        {
          name: "School of fine art",
          image: "FA.jpg",
          path: "/FA-dashboard"
        }
      ]
    };
  },
  methods: {
    getImageURL(imageName) {
      return require(`../assets/principal/${imageName}`);
    }
  },
  components: {
    Navigation
  }
};
</script>
<style lang="scss" scoped>
.mx-auto {
  margin: 20px;
  min-width: 250px;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.6;
  position: absolute;
  width: 100%;
}
</style>
