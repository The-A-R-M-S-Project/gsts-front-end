<template>
  <div style="height: 100vh;">
    <Navigation />
    <v-container class="d-none d-md-flex">
      <PrincipalSchoolSelect />
    </v-container>
    <v-container class="hidden-md-and-up">
      <PrincipalSchoolSelectMobile />
    </v-container>
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
import PrincipalSchoolSelect from "@/components/PrincipalSchoolSelect.vue";
import PrincipalSchoolSelectMobile from "@/components/PrincipalSchoolSelectMobile.vue";
export default {
  name: "principal-dashboard",
  components: {
    Navigation,
    PrincipalSchoolSelect,
    PrincipalSchoolSelectMobile,
  },
};
</script>
