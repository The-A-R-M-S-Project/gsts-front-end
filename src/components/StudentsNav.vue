<template>
  <nav>
    <v-toolbar color="purple" class="white--text">
      <v-toolbar-title
        class="white--text font-weight-bold text-capitalize title"
        >GSTS</v-toolbar-title
      >
      <template>
        <v-row justify="end" align="center">
          <v-col md="auto" sm="2">
            <v-btn
              text
              to="report-status"
              class="title text-capitalize white--text"
              >Status</v-btn
            >
          </v-col>
          <v-col md="auto" sm="2">
            <v-btn
              text
              to="submit-report"
              class="title text-capitalize white--text"
              >Report</v-btn
            >
          </v-col>
        </v-row>
      </template>
      <v-col md="auto" sm="2" class="text-right">
        <v-menu
          offset-y
          offset-x
          :close-on-content-click="closeOnContentClick"
          direction="bottom"
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-on="on"
              v-bind="attrs"
              :class="{ 'ml-2': $vuetify.breakpoint.sm }"
            >
              <v-avatar size="48">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
                  <template v-slot:placeholder>
                    <v-row align="center" justify="center">
                      <v-col>
                        <v-icon large>mdi-account</v-icon>
                      </v-col>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn text class="text-capitalize" to="student-profile">
                  <v-icon>mdi-account</v-icon>
                  <span>&nbsp;Profile</span>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn
                  text
                  :loading="isLoading"
                  class="text-capitalize"
                  @click="logOut"
                >
                  <v-icon>mdi-power</v-icon>
                  <span>&nbsp;Sign out</span>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-toolbar>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentsNavbar",
  data() {
    return {
      loading: false,
      closeOnContentClick: true,
    };
  },
  async created() {
    await this.$store.dispatch("fetchLoggedInStudent");
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
