<template>
  <v-select
    label="Select a school"
    :items="schools"
    item-text="name"
    return-object
    flat
    dense
    :class="{'styled-input': $vuetify.breakpoint.xs}"
    :dark="$vuetify.breakpoint.xs ? false : true"
    :light="$vuetify.breakpoint.xs ? true : false"
    hide-details
    prepend-icon="mdi-desktop-mac-dashboard"
    single-line
    @input="fetchSchoolData"
    v-model="selectedSchool"
  ></v-select>
</template>

<script>
export default {
  name: "select-school-dropdown",
  data() {
    return {
      selectedSchool: null
    };
  },
  mounted() {
    this.$store.dispatch("fetchSchools").then(() => {
      if (this.$route.path == "/ECE-dashboard") {
        this.selectedSchool = this.schools.find(school => {
          return school.name == "School of Engineering";
        });
      } else if (this.$route.path == "/BE-dashboard") {
        this.selectedSchool = this.schools.find(school => {
          return school.name == "School of Built Environment";
        });
      } else if (this.$route.path == "/FA-dashboard") {
        this.selectedSchool = this.schools.find(school => {
          return school.name == "School of Industrial and Fine Arts";
        });
      } else {
        this.selectedSchool = this.schools.find(school => {
          return school._id == this.selectedSchoolID;
        });
      }
    });
  },
  computed: {
    schools() {
      return this.$store.getters.schools;
    },
    selectedSchoolID() {
      return this.$store.getters.selectedSchoolID;
    }
  },
  methods: {
    fetchSchoolData() {
      let route = this.getSchoolRoute(this.selectedSchool);
      this.$store
        .dispatch("fetchDashboardStats", this.selectedSchool._id)
        .then(() => {
          if (this.$route.path !== route) {
            this.$router.push(route);
          }
        });
    },
    getSchoolRoute(school) {
      if (school.name == "School of Engineering") return "/ECE-dashboard";
      else if (school.name == "School of Built Environment")
        return "/BE-dashboard";
      else if (school.name == "School of Industrial and Fine Arts")
        return "/FA-dashboard";
    }
  }
};
</script>
