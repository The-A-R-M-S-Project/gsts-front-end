<template>
  <nav>
    <v-toolbar color="purple" class="white--text">
      <v-toolbar-title class="white--text font-weight-bold text-capitalize title">GSTS</v-toolbar-title>
      <template v-if="user.role === 'principal'">
        <v-spacer></v-spacer>
      </template>
      <template v-if="user.role === 'student'">
        <v-row justify="end" align="center">
          <v-col md="auto" sm="1">
            <v-btn text to="report-status" class="title text-capitalize white--text">Status</v-btn>
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
            <v-btn icon v-on="on" v-bind="attrs" :class="{'ml-2': $vuetify.breakpoint.sm}">
              <v-avatar size="48">
                <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn
                  text
                  class="text-capitalize"
                  :to="user.role==='student'?'student-profile':'/under-construction'"
                >
                  <v-icon>mdi-account</v-icon>
                  <span>&nbsp;Profile</span>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn text :loading="isLoading" class="text-capitalize" @click="logOut">
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
export default {
  name: "dean-navbar",
  data() {
    return {
      loading: false,
      closeOnContentClick: true,
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
};
</script>
