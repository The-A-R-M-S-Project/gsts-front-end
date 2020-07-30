<template>
  <div class="mx-auto overflow-hidden">
    <template v-if="user.role === 'principal'">
      <Navigation class="d-none d-sm-block" />
    </template>
    <template v-else-if="user.role === 'dean'">
      <DeanNav class="d-none d-sm-block" />
    </template>
    <MobileDrawer />
    <div>
      <v-row no-gutters>
        <v-col cols="12" lg="9">
          <StudentProgress class="mb-6" />
        </v-col>
        <v-col cols="12" lg="3">
          <StudentsNotifications />
        </v-col>
      </v-row>
    </div>
    <Footer />
  </div>
</template>
<style></style>
<script>
import Navigation from "@/components/Navbar.vue";
import DeanNav from "@/components/DeanNav.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import StudentProgress from "@/components/StudentProgress.vue";
import StudentsNotifications from "@/components/StudentsNotifications.vue";
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      drawer: false,
      loading: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    logOut() {
      this.closeOnContentClick = false;
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  components: {
    Navigation,
    DeanNav,
    MobileDrawer,
    StudentProgress,
    StudentsNotifications,
    Footer,
  },
};
</script>
