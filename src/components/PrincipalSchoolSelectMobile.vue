 <template>
  <v-row align="center" justify="center">
    <div class="text-center">
      <h1 class="sub-heading">Welcome to the Principal's dashboard!</h1>
      <h3 class="button-text">Please select a school below</h3>
    </div>
    <v-col md="6" class="px-5 pb-0">
      <v-card
        class="mx-auto school-card"
        color="grey lighten-4"
        max-width="900"
        @click="getSelectedSchool(
                                        schoolDetails.engineering.name
                                    )"
      >
        <v-img
          :src="
                                    getImageURL(schoolDetails.engineering.image)
                                "
          class="school-card"
        >
          <div class="yellow darken-1 v-card--reveal black--text text-center" style="height: 100%;">
            <div
              class="heading font-weight-bold vertical-center"
            >{{ schoolDetails.engineering.name }}</div>
            <v-btn absolute class="white--text floating-btn" text right bottom :loading="loader">
              <v-icon light large color="black">mdi-desktop-mac-dashboard</v-icon>
            </v-btn>
          </div>
        </v-img>
      </v-card>
    </v-col>
    <v-col md="6" class="px-5 pt-0">
      <v-row no-gutters>
        <v-col>
          <v-card
            class="mx-auto school-card"
            color="grey lighten-4"
            max-width="900"
            @click="
                                            getSelectedSchool(
                                                schoolDetails.builtEnvironment
                                                    .name
                                            )
                                        "
          >
            <v-img
              :src="
                                            getImageURL(
                                                schoolDetails.builtEnvironment
                                                    .image
                                            )
                                        "
              class="school-card"
            >
              <div
                class="yellow darken-2 v-card--reveal black--text text-center"
                style="height: 100%;"
              >
                <div class="heading font-weight-bold vertical-center">
                  {{
                  schoolDetails
                  .builtEnvironment.name
                  }}
                </div>
                <v-btn
                  absolute
                  class="white--text floating-btn"
                  text
                  right
                  bottom
                  :loading="loader"
                >
                  <v-icon large color="black">mdi-desktop-mac-dashboard</v-icon>
                </v-btn>
              </div>
            </v-img>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="mx-auto school-card"
            color="grey lighten-4"
            max-width="900"
            @click="
                                            getSelectedSchool(
                                                schoolDetails.fineArt.name
                                            )
                                        "
          >
            <v-img
              :src="
                                            getImageURL(
                                                schoolDetails.fineArt.image
                                            )
                                        "
              class="school-card"
            >
              <div
                class="yellow darken-2 v-card--reveal black--text text-center"
                style="height: 100%;"
              >
                <div
                  class="heading font-weight-bold vertical-center"
                >{{ schoolDetails.fineArt.name }}</div>
                <v-btn
                  absolute
                  class="white--text floating-btn"
                  text
                  right
                  bottom
                  :loading="loader"
                >
                  <v-icon large color="black">mdi-desktop-mac-dashboard</v-icon>
                </v-btn>
              </div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "principal-school-select",
  data() {
    return {
      schoolDetails: {
        engineering: {
          name: "School of Engineering",
          image: "ece.jpg",
          route: "/ECE-dashboard"
        },
        builtEnvironment: {
          name: "School of Built Environment",
          image: "BE.jpg",
          route: "/BE-dashboard"
        },
        fineArt: {
          name: "School of Industrial and Fine Arts",
          image: "FA.jpg",
          route: "/FA-dashboard"
        }
      }
    };
  },
  mounted() {
    this.$store.dispatch("fetchSchools");
  },
  computed: {
    schools() {
      return this.$store.getters.schools;
    },
    loader() {
      return this.$store.getters.loader;
    },
    fetchDashboardStatsError() {
      return this.$store.getters.fetchDashboardStatsError;
    }
  },
  methods: {
    getImageURL(imageName) {
      return require(`../assets/principal/${imageName}`);
    },
    getSelectedSchool(schoolName) {
      if (this.schools) {
        let selectedSchool = this.schools.find(school => {
          return school.name == schoolName;
        });

        let selectedSchoolDetails = Object.values(this.schoolDetails).find(
          school => {
            return school.name == schoolName;
          }
        );
        this.$store
          .dispatch("fetchDashboardStats", selectedSchool._id)
          .then(() => {
            this.$router.push(selectedSchoolDetails.route);
          });
      }
    }
  }
};
</script>

<style scoped>
.mx-auto {
  margin: 20px;
  min-width: 250px;
}
.school-card {
  height: 15rem !important;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.6;
  position: absolute;
  width: 100%;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>