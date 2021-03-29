<template>
  <nav>
    <v-toolbar color="purple" class="white--text">
      <v-toolbar-title
        class="white--text font-weight-bold text-capitalize title d-sm-none d-md-flex"
        >GSTS</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        text
        dark
        :loading="isLoading"
        class="text-capitalize"
        @click="logOut"
      >
        <v-icon>mdi-power</v-icon>
        <span>&nbsp;Sign out</span>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DeanSecretaryNavbar",
  async created() {
    await this.$store.dispatch("fetchLoggedInStaff");
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  methods: {
    async logOut() {
      this.closeOnContentClick = false;
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
