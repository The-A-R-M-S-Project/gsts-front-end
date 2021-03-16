 <template>
  <div>
    <div class="text-center">
      <h1>Welcome to the Principal's dashboard!</h1>
      <h3>Please select a school below</h3>
    </div>
    <v-row align="center" justify="center">
      <v-col md="6" class="px-5">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            max-width="900"
            @click="getSelectedSchool(schoolDetails.engineering.name)"
            height="560"
          >
            <v-img
              :src="getImageURL(schoolDetails.engineering.image)"
              height="560"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                  style="height: 100%"
                >
                  <div>{{ schoolDetails.engineering.name }}</div>
                  <v-btn
                    absolute
                    class="white--text floating-btn"
                    text
                    right
                    bottom
                    :loading="loader"
                  >
                    <v-icon light large color="black"
                      >mdi-desktop-mac-dashboard</v-icon
                    >
                  </v-btn>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
      <v-col md="6" class="px-5">
        <v-row no-gutters>
          <v-col>
            <v-hover v-slot:default="{ hover }">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="900"
                height="230"
                @click="getSelectedSchool(schoolDetails.builtEnvironment.name)"
              >
                <v-img
                  :src="getImageURL(schoolDetails.builtEnvironment.image)"
                  height="230"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                      style="height: 100%"
                    >
                      <div>
                        {{ schoolDetails.builtEnvironment.name }}
                      </div>
                      <v-btn
                        absolute
                        class="white--text floating-btn"
                        text
                        right
                        bottom
                        :loading="loader"
                      >
                        <v-icon large color="black"
                          >mdi-desktop-mac-dashboard</v-icon
                        >
                      </v-btn>
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
          <v-col>
            <v-hover v-slot:default="{ hover }">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="900"
                height="280"
                @click="getSelectedSchool(schoolDetails.fineArt.name)"
              >
                <v-img
                  :src="getImageURL(schoolDetails.fineArt.image)"
                  height="280"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                      style="height: 100%"
                    >
                      <div>{{ schoolDetails.fineArt.name }}</div>
                      <v-btn
                        absolute
                        class="white--text floating-btn"
                        text
                        right
                        bottom
                        :loading="loader"
                      >
                        <v-icon large color="black"
                          >mdi-desktop-mac-dashboard</v-icon
                        >
                      </v-btn>
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "principal-school-select",
  data() {
    return {
      schoolDetails: {
        engineering: {
          name: "School of Engineering",
          image: "ece.jpg",
          route: "/ECE-dashboard",
        },
        builtEnvironment: {
          name: "School of Built Environment",
          image: "BE.jpg",
          route: "/BE-dashboard",
        },
        fineArt: {
          name: "School of Industrial and Fine Arts",
          image: "FA.jpg",
          route: "/FA-dashboard",
        },
      },
    };
  },
  async created() {
    await this.$store.dispatch("fetchSchools");
  },
  computed: {
    ...mapGetters(["schools", "loader", "fetchDashboardStatsError"]),
  },
  methods: {
    getImageURL(imageName) {
      return require(`../assets/principal/${imageName}`);
    },
    async getSelectedSchool(schoolName) {
      if (this.schools) {
        let selectedSchool = this.schools.find((school) => {
          return school.name == schoolName;
        });

        let selectedSchoolDetails = Object.values(this.schoolDetails).find(
          (school) => {
            return school.name == schoolName;
          }
        );
        await this.$store.dispatch("fetchDashboardStats", selectedSchool._id);
        this.$router.push(selectedSchoolDetails.route);
      }
    },
  },
};
</script>

<style scoped>
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