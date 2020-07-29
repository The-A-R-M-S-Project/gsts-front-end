<template>
  <div class="mx-auto overflow-hidden">
    <template v-if="user.role === 'principal'">
      <Navigation class="d-none d-sm-block" />
    </template>
    <template v-else-if="user.role === 'dean'">
      <DeanNav class="d-none d-sm-block" />
    </template>
    <v-app-bar color="purple" class="mobile-drawer d-block d-sm-none" dark>
      <v-toolbar-title>
        <template v-if="user.role === 'dean'">
          <v-btn
            text
            class="normal-text px-0 text-capitalize white--text font-weight-bold"
            href="/dean-dashboard"
          >Dashboard</v-btn>
        </template>
        <template v-else-if="user.role === 'principal'">
          <v-btn
            text
            to="/principal-dashboard"
            class="white--text font-weight-bold text-capitalize title px-0"
          >GSTS</v-btn>
        </template>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" class="d-flex d-sm-none" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item class="my-6" to="/under-construction">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account</v-icon>
              <span>&nbsp;Profile</span>
            </v-btn>
          </v-list-item>
          <v-list-item class="my-6" to="/students">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account-group</v-icon>
              <span>&nbsp;Students</span>
            </v-btn>
          </v-list-item>
          <template v-if="user.role === 'dean'">
            <v-list-item class="my-6" to="/examiners">
              <v-btn text class="title text-capitalize">
                <v-icon large>mdi-account-group</v-icon>
                <span>&nbsp;Examiners</span>
              </v-btn>
            </v-list-item>
          </template>
          <template v-else-if="user.role === 'principal'">
            <v-list-item class="my-6 px-8 mobile-select">
              <SelectSchool />
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-list-item class="my-4" @click="logOut">
          <v-btn text :loading="isLoading" class="title text-capitalize">
            <v-icon large>mdi-power</v-icon>
            <span>&nbsp;Sign out</span>
          </v-btn>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-container fluid class="pt-1">
      <v-row class="mx-1">
        <StudentsTable />
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>
<style></style>
<script>
import StudentsTable from "@/components/StudentsTable.vue";
import Navigation from "@/components/Navbar.vue";
import DeanNav from "@/components/DeanNav.vue";
import SelectSchool from "@/components/SelectSchool.vue";
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
    StudentsTable,
    Navigation,
    DeanNav,
    SelectSchool,
    Footer,
  },
};
</script>
