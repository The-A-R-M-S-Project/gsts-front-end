<template>
  <div class="mx-auto overflow-hidden">
    <DeanNav class="d-none d-sm-block" />
    <v-app-bar color="purple" class="mobile-drawer d-block d-sm-none" dark>
      <v-toolbar-title>
        <v-btn
          text
          class="normal-text px-0 text-capitalize white--text font-weight-bold"
          href="/dean-dashboard"
        >Dashboard</v-btn>
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
          <v-list-item class="my-6" to="/examiners">
            <v-btn text class="title text-capitalize">
              <v-icon large>mdi-account-group</v-icon>
              <span>&nbsp;Examiners</span>
            </v-btn>
          </v-list-item>
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
        <ExaminersTable />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import DeanNav from "@/components/DeanNav.vue";
import ExaminersTable from "@/components/ExaminersTable.vue";
export default {
  name: "examiners",
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
    DeanNav,
    ExaminersTable,
  },
};
</script>
