<template>
  <div style="height: 100vh;">
    <Navigation />
    <v-container class="container">
      <v-row class="schools-row" align="center" justify="start">
        <v-col md="12" v-for="school in schools" :key="school.name">
          <v-hover v-slot:default="{ hover }">
            <v-card class="mx-auto" color="grey lighten-4" max-width="900" height="170">
              <v-img :src="getImageURL(school.image)" height="170">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                    style="height: 100%;"
                  >{{school.name}}</div>
                </v-expand-transition>
              </v-img>
              <v-btn absolute class="white--text floating-btn" text right bottom :to="school.path">
                <v-icon large color="yellow">mdi-desktop-mac-dashboard</v-icon>
              </v-btn>
            </v-card>
          </v-hover>
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
.schools-row {
  height: 80vh;
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
